import { toAddress } from "@rarible/types"
import { createImxSdk } from "../index"

describe("test imx balances", () => {
	const address = "0x47846A7457660F1c585377cD173AA4811580CA31"
	const sdk = createImxSdk(undefined, "dev", "")
	test("should get balance", async () => {
		const ethBalance = await sdk.balance.getBalance(toAddress(address), { assetClass: "ETH" })
		expect(parseInt(ethBalance.toString())).toBeGreaterThanOrEqual(0)
		// @ts-ignore
		const nonExistableBalance = await sdk.balance.getBalance(toAddress(address), { assetClass: "NONEXIST" })
		expect(parseInt(nonExistableBalance.toString())).toEqual(0)
	})
})
