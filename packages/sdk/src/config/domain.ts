import type { Part } from "@rarible/ethereum-api-client"

export type ImxProtocolFee = {
	sellerFee: Part
	buyerFee: Part
}

export type ImxEnv = "mainnet" | "ropsten"

export type RaribleImxEnv = "e2e" | "dev" | "staging" | "prod"

export type ImxConfig = {
	imxNetwork: ImxEnv
	raribleImxApiUrl: string
	linkAddress: string
	apiAddress: string
	apiAddressV2: string
	metadataApiUrl: string
	alchemyApiKey: string
	raribleCollection: {
		contractAddress: string
	}
	starkContractAddress: string
	registrationAddress: string
	gasLimit: string
	gasPrice: string
	enableDebug: boolean
	protocolFee: ImxProtocolFee
}

export type ImxEnvConfig = Record<ImxEnv, ImxConfig>

export type RaribleImxEnvConfig = Record<RaribleImxEnv, { raribleApiAddress: string } & ImxConfig>
