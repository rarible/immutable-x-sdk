import type { Maybe } from "@rarible/types"
import type { ImxWallet } from "@rarible/immutable-wallet"
import { convertFees } from "../common/convert-fees"
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
	wallet: Maybe<ImxWallet>,
	request: SellRequest,
): Promise<SellResponse> {
	if (wallet === undefined) {
		throw new Error("Wallet undefined")
	}
	const { makeAssetType: { tokenId, contract }, takeAssetType, amount, payouts, originFees } = request
	const currencyContract = takeAssetType.assetClass === "ERC20" ? takeAssetType.contract : undefined
	return await wallet.getConnectionData().link.sell({
		tokenId,
		tokenAddress: contract,
		fees: convertFees([...payouts, ...originFees]),
		amount,
		...currencyContract ? { currencyAddress: currencyContract } : {},
	}) as unknown as SellResponse
}

export async function buy(
	wallet: Maybe<ImxWallet>,
	request: BuyRequest,
): Promise<BuyResponse> {
	if (wallet === undefined) {
		throw new Error("Wallet undefined")
	}
	const { orderId, fee } = request
	return wallet.getConnectionData().link.buy({
		orderIds: [orderId],
		fees: convertFees(fee),
	})
}

export async function cancel(
	wallet: Maybe<ImxWallet>,
	request: CancelOrderRequest,
): Promise<CancelOrderResponse> {
	if (wallet === undefined) {
		throw new Error("Wallet undefined")
	}
	const { orderId } = request
	const result = await wallet.getConnectionData().link.cancel({
		orderId,
	})
	return {
		orderId: (result as unknown as SellResponseRaw).order_id.toString(),
	}
}
