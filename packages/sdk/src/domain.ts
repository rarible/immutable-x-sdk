import type { Link } from "@imtbl/imx-sdk"
import type { TransferRequest, TransferResponse } from "./nft/domain"
import type { BuyRequest, BuyResponse, CancelOrderRequest, SellRequest } from "./order/domain"

export type ImmutableEnvConfig = Record<"e2e" | "dev" | "staging" | "prod", {
	linkAddress: string
	apiAddress: string
	raribleApiAddress: string
}>

export type ImtblxFee = { recipient: string, percentage: number }

export type ImmutableBlockchainTx = void

export type ImmutableWallet = {
	connect(): ReturnType<Link["setup"]>
}

export type ImmutableOrderSdk = {
	buy(request: BuyRequest): Promise<BuyResponse>
	sell(request: SellRequest): Promise<ImmutableBlockchainTx>
	cancel(request: CancelOrderRequest): Promise<ImmutableBlockchainTx>
}

export type ImmutableNftSdk = {
	transfer(request: TransferRequest): Promise<TransferResponse>
}

export type RaribleImmutableSdk = {
	wallet: ImmutableWallet
	order: ImmutableOrderSdk
	nft: ImmutableNftSdk
}
