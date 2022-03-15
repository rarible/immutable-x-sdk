import { Link } from "@imtbl/imx-sdk"
import { IMMUTABLE_ENV_CONFIG } from "./config"
import type { ImxEnvConfig, RaribleImxSdk } from "./domain"
import { transfer } from "./nft"
import { buy, cancel, sell } from "./order"

export function wallet(env: keyof ImxEnvConfig): Link {
	return new Link(IMMUTABLE_ENV_CONFIG[env].linkAddress)
}

export function immutableSdk(wallet: Link): RaribleImxSdk {
	return {
		nft: {
			transfer: transfer.bind(null, wallet),
		},
		order: {
			sell: sell.bind(null, wallet),
			buy: buy.bind(null, wallet),
			cancel: cancel.bind(null, wallet),
		},
		wallet: {
			connect: async () => wallet.setup({}),
		},
	}
}
