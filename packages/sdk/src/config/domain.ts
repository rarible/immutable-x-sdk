import type { Part } from "@rarible/ethereum-api-client"
import type { ImxEnv, RaribleImxEnv } from "@rarible/immutable-wallet"

export type ImxProtocolFee = {
	sellerFee: Part
	buyerFee: Part
}

export type ImxConfig = {
	imxNetwork: ImxEnv
	raribleEthereumApiUrl: string
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
