import { Link } from "@imtbl/imx-sdk"
import type { Maybe } from "@rarible/types"
import type { Ethereum } from "@rarible/ethereum-provider"
import type { RaribleImxSdk } from "./domain"
import { transfer } from "./nft/transfer"
import { buy, cancel, sell } from "./order"
import { Configuration, ImxBalanceControllerApi } from "./apis"
import { ImxBalances } from "./balance/balance"
import { ImxUser } from "./user/user"
import { ImxUserControllerApi } from "./apis/user"
import type { RaribleImxEnv } from "./config/domain"
import { RARIBLE_IMX_ENV_CONFIG } from "./config/env"

export function createImxSdk(
	ethereum: Maybe<Ethereum>,
	env: RaribleImxEnv,
	starkKey?: string,
): RaribleImxSdk {
	const { linkAddress, apiAddress, apiAddressV2 } = RARIBLE_IMX_ENV_CONFIG[env]

	const balanceApiConfig = new Configuration({ basePath: apiAddressV2 })
	const balancesSdk = new ImxBalances(new ImxBalanceControllerApi(balanceApiConfig))

	const defaultApiConfig = new Configuration({ basePath: apiAddress })
	const userSdk = new ImxUser(new ImxUserControllerApi(defaultApiConfig))

	const configuredLink = new Link(linkAddress)

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
