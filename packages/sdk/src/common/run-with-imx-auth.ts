import type { Maybe } from "@rarible/types"
import { toAddress } from "@rarible/types"
import type { Link } from "@imtbl/imx-sdk"
import type { Ethereum } from "@rarible/ethereum-provider"
import type { ImxUser } from "../user/user"

export type PreparedMethod = <T>(method: T) => Promise<T>

// todo write tests
export async function prepareMethod<T>(
	link: Link,
	userSdk: ImxUser,
	ethereum: Maybe<Ethereum>,
	starkKey: Maybe<string>,
	method: T,
): Promise<T> {
	if (ethereum === undefined) {
		throw new Error("Wallet undefined")
	}
	const userAddress = await ethereum.getFrom()
	//todo think about starkKey parameter passing here
	if (!starkKey) {
		try {
			const response = await userSdk.getUserStarkKeys(toAddress(userAddress))
			starkKey = response[0]
		} catch {
		}

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
			throw new Error("Registration in Imx filed, please try login again")
		}
	} else {
		return method
	}
}
