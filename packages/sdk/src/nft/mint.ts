import type { ImmutableMethodParams } from "@imtbl/imx-sdk"
import { ImmutableXClient } from "@imtbl/imx-sdk"
import type { Address, Maybe } from "@rarible/types"
import { toAddress } from "@rarible/types"
import type { NftCollectionControllerApi } from "@rarible/ethereum-api-client"
import type { Ethereum } from "@rarible/ethereum-provider"
import { AlchemyProvider } from "@ethersproject/providers"
import { Wallet } from "@ethersproject/wallet"
import type { Brand } from "io-ts"
import type { ImxEnv } from "../config/domain"
import { IMX_CONFIG } from "../config/env"
import { getTokenId } from "./common/get-token-id"

export type Branded<A, B> = A & Brand<B>

export interface IntBrand {
	readonly Int: unique symbol
}

export type Unpromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never

export type MintResponseOld = Unpromise<ReturnType<ImmutableXClient["mintV2"]>>["results"]

export type MintResponse = {
	tokenId: string
	contractAddress: string
	txId: string
}

export async function mint(
	ethereum: Maybe<Ethereum>,
	network: ImxEnv,
	nftCollectionApi: NftCollectionControllerApi,
	receiver: Address,
): Promise<MintResponse> {
	if (ethereum === undefined) {
		throw new Error("Wallet undefined")
	}
	const from = toAddress(await ethereum.getFrom())
	const {
		metadataApiUrl,
		raribleCollection,
		apiAddress,
		alchemyApiKey,
		starkContractAddress,
		registrationAddress,
		gasLimit,
		gasPrice,
	} = IMX_CONFIG[network]
	const provider = new AlchemyProvider(network, alchemyApiKey)
	const wallet = new Wallet("privat_key")//todo
	const signer = wallet.connect(provider)
	const minter = await ImmutableXClient.build({
		publicApiUrl: apiAddress,
		signer,
		starkContractAddress,
		registrationContractAddress: registrationAddress,
		gasLimit,
		gasPrice,
		enableDebug: false,
	})

	let tokenId = await getTokenId(nftCollectionApi, raribleCollection.contractAddress, from)

	const payload: ImmutableMethodParams.ImmutableOffchainMintV2ParamsTS = [
		{
			users: [{
				etherKey: receiver,
				tokens: [{
					id: tokenId.tokenId,
					blueprint: metadataApiUrl.toLowerCase() + tokenId.tokenId,
				}],
			}],
			contractAddress: raribleCollection.contractAddress.toLowerCase(),
		},
	]

	const { results } = await minter.mintV2(payload)
	console.log("mint result", results)
	const { token_id: tokenIdResponse, contract_address: contractAddress, tx_id: txId } = results[0]
	return { tokenId: tokenIdResponse, contractAddress, txId: txId.toString() }
}
