import { Link } from "@imtbl/imx-sdk"
import type { Maybe } from "@rarible/types"
import type { Ethereum } from "@rarible/ethereum-provider"
import { Configuration, NftCollectionControllerApi } from "@rarible/ethereum-api-client"
import type { RaribleImxSdk } from "./domain"
import { transfer } from "./nft/transfer"
import { buy, cancel, sell } from "./order"
import { ImxBalanceControllerApi, ImxUserControllerApi } from "./apis"
import { ImxBalances } from "./balance/balance"
import { ImxUser } from "./user/user"
import type { RaribleImxEnv } from "./config/domain"
import { RARIBLE_IMX_ENV_CONFIG } from "./config/env"
import { mint } from "./nft/mint"
import { burn } from "./nft/burn"
import type { PreparedMethod } from "./common/run-with-imx-auth"
import { prepareMethod } from "./common/run-with-imx-auth"
import { getProtocolFee } from "./common/get-protocol-fee"

export function createImxSdk(
	ethereum: Maybe<Ethereum>,
	env: RaribleImxEnv,
	starkKey?: string,
): RaribleImxSdk {
	const {
		linkAddress,
		apiAddress,
		apiAddressV2,
		raribleEthereumApiUrl,
		imxNetwork,
	} = RARIBLE_IMX_ENV_CONFIG[env]

	const raribleEthereumApiConfig = new Configuration({ basePath: raribleEthereumApiUrl })
	const nftCollectionApi = new NftCollectionControllerApi(raribleEthereumApiConfig)

	const balanceApiConfig = new Configuration({ basePath: apiAddressV2 })
	const balancesSdk = new ImxBalances(new ImxBalanceControllerApi(balanceApiConfig))

	const defaultApiConfig = new Configuration({ basePath: apiAddress })
	const userSdk = new ImxUser(new ImxUserControllerApi(defaultApiConfig))

	const configuredLink = new Link(linkAddress)
	const preparedRequest: PreparedMethod = partialCall(prepareMethod, configuredLink, userSdk, ethereum, starkKey)

	return {
		nft: {
			transfer: transfer.bind(null, configuredLink, preparedRequest),
			mint: mint.bind(null, ethereum, imxNetwork, preparedRequest, nftCollectionApi),
			burn: burn.bind(null, configuredLink, preparedRequest),
		},
		order: {
			sell: sell.bind(null, configuredLink, preparedRequest),
			buy: buy.bind(null, configuredLink, preparedRequest),
			cancel: cancel.bind(null, configuredLink, preparedRequest),
			getOrderFee: getProtocolFee.bind(null, env),
		},
		balance: {
			getBalance: balancesSdk.getBalance,
		},
		wallet: {
			registerImx: async () => configuredLink.setup({}),
		},
	}
}

type Arr = readonly unknown[]

function partialCall<T extends Arr, U extends Arr, R>(
	f: (...args: [...T, ...U]) => R, ...headArgs: T
): (...tailArgs: U) => R {
	return (...tailArgs: U) => f(...headArgs, ...tailArgs)
}

export { IMX_CONFIG, RARIBLE_IMX_ENV_CONFIG } from "./config/env"
