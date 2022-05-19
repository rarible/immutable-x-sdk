export type ImxEnv = "mainnet" | "ropsten"
export type RaribleImxEnv = "e2e" | "dev" | "staging" | "prod" | "development"

export type ImxWalletProviderName = "METAMASK" | "MAGIC_LINK" | "WALLET_CONNECT" | "NONE"


export type ImxWalletConfig = {
	chainName: ImxEnv
	linkAddress: string
	gasLimit?: string
	gasPrice?: string
	enableDebug?: boolean
}

export type ImxEnvConfig = Record<ImxEnv, ImxWalletConfig>

export type RaribleImxEnvConfig = Record<RaribleImxEnv, ImxWalletConfig>
