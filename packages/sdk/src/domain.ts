import type { Link } from "@imtbl/imx-sdk"
import type { Address } from "@rarible/types"
import type { BigNumberValue } from "@rarible/utils"
import type { BurnRequest, TransferRequest, TransferResponse } from "./nft/domain"
import type {
	BuyRequest,
	BuyResponse,
	CancelOrderRequest,
	CancelOrderResponse,
	SellRequest,
	SellResponse,
} from "./order/domain"
import type { BalanceRequestAssetType } from "./balance/balance"
import type { MintRequest, MintResponse } from "./nft/mint"

export type ImxFee = { recipient: string, percentage: number }

export type ImxBlockchainTx = void

export type ImxWallet = {
	registerImx(): ReturnType<Link["setup"]>
}

export type ImxOrderSdk = {
	buy(request: BuyRequest): Promise<BuyResponse>
	sell(request: SellRequest): Promise<SellResponse>
	cancel(request: CancelOrderRequest): Promise<CancelOrderResponse>
}

export type ImxNftSdk = {
	transfer(request: TransferRequest): Promise<TransferResponse>
	mint(request: MintRequest): Promise<MintResponse>
	burn(request: BurnRequest): Promise<TransferResponse>
}

export type RaribleImxSdk = {
	wallet: ImxWallet
	order: ImxOrderSdk
	nft: ImxNftSdk
	balance: ImxBalancesSdk
}

export type ImxBalancesSdk = {
	getBalance(address: Address, assetType: BalanceRequestAssetType): Promise<BigNumberValue>
}
