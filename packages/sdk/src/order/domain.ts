import type { BigNumber, Erc20AssetType, Erc721AssetType, EthAssetType, Part } from "@rarible/ethereum-api-client"

export type OrderRequest = {
	payouts: Part[]
	originFees: Part[]
}

export type SellRequest = {
	makeAssetType: Erc721AssetType
	takeAssetType: EthAssetType | Erc20AssetType
	amount: BigNumber
} & OrderRequest

export type SellResponseRaw = {
	// eslint-disable-next-line camelcase
	order_id: number,
	status: string
}

export interface SellResponse {
	orderId: number
}

export type BuyRequest = {
	orderId: string
	fee: Part[]
}
export type BuyResponse = {
	result: { [x: string]: { status: "success" } | { status: "error", message: string } }
}
export type CancelOrderRequest = {
	orderId: string
}

export interface CancelOrderResponse extends CancelOrderRequest {
}
