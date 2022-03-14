import type { Address, Erc721AssetType } from "@rarible/ethereum-api-client"
import type { Link } from "@imtbl/imx-sdk"

export type TransferRequest = {
	asset: Erc721AssetType,
	to: Address
}

export type TransferResponse = ReturnType<Link["transfer"]>
