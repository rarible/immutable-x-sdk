import type { Part } from "@rarible/ethereum-api-client"
import type { ImxFee } from "../domain"

export function convertFees(fee: Part[]): ImxFee[] {
	return fee.map(f => ({ recipient: f.account, percentage: f.value }))
}
