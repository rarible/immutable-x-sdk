import { IMMUTABLE_ENV_CONFIG } from "./config"
import { Link } from "@imtbl/imx-link-sdk"
import { ImmutableEnvConfig, RaribleImmutableSdk } from "./domain"
import { transfer } from "./nft"
import { buy, cancel, sell } from "./order"

export function wallet(env: keyof ImmutableEnvConfig): Link {
	return new Link(IMMUTABLE_ENV_CONFIG[env].linkAddress)
}

export function immutableSdk(wallet: Link): RaribleImmutableSdk {
	return {
		nft: {
			transfer: transfer.bind(null, wallet)
		},
		order: {
			sell: sell.bind(null, wallet),
			buy: buy.bind(null, wallet),
			cancel: cancel.bind(null, wallet)
		},
		wallet: {
			connect: async () => wallet.setup({})
		}
	}
}

