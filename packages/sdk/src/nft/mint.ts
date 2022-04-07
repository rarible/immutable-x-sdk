import type { ImmutableMethodParams } from "@imtbl/imx-sdk"
import { ImmutableXClient } from "@imtbl/imx-sdk"
import type { Address, Maybe } from "@rarible/types"
import { toAddress } from "@rarible/types"
import type { NftCollectionControllerApi, Part } from "@rarible/ethereum-api-client"
import type { Ethereum } from "@rarible/ethereum-provider"
import { AlchemyProvider } from "@ethersproject/providers"
import { Wallet } from "@ethersproject/wallet"
import type { ImxEnv } from "../config/domain"
import { IMX_CONFIG } from "../config/env"
import { convertFees } from "../common/convert-fees"
import type { PreparedMethod } from "../common/run-with-imx-auth"
import { getTokenId } from "./common/get-token-id"

export type MintResponse = {
	tokenId: string
	contractAddress: string
	txId: string
}

export type MintRequest = {
	pk: string
	metaUrl: string
	royalties: Part[]
	collection: Address
}

export async function mint(
	ethereum: Maybe<Ethereum>,
	network: ImxEnv,
	prepareMethod: PreparedMethod,
	nftCollectionApi: NftCollectionControllerApi,
	request: MintRequest,
): Promise<MintResponse> {
	if (ethereum === undefined) {
		throw new Error("Wallet undefined")
	}
	const from = await ethereum.getFrom()
	const {
		publicApiUrl,
		alchemyApiKey,
		starkContractAddress,
		registrationContractAddress,
		gasLimit,
		gasPrice,
	} = IMX_CONFIG[network]
	//todo move to root
	const provider = new AlchemyProvider(network, alchemyApiKey)
	const wallet = new Wallet(request.pk)//todo
	const signer = wallet.connect(provider)
	const minter = await ImmutableXClient.build({
		publicApiUrl,
		signer,
		starkContractAddress,
		registrationContractAddress,
		gasLimit,
		gasPrice,
		enableDebug: false,
	})

	let tokenId = await getTokenId(nftCollectionApi, request.collection, toAddress(from))

	const payload: ImmutableMethodParams.ImmutableOffchainMintV2ParamsTS = [
		{
			users: [{
				etherKey: from,
				tokens: [{
					id: tokenId.tokenId,
					blueprint: request.metaUrl.toLowerCase() + tokenId.tokenId,
				}],
			}],
			contractAddress: request.collection,
			...request.royalties.length ? { royalties: convertFees(request.royalties) } : {},
		},
	]
	const prepared = await prepareMethod(minter.mintV2)
	const { results } = await prepared(payload)

	const { token_id: tokenIdResponse, contract_address: contractAddress, tx_id: txId } = results[0]
	return { tokenId: tokenIdResponse, contractAddress, txId: txId.toString() }
}
