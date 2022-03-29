import type { Link } from "@imtbl/imx-sdk"
import { ERC721TokenType } from "@imtbl/imx-sdk"
import type { TransferRequest, TransferResponse } from "./domain"
import { getTransferResponse } from "./common/get-tranfer-response"

export async function transfer(link: Link, request: TransferRequest): Promise<TransferResponse> {
	const { assetClass, contract, tokenId, to } = request
	if (assetClass !== ERC721TokenType.ERC721) {
		throw new Error("Unsupported assetClass")
	}
	const { result } = await link.transfer([{
		type: ERC721TokenType.ERC721,
		tokenId,
		tokenAddress: contract,
		toAddress: to,
	}])
	const r = result[0]
	return getTransferResponse(r)
}
