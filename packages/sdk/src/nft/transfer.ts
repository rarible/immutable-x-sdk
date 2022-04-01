import type { Link } from "@imtbl/imx-sdk"
import { ERC721TokenType } from "@imtbl/imx-sdk"
import type { PreparedMethod } from "../common/run-with-imx-auth"
import type { TransferRequest, TransferResponse } from "./domain"
import { getTransferResponse } from "./common/get-transfer-response"

export async function transfer(
	link: Link,
	preparedMethod: PreparedMethod,
	request: TransferRequest,
): Promise<TransferResponse> {
	const { assetClass, contract, tokenId, to } = request
	if (assetClass !== ERC721TokenType.ERC721) {
		throw new Error("Unsupported assetClass")
	}
	const prepared = await preparedMethod(link.transfer)
	const { result } = await prepared([{
		type: ERC721TokenType.ERC721,
		tokenId,
		tokenAddress: contract,
		toAddress: to,
	}])
	const r = result[0]
	return getTransferResponse(r)
}
