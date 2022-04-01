import { ZERO_ADDRESS } from "@rarible/types"
import { ImxUser } from "../user/user"
import { prepareMethod } from "./run-with-imx-auth"

describe("prepareMethod test", () => {
	const testStarkKey = "0x00001"
	const testMethod = () => "test"
	const link = (stKey: string, address: string) => ({ setup: () => ({ starkPublicKey: stKey, address }) }) as any
	const userApiMock = (data: string) => ({
		getImxUserStarkKeys: async () => Promise.resolve({ accounts: [data] }),
	})
	const userSdk = (starkKey: string) => new ImxUser(userApiMock(starkKey) as any)
	const ethereum = { getFrom: () => ZERO_ADDRESS } as any
	test("Should throw if ethereum undefined", async () => {
		const prepared = async () => prepareMethod(
			link(testStarkKey, ZERO_ADDRESS), userSdk(ZERO_ADDRESS), undefined, "", testMethod,
		)
		await expect(prepared()).rejects.toThrowError("Wallet undefined")
	})

	test("Empty stark key - Should get starkKey and return method", async () => {
		const prepared = async () => prepareMethod(
			link(testStarkKey, ZERO_ADDRESS), userSdk(testStarkKey), ethereum, "", testMethod,
		)
		await expect(prepared()).resolves.toEqual(testMethod)
	})

	test("Defined stark key but not equal - Should get starkKey compare and throw", async () => {
		const prepared = async () => prepareMethod(link(
			testStarkKey, ZERO_ADDRESS), userSdk(testStarkKey), ethereum, "abcdef", testMethod,
		)
		await expect(prepared()).rejects.toThrowError("Registration in Imx filed, please try login again")
	})

	test("Defined stark key - Should get starkKey compare and return method", async () => {
		const prepared = async () => prepareMethod(
			link(testStarkKey, ZERO_ADDRESS), userSdk(testStarkKey), ethereum, testStarkKey, testMethod,
		)
		await expect(prepared()).resolves.toEqual(testMethod)
	})
})
