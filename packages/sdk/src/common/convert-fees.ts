import type { Part } from "@rarible/ethereum-api-client"
import type { ImtblxFee } from "../domain"

export function convertFees(fee: Part[]): ImtblxFee[] {
	return fee.map(f => ({ recipient: f.account, percentage: f.value }))
}
