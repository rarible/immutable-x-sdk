import { getProtocolFee } from "./get-protocol-fee"

describe("Get order fee test", () => {
	test("Get order fee test", () => {
		expect(getProtocolFee("e2e").buyerFee.value).toEqual(250)
		expect(getProtocolFee("e2e").sellerFee.value).toEqual(250)
	})
})
