import type { Link } from "@imtbl/imx-sdk"
import type { ImxTransactionId } from "../domain"
import type { ImxAssetType, ImxAssetTypeWithAmount } from "./domain"

export type PrepareWithdrawalResponse = {
	withdrawalId: number
}


export async function prepareWithdraw(link: Link, asset: ImxAssetTypeWithAmount): Promise<PrepareWithdrawalResponse> {
	return link.prepareWithdrawal(asset)
}

export async function completeWithdraw(link: Link, asset: ImxAssetType): Promise<ImxTransactionId> {
	return link.completeWithdrawal(asset)
}
