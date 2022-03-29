import type { Address } from "@rarible/ethereum-api-client"
import type { Link } from "@imtbl/imx-sdk"
import type { BigNumber } from "@rarible/types"

export interface Erc721AssetRequest {
	assetClass: "ERC721"
	contract: Address
	tokenId: BigNumber
}

export type TransferRequest = Erc721AssetRequest & {
	to: Address
}

export type Unpromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never
export type TransferResponse = Unpromise<ReturnType<Link["transfer"]>>["result"][0]
