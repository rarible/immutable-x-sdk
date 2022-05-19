import { ERC721TokenType } from "@imtbl/imx-sdk"
import type { Maybe } from "@rarible/types"
import { ZERO_ADDRESS } from "@rarible/types"
import type { ImxWallet } from "@rarible/immutable-wallet"
import type { Erc721AssetRequest, TransferResponse } from "./domain"
import { getTransferResponse } from "./common/get-tranfer-response"

export async function burn(
	wallet: Maybe<ImxWallet>,
	request: Erc721AssetRequest,
): Promise<TransferResponse> {
	if (wallet === undefined) {
		throw new Error("Wallet undefined")
	}
	const { assetClass, tokenId, contract } = request
	if (assetClass !== ERC721TokenType.ERC721) {
		throw new Error("Unsupported assetClass")
	}
	const { result } = await wallet.getConnectionData().link.transfer([{
		type: ERC721TokenType.ERC721,
		tokenId: tokenId,
		tokenAddress: contract,
		toAddress: ZERO_ADDRESS,
	}])
	const r = result[0]
	return getTransferResponse(r)
}
