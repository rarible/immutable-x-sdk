import type { Link } from "@imtbl/imx-link-sdk"

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

export class ImmutableWalletConnector {
	constructor(public walletLink: Link) {}
	public async connect(): Promise<ReturnType<Link["setup"]>> {
		return this.walletLink.setup({})
	}

	//balance
	//signMessage
}


//example
// const link = new Link("")
// const wallet = new ImmutableWalletConnector(link)
// await wallet.connect()
