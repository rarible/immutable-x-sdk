import { Link } from "@imtbl/imx-link-sdk"
import { Address, BigNumber, Erc721AssetType } from "@rarible/ethereum-api-client"

export type ImmutableEnvConfig = Record<"e2e" | "dev" | "staging" | "prod", {
	linkAddress: string
	apiAddress: string
	raribleApiAddress: string
}>

export type TransferRequest = {
	asset: Erc721AssetType,
	to: Address
}

export type SellRequest = {
	contract: Address
	tokenId: string
	amount: BigNumber
}
export type BuyRequest = {
	orderIds: string[]
}
export type CancelOrderRequest = {
	orderId: string
}

export type BuyResponse = {
	result: {
		[x: string]: {
			status: "success" | "error";
			message: "success" | "error";
		};
	}
}

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
	transfer(request: TransferRequest): Promise<ImmutableBlockchainTx>
}

export type RaribleImmutableSdk = {
	wallet: ImmutableWallet
	order: ImmutableOrderSdk
	nft: ImmutableNftSdk
}
