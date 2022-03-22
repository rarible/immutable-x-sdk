import type { BigNumber, Erc20AssetType, Erc721AssetType, EthAssetType, Part } from "@rarible/ethereum-api-client"
import type { BigNumberValue } from "@rarible/utils"

export type HasPrice = { price: BigNumberValue } | { priceDecimal: BigNumberValue }

export type SellRequest = {
	makeAssetType: Erc721AssetType
	takeAssetType: EthAssetType | Erc20AssetType
	amount: BigNumber
} & HasPrice & OrderRequest


export type OrderRequest = {
	payouts: Part[]
	originFees: Part[]
}

export type BuyRequest = {
	orderIds: string[]
	fee: Part[]
}
export type CancelOrderRequest = {
	orderId: string
}

export interface SellResponse {
	orderId: number
}

export type BuyResponse = {
	result: { [x: string]: { status: "success" } | { status: "error", message: string } }
}
