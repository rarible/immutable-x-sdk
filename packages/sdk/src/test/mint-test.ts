import type { ImmutableMethodParams, ImmutableXClient } from "@imtbl/imx-sdk"
import type { Address } from "@rarible/types"
import { toAddress } from "@rarible/types"
import type { NftCollectionControllerApi, Part } from "@rarible/ethereum-api-client"
import { convertFees } from "../common/convert-fees"
import { getTokenId } from "../nft/common/get-token-id"

export type MintResponse = {
	tokenId: string
	contractAddress: string
	txId: string
}

export type MintRequest = {
	metaUrl: string
	royalties: Part[]
	collection: Address
}

export async function mintScript(
	client: ImmutableXClient,
	nftCollectionApi: NftCollectionControllerApi,
	request: MintRequest,
): Promise<MintResponse> {
	const from = client.address

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
	const { results } = await client.mintV2(payload)

	const { token_id: tokenIdResponse, contract_address: contractAddress, tx_id: txId } = results[0]
	return { tokenId: tokenIdResponse, contractAddress, txId: txId.toString() }
}
