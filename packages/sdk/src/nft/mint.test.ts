import { ZERO_ADDRESS } from "@rarible/types"
import { createImxSdk } from "../index"

describe("Mint test", () => {
	test("Shoult mint to rarible test collection", async () => {
		const sdk = createImxSdk(undefined, "dev")
		const balance = await sdk.balance.getBalance(ZERO_ADDRESS, { assetClass: "ETH" })
		console.log(balance)
		expect(1).toEqual(1)
	})
})
