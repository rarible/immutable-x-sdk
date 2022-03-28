import type { Address, Maybe } from "@rarible/types"
import { toAddress } from "@rarible/types"
import type { Link } from "@imtbl/imx-sdk"
import type { ImxUser } from "../user/user"

// todo write tests
export async function prepareMethod<T>(
	link: Link,
	userSdk: ImxUser,
	userAddress: Address,
	starkKey: Maybe<string>,
	method: T,
): Promise<T> {
	if (!userAddress) {
		throw new Error("Ethereum address is undefined")
	}
	//todo think about starkKey parameter passing here
	if (!starkKey) {
		starkKey = (await userSdk.getUserStarkKeys(userAddress))[0]
		if (!starkKey) {
			starkKey = (await link.setup({})).starkPublicKey
		}
	}
	if (!(await userSdk.checkUserIsRegistered(toAddress(userAddress), starkKey))) {
		const { address, starkPublicKey } = await link.setup({})
		if (
			address.toLowerCase() === userAddress.toLowerCase() &&
			starkKey.toLowerCase() === starkPublicKey.toLowerCase()
		) {
			return method
		} else {
			throw new Error("Registration in Imx filed, please try again")
		}
	} else {
		return method
	}
}
