import { ERC721TokenType } from "@imtbl/imx-sdk"
import type { Maybe } from "@rarible/types"
import type { ImxWallet } from "@rarible/immutable-wallet"
import type { TransferRequest, TransferResponse } from "./domain"
import { getTransferResponse } from "./common/get-tranfer-response"

export async function transfer(
	wallet: Maybe<ImxWallet>,
	request: TransferRequest,
): Promise<TransferResponse> {
	if (wallet === undefined) {
		throw new Error("Wallet undefined")
	}
	const { assetClass, contract, tokenId, to } = request
	if (assetClass !== ERC721TokenType.ERC721) {
		throw new Error("Unsupported assetClass")
	}
	const { result } = await wallet.getConnectionData().link.transfer([{
		type: ERC721TokenType.ERC721,
		tokenId,
		tokenAddress: contract,
		toAddress: to,
	}])
	const r = result[0]
	return getTransferResponse(r)
}
