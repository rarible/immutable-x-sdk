import type { Link } from "@imtbl/imx-sdk"
import type { Ethereum } from "@rarible/ethereum-provider"
import type { Maybe } from "@rarible/types"
import { toAddress } from "@rarible/types"
import { convertFees } from "../common/convert-fees"
import type { ImxUser } from "../user/user"
import { prepareMethod } from "../common/run-with-imx-auth"
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
	ethereum: Maybe<Ethereum>,
	link: Link,
	userSdk: ImxUser,
	starkKey: Maybe<string>,
	request: SellRequest,
): Promise<SellResponse> {
	if (ethereum === undefined) {
		throw new Error("Wallet undefined")
	}
	const userAddress = await ethereum.getFrom()
	const prepared = await prepareMethod(link, userSdk, toAddress(userAddress), starkKey, link.sell)

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
	ethereum: Maybe<Ethereum>,
	link: Link,
	userSdk: ImxUser,
	starkKey: Maybe<string>,
	request: BuyRequest,
): Promise<BuyResponse> {
	if (ethereum === undefined) {
		throw new Error("Wallet undefined")
	}
	const userAddress = await ethereum.getFrom()
	const prepared = await prepareMethod(link, userSdk, toAddress(userAddress), starkKey, link.buy)
	const { orderId, fee } = request
	return prepared({
		orderIds: [orderId],
		fees: convertFees(fee),
	})
}

export async function cancel(
	ethereum: Maybe<Ethereum>,
	link: Link,
	userSdk: ImxUser,
	starkKey: Maybe<string>,
	request: CancelOrderRequest,
): Promise<CancelOrderResponse> {
	if (ethereum === undefined) {
		throw new Error("Wallet undefined")
	}
	const userAddress = await ethereum.getFrom()
	const prepared = await prepareMethod(link, userSdk, toAddress(userAddress), starkKey, link.cancel)
	const { orderId } = request
	const result = await prepared({
		orderId,
	})
	return {
		orderId: (result as unknown as SellResponseRaw).order_id.toString(),
	}
}
