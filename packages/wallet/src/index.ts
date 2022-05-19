import { Link, ProviderPreference } from "@imtbl/imx-sdk"
import type {
	ImxConnectResult,
	ImxEnv,
	ImxNetwork,
	ImxNetworkConfig,
	ImxWalletConnectionStatus,
	ImxWalletProviderName,
} from "./domain"
import { IMX_ENV_CONFIG, IMX_NETWORK_CONFIG } from "./config"

export class ImxWallet {
	private address: string
	private starkPublicKey: string
	private ethNetwork: string
	private providerPreference: string
	private status: ImxWalletConnectionStatus
	public link: Link

	constructor(
		private readonly env: ImxEnv,
		private readonly provider?: ImxWalletProviderName,
	) {
		this.link = null as any
		this.address = ""
		this.starkPublicKey = ""
		this.ethNetwork = ""
		this.providerPreference = ""
		this.status = "disconnected"
		this.connect = this.connect.bind(this)
		this.disconnect = this.disconnect.bind(this)
		this.getConnectionData = this.getConnectionData.bind(this)
		this.getNetworkConfig = this.getNetworkConfig.bind(this)
	}

	public async connect(): Promise<ImxConnectResult> {
		this.link = new Link(this.getNetworkConfig().linkAddress)
		try {
			const { address, ethNetwork, providerPreference, starkPublicKey } = await this.link.setup(
				this.provider ? { providerPreference: ProviderPreference[this.provider] } : {},
			)
			if (address && starkPublicKey) {
				this.status = "connected"
				this.address = address
				this.starkPublicKey = starkPublicKey
				this.ethNetwork = ethNetwork
				this.providerPreference = providerPreference
				return { address, starkPublicKey, ethNetwork, providerPreference }
			} else {
				throw new Error("Connection failure! there is no address or starkAddress in response")
			}
		} catch (e: any) {
			console.log(`Connection failed with reason: ${e}`)
			throw new Error(e)
		}
	}

	public disconnect() {
		this.address = ""
		this.starkPublicKey = ""
		this.ethNetwork = ""
		this.providerPreference = ""

		this.status = "disconnected"

		if (localStorage) {
			if ("ETH_NETWORK" in localStorage) {
				localStorage.setItem("ETH_NETWORK", "")
			}
			if ("PROVIDER_PREFERENCE" in localStorage) {
				localStorage.setItem("PROVIDER_PREFERENCE", "")
			}
		}
	}

	public getConnectionData(): ImxConnectResult & { link: Link, status: ImxWalletConnectionStatus } {
		return {
			address: this.address,
			starkPublicKey: this.starkPublicKey,
			ethNetwork: this.ethNetwork,
			providerPreference: this.providerPreference,
			link: this.link,
			status: this.status,
		}
	}

	public getNetworkConfig(): ImxNetworkConfig & { env: ImxEnv } {
		return { ...IMX_ENV_CONFIG[this.env], env: this.env }
	}
}

export type { ImxNetwork, ImxEnv, ImxNetworkConfig }
export { IMX_NETWORK_CONFIG, IMX_ENV_CONFIG }
