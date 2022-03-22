import { Link } from "@imtbl/imx-sdk"
import type { Maybe } from "@rarible/types"
import type { Ethereum } from "@rarible/ethereum-provider"
import { IMMUTABLE_ENV_CONFIG } from "./config"
import type { ImxEnv, ImxRoot, RaribleImxSdk } from "./domain"
import { transfer } from "./nft"
import { buy, cancel, sell } from "./order"
import { Configuration, ImxBalanceControllerApi } from "./apis"
import { ImxBalances } from "./balance/balance"
import { ImxUser } from "./user/user"
import { ImxUserControllerApi } from "./apis/user"

export function createImxLink(env: ImxEnv): ImxRoot {
	return {
		link: new Link(IMMUTABLE_ENV_CONFIG[env].linkAddress),
		env,
	}
}

export function createImxSdk(
	ethereum: Maybe<Ethereum>,
	env: ImxEnv,
	starkKey: Maybe<string>,
): RaribleImxSdk {
	const apiConfig = new Configuration({ basePath: IMMUTABLE_ENV_CONFIG[env].apiAddressV2 })
	const balancesSdk = new ImxBalances(new ImxBalanceControllerApi(apiConfig))
	const userSdk = new ImxUser(new ImxUserControllerApi(apiConfig))
	const configuredLink = new Link(IMMUTABLE_ENV_CONFIG[env].linkAddress)
	return {
		nft: {
			transfer: transfer.bind(null, configuredLink),
		},
		order: {
			sell: sell.bind(null, ethereum, configuredLink, userSdk, starkKey),
			buy: buy.bind(null, ethereum, configuredLink, userSdk, starkKey),
			cancel: cancel.bind(null, ethereum, configuredLink, userSdk, starkKey),
		},
		balance: {
			getBalance: balancesSdk.getBalance,
		},
		wallet: {
			registerImx: async () => configuredLink.setup({}),
		},
	}
}
