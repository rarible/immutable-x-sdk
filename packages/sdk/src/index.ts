import { Link } from "@imtbl/imx-sdk"
import type { Maybe } from "@rarible/types"
import type { Ethereum } from "@rarible/ethereum-provider"
import { Configuration, NftCollectionControllerApi } from "@rarible/ethereum-api-client"
import type { RaribleImxSdk } from "./domain"
import { transfer } from "./nft/transfer"
import { buy, cancel, sell } from "./order"
import { ImxBalanceControllerApi, RaribleImxApiConfiguration } from "./apis"
import { ImxBalances } from "./balance/balance"
import { ImxUser } from "./user/user"
import { ImxUserControllerApi } from "./apis/user"
import type { RaribleImxEnv } from "./config/domain"
import { RARIBLE_IMX_ENV_CONFIG } from "./config/env"
import { mint } from "./nft/mint"
import { burn } from "./nft/burn"

export function createImxSdk(
	ethereum: Maybe<Ethereum>,
	env: RaribleImxEnv,
	starkKey?: string,
): RaribleImxSdk {
	const {
		linkAddress,
		apiAddress,
		apiAddressV2,
		raribleImxApiUrl,
		imxNetwork,
	} = RARIBLE_IMX_ENV_CONFIG[env]

	const raribleApiConfig = new Configuration({ basePath: raribleImxApiUrl })
	const nftCollectionApi = new NftCollectionControllerApi(raribleApiConfig)

	const balanceApiConfig = new RaribleImxApiConfiguration({ basePath: apiAddressV2 })
	const balancesSdk = new ImxBalances(new ImxBalanceControllerApi(balanceApiConfig))

	const defaultApiConfig = new RaribleImxApiConfiguration({ basePath: apiAddress })
	const userSdk = new ImxUser(new ImxUserControllerApi(defaultApiConfig))

	const configuredLink = new Link(linkAddress)

	return {
		nft: {
			transfer: transfer.bind(null, configuredLink),
			mint: mint.bind(null, ethereum, imxNetwork, nftCollectionApi),
			burn: burn.bind(null, configuredLink),
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

export { IMX_CONFIG, RARIBLE_IMX_ENV_CONFIG } from "./config/env"
