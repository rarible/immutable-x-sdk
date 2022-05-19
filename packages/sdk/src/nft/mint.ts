import type { ImmutableMethodParams } from "@imtbl/imx-sdk"
import { ImmutableXClient } from "@imtbl/imx-sdk"
import type { Address, Maybe } from "@rarible/types"
import { toAddress } from "@rarible/types"
import type { Part } from "@rarible/ethereum-api-client"
import { Configuration, NftCollectionControllerApi } from "@rarible/ethereum-api-client"
import { AlchemyProvider } from "@ethersproject/providers"
import { Wallet } from "@ethersproject/wallet"
import type { ImxEnv, ImxWallet } from "@rarible/immutable-wallet"
import { IMX_ENV_CONFIG } from "../config/env"
import { convertFees } from "../common/convert-fees"
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
	wallet: Maybe<ImxWallet>,
	request: MintRequest,
): Promise<MintResponse> {
	if (wallet === undefined) {
		throw new Error("Wallet undefined")
	}
	const { address, ethNetwork } = await wallet.getConnectionData()
	const {
		apiAddress,
		alchemyApiKey,
		starkContractAddress,
		registrationAddress,
		gasLimit,
		gasPrice,
		raribleEthereumApiUrl,
	} = IMX_ENV_CONFIG[ethNetwork as ImxEnv]
	const raribleEthereumApiConfig = new Configuration({ basePath: raribleEthereumApiUrl })
	const nftCollectionApi = new NftCollectionControllerApi(raribleEthereumApiConfig)

	const provider = new AlchemyProvider(ethNetwork, alchemyApiKey)
	const ethWallet = new Wallet(request.pk)//todo temporary, mint should be on backend side
	const signer = ethWallet.connect(provider)
	const minter = await ImmutableXClient.build({
		publicApiUrl: apiAddress,
		signer,
		starkContractAddress,
		registrationContractAddress: registrationAddress,
		gasLimit,
		gasPrice,
		enableDebug: false,
	})

	let tokenId = await getTokenId(nftCollectionApi, request.collection, toAddress(address))

	const payload: ImmutableMethodParams.ImmutableOffchainMintV2ParamsTS = [
		{
			users: [{
				etherKey: address,
				tokens: [{
					id: tokenId.tokenId,
					blueprint: request.metaUrl.toLowerCase() + tokenId.tokenId,
				}],
			}],
			contractAddress: request.collection,
			...request.royalties.length ? { royalties: convertFees(request.royalties) } : {},
		},
	]
	const { results } = await minter.mintV2(payload)

	const { token_id: tokenIdResponse, contract_address: contractAddress, tx_id: txId } = results[0]
	return { tokenId: tokenIdResponse, contractAddress, txId: txId.toString() }
}
