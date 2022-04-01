import { ERC721TokenType } from "@imtbl/imx-sdk"
import { ZERO_ADDRESS } from "@rarible/types"
import type { ImxTransferResponse } from "./get-transfer-response"
import { getTransferResponse } from "./get-transfer-response"

describe("getTransferResponse test", () => {
	const responsePart = {
		type: ERC721TokenType.ERC721,
		tokenAddress: ZERO_ADDRESS,
		tokenId: "1",
		toAddress: ZERO_ADDRESS,
	}
	const successResponse: ImxTransferResponse = {
		...responsePart,
		status: "success",
		txId: 123,
	}
	const errorResponse: ImxTransferResponse = { ...responsePart, status: "error", message: "some error message" }
	const unknownResponse = { ...responsePart } as any
	test("should get success response", () => {
		expect(getTransferResponse(successResponse)).toStrictEqual({ status: "success", txId: 123 })
	})
	test("should throw on error response", () => {
		expect(() => getTransferResponse(errorResponse)).toThrowError(errorResponse.message)
	})
	test("should throw on unknown response", () => {
		expect(() => getTransferResponse(unknownResponse)).toThrowError("Unknown imx transfer response")
	})
})
