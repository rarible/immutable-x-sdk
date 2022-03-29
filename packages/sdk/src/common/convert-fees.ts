import type { Part } from "@rarible/ethereum-api-client"
import type { ImxFee } from "../domain"
// todo write tests
//todo check for correct values, check for zero values(write separate zero-filter function)
export function convertFees(fee?: Part[]): ImxFee[] {
	return fee ? fee.map(f => ({ recipient: f.account, percentage: f.value })) : []
}
