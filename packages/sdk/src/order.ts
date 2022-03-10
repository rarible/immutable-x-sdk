import { Link } from "@imtbl/imx-link-sdk"
import { BuyRequest, BuyResponse, CancelOrderRequest, ImmutableBlockchainTx, SellRequest } from "./domain"

export async function sell(link: Link, request: SellRequest): Promise<ImmutableBlockchainTx> {
	const {amount, tokenId, contract} = request
	return link.sell({
		amount,
		tokenId,
		tokenAddress: contract
	})
}

export async function buy(link: Link, request: BuyRequest): Promise<BuyResponse> {
	return link.buy({
		orderIds: request.orderIds
	})
}

export async function cancel(link: Link, request: CancelOrderRequest): Promise<ImmutableBlockchainTx> {
	const { orderId } = request
	return link.cancel({
		orderId
	})
}
