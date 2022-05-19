import type { Part } from "@rarible/ethereum-api-client"
import type { ImxEnv, ImxNetworkConfig } from "@rarible/immutable-wallet"

export type ImxProtocolFee = {
	sellerFee: Part
	buyerFee: Part
}

export type ImxSdkConfig = {
	raribleEthereumApiUrl: string
	apiAddress: string
	apiAddressV2: string
	metadataApiUrl: string
	alchemyApiKey: string
	raribleCollection: {
		contractAddress: string
	}
	starkContractAddress: string
	registrationAddress: string
	protocolFee: ImxProtocolFee
}

export type ImxSdkEnvConfig = Record<ImxEnv, { raribleApiAddress: string } & ImxSdkConfig & ImxNetworkConfig>
