import { ERC721TokenType } from "@imtbl/imx-link-types"
import type { Link } from "@imtbl/imx-sdk"
import { ZERO_ADDRESS } from "@rarible/types"
import type { PreparedMethod } from "../common/run-with-imx-auth"
import type { Erc721AssetRequest, TransferResponse } from "./domain"
import { getTransferResponse } from "./common/get-transfer-response"

export async function burn(
	link: Link,
	preparedMethod: PreparedMethod,
	request: Erc721AssetRequest,
): Promise<TransferResponse> {
	const { assetClass, tokenId, contract } = request
	if (assetClass !== ERC721TokenType.ERC721) {
		throw new Error("Unsupported assetClass")
	}
	const prepared = await preparedMethod(link.transfer)
	const { result } = await prepared([{
		type: ERC721TokenType.ERC721,
		tokenId: tokenId,
		tokenAddress: contract,
		toAddress: ZERO_ADDRESS,
	}])
	const r = result[0]
	return getTransferResponse(r)
}
