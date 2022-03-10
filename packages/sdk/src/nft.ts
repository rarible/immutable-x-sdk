import { Link } from "@imtbl/imx-link-sdk"
import { ERC721TokenType } from "@imtbl/imx-link-types"
import { ImmutableBlockchainTx, TransferRequest } from "./domain"

export async function transfer(link: Link, request: TransferRequest): Promise<ImmutableBlockchainTx> {
	const { asset, to } = request
	return link.transfer({
		type: ERC721TokenType.ERC721,
		tokenId: asset.tokenId,
		tokenAddress: asset.contract,
		to,
	})
}
