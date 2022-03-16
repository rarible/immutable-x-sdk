import { toAddress } from "@rarible/types"
import { createImxLink, createImxSdk } from "../index"

describe("test imx balances", () => {
	const address = "0x47846A7457660F1c585377cD173AA4811580CA31"
	const w = createImxLink("dev")
	const sdk = createImxSdk(w)
	test("should get balance", async () => {
		const ethBalance = await sdk.balance.getBalance(toAddress(address), { assetClass: "ETH" })
		expect(parseInt(ethBalance.toString())).toBeGreaterThanOrEqual(0)
	})
})
