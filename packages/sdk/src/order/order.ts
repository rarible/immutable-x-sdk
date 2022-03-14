import type { Link } from "@imtbl/imx-sdk"
import { convertFees } from "../common/convert-fees"
import type { ImmutableBlockchainTx } from "../domain"
import type { BuyRequest, BuyResponse, CancelOrderRequest, SellRequest } from "./domain"

export async function sell(link: Link, request: SellRequest): Promise<ImmutableBlockchainTx> {
	const { makeAssetType: { tokenId, contract }, takeAssetType, amount, payouts, originFees } = request
	const currencyContract = takeAssetType.assetClass === "ERC20" ? takeAssetType.contract : undefined
	return link.sell({
		amount,
		tokenId,
		tokenAddress: contract,
		fees: convertFees([...payouts, ...originFees]),
		currencyAddress: currencyContract,
	})
}

export async function buy(link: Link, request: BuyRequest): Promise<BuyResponse> {
	const { orderIds, fee } = request
	return link.buy({
		orderIds,
		fees: convertFees(fee),
	})
}

export async function cancel(link: Link, request: CancelOrderRequest): Promise<ImmutableBlockchainTx> {
	const { orderId } = request
	return link.cancel({
		orderId,
	})
}
