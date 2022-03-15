import type { Link } from "@imtbl/imx-sdk"
import type { TransferRequest, TransferResponse } from "./nft/domain"
import type { BuyRequest, BuyResponse, CancelOrderRequest, SellRequest } from "./order/domain"

export type ImxEnvConfig = Record<"e2e" | "dev" | "staging" | "prod", {
	linkAddress: string
	apiAddress: string
	raribleApiAddress: string
}>

export type ImxFee = { recipient: string, percentage: number }

export type ImxBlockchainTx = void

export type ImxTransactionId = { transactionId: string }

export type ImxWallet = {
	connect(): ReturnType<Link["setup"]>
}

export type ImxOrderSdk = {
	buy(request: BuyRequest): Promise<BuyResponse>
	sell(request: SellRequest): Promise<ImxBlockchainTx>
	cancel(request: CancelOrderRequest): Promise<ImxBlockchainTx>
}

export type ImxNftSdk = {
	transfer(request: TransferRequest): Promise<TransferResponse>
}

export type RaribleImxSdk = {
	wallet: ImxWallet
	order: ImxOrderSdk
	nft: ImxNftSdk
}
