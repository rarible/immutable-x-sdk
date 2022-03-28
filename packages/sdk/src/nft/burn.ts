import { ERC721TokenType } from "@imtbl/imx-link-types"
import type { Link } from "@imtbl/imx-sdk"
import { ZERO_ADDRESS } from "@rarible/types"
import type { BurnRequest, TransferResponse } from "./domain"

export async function burn(link: Link, request: BurnRequest): Promise<TransferResponse> {
	const { asset } = request
	return link.transfer([{
		type: ERC721TokenType.ERC721,
		tokenId: asset.tokenId,
		tokenAddress: asset.contract,
		toAddress: ZERO_ADDRESS,
	}])
}
