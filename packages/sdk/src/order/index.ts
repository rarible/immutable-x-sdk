import type { Link } from "@imtbl/imx-sdk"
import { convertFees } from "../common/convert-fees"
import type { PreparedMethod } from "../common/run-with-imx-auth"
import type {
	BuyRequest,
	BuyResponse,
	CancelOrderRequest,
	CancelOrderResponse,
	SellRequest,
	SellResponse,
	SellResponseRaw,
} from "./domain"

export async function sell(
	link: Link,
	preparedMethod: PreparedMethod,
	request: SellRequest,
): Promise<SellResponse> {

	const prepared = await preparedMethod(link.sell)
	const { makeAssetType: { tokenId, contract }, takeAssetType, amount, payouts, originFees } = request
	const currencyContract = takeAssetType.assetClass === "ERC20" ? takeAssetType.contract : undefined
	return await prepared({
		tokenId,
		tokenAddress: contract,
		fees: convertFees([...payouts, ...originFees]),
		amount,
		...currencyContract ? { currencyAddress: currencyContract } : {},
	}) as unknown as SellResponse
}

export async function buy(
	link: Link,
	prepareMethod: PreparedMethod,
	request: BuyRequest,
): Promise<BuyResponse> {

	const prepared = await prepareMethod(link.buy)
	const { orderId, fee } = request
	return prepared({
		orderIds: [orderId],
		fees: convertFees(fee),
	})
}

export async function cancel(
	link: Link,
	preparedMethod: PreparedMethod,
	request: CancelOrderRequest,
): Promise<CancelOrderResponse> {

	const prepared = await preparedMethod(link.cancel)
	const { orderId } = request
	const result = await prepared({
		orderId,
	})
	return {
		orderId: (result as unknown as SellResponseRaw).order_id.toString(),
	}
}
