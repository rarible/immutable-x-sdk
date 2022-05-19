import type { Maybe } from "@rarible/types"
import type { ImxWallet } from "@rarible/immutable-wallet"
import type { RaribleImxSdk } from "./domain"
import { transfer } from "./nft/transfer"
import { buy, cancel, sell } from "./order"
import { mint } from "./nft/mint"
import { burn } from "./nft/burn"
import { getProtocolFee } from "./common/get-protocol-fee"
import { getBalance } from "./balance/balance"

export function createImxSdk(
	wallet: Maybe<ImxWallet>,
): RaribleImxSdk {

	return {
		nft: {
			transfer: transfer.bind(null, wallet),
			mint: mint.bind(null, wallet),
			burn: burn.bind(null, wallet),
		},
		order: {
			sell: sell.bind(null, wallet),
			buy: buy.bind(null, wallet),
			cancel: cancel.bind(null, wallet),
			getOrderFee: getProtocolFee.bind(null, wallet?.getConfig().env || "prod"),
		},
		balance: {
			getBalance: getBalance.bind(null, wallet?.getConfig().env || "prod"),
		},
		wallet: {
			registerImx: async () => wallet?.connect() || {
				address: "",
				starkPublicKey: "",
				ethNetwork: "",
				providerPreference: "",
			},
		},
	}
}

export { IMX_CONFIG, RARIBLE_IMX_ENV_CONFIG } from "./config/env"
export { getBalance } from "./balance/balance"
