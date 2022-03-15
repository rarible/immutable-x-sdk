import { ERC721TokenType } from "@imtbl/imx-link-types"
import type { Link } from "@imtbl/imx-sdk"
import type { TransferRequest, TransferResponse } from "./domain"

export async function transfer(link: Link, request: TransferRequest): Promise<TransferResponse> {
	const { asset, to } = request
	return link.transfer([{
		type: ERC721TokenType.ERC721,
		tokenId: asset.tokenId,
		tokenAddress: asset.contract,
		toAddress: to,
	}])
}
