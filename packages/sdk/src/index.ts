import { Link } from "@imtbl/imx-sdk"
import { IMMUTABLE_ENV_CONFIG } from "./config"
import type { ImxEnv, ImxRoot, RaribleImxSdk } from "./domain"
import { transfer } from "./nft"
import { buy, cancel, sell } from "./order"
import { Configuration, ImxBalanceControllerApi } from "./apis"
import { ImxBalances } from "./balance/balance"

export function createImxLink(env: ImxEnv): ImxRoot {
	return {
		link: new Link(IMMUTABLE_ENV_CONFIG[env].linkAddress),
		env,
	}
}

export function createImxSdk(wallet: ImxRoot): RaribleImxSdk {
	const { env, link } = wallet
	const apiConfig = new Configuration({ basePath: IMMUTABLE_ENV_CONFIG[env].apiAddressV2 })
	const apis = new ImxBalanceControllerApi(apiConfig)
	const balancesSdk = new ImxBalances(apis)
	return {
		nft: {
			transfer: transfer.bind(null, link),
		},
		order: {
			sell: sell.bind(null, link),
			buy: buy.bind(null, link),
			cancel: cancel.bind(null, link),
		},
		balance: {
			getBalance: balancesSdk.getBalance,
		},
		wallet: {
			connect: async () => link.setup({}),
		},
	}
}
