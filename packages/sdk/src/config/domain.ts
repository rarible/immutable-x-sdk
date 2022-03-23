export type ImxEnv = "mainnet" | "ropsten"

export type RaribleImxEnv = "e2e" | "dev" | "staging" | "prod"

export type ImxConfig = {
	imxNetwork: ImxEnv
	linkAddress: string
	apiAddress: string
	apiAddressV2: string
	starkContractAddress: string
	registrationAddress: string
	gasLimit: string
	gasPrice: string
	enableDebug: boolean
}

export type ImxEnvConfig = Record<ImxEnv, ImxConfig>

export type RaribleImxEnvConfig = Record<RaribleImxEnv, { raribleApiAddress: string } & ImxConfig>
