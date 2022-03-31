import { Link } from "@imtbl/imx-link-sdk"
import type { RaribleImxEnv } from "@rarible/immutable-sdk/build/config/domain"
import { RARIBLE_IMX_ENV_CONFIG } from "@rarible/immutable-sdk/build/config/env"

// const link = new Link('https://link.ropsten.x.immutable.com')

// const LOCAL_STORAGE_IMMUTABLE_WALLET_ADDRESS_KEY = "IMM_WALLET_ADDRESS"
// const LOCAL_STORAGE_IMMUTABLE_STARK_PUBLIC_KEY = "IMM_STARK_PUBLIC_KEY"
//
// export async function setupAccount(link: Link){
// 	const {address, starkPublicKey } = await link.setup({});
// 	localStorage.setItem(LOCAL_STORAGE_IMMUTABLE_WALLET_ADDRESS_KEY, address);
// 	localStorage.setItem(LOCAL_STORAGE_IMMUTABLE_STARK_PUBLIC_KEY, starkPublicKey);
// }
// const address = localStorage.getItem(LOCAL_STORAGE_IMMUTABLE_WALLET_ADDRESS_KEY);

export function createImxWallet(env: RaribleImxEnv) {
	const link = new Link(RARIBLE_IMX_ENV_CONFIG[env].linkAddress)
	return {
		connect: async () => {
			return await link.setup({})
		},
	}
}
