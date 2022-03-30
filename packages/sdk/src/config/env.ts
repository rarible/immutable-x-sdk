import { ZERO_ADDRESS } from "@rarible/types"
import type { ImxEnvConfig, RaribleImxEnvConfig } from "./domain"

export const IMX_CONFIG: ImxEnvConfig = {
	mainnet: {
		imxNetwork: "mainnet",
		raribleImxApiUrl: "https://ethereum-api.rarible.org",
		linkAddress: "https://link.x.immutable.com",
		apiAddress: "https://api.x.immutable.com/v1",
		apiAddressV2: "https://api.x.immutable.com/v2",
		metadataApiUrl: "https://gateway.pinata.cloud/ipfs/QmQoiMLbJD7z4GiH2VogTcGKAG67nnucUixK9rG94WyhTU",
		alchemyApiKey: "", //todo
		raribleCollection: {
			contractAddress: ZERO_ADDRESS, // todo
		},
		starkContractAddress: "0x5FDCCA53617f4d2b9134B29090C87D01058e27e9",
		registrationAddress: "0x72a06bf2a1CE5e39cBA06c0CAb824960B587d64c",
		gasPrice: "40000000000",
		gasLimit: "7000000",
		enableDebug: false,
	},
	ropsten: {
		imxNetwork: "ropsten",
		raribleImxApiUrl: "https://ethereum-api-dev.rarible.org",
		linkAddress: "https://link.ropsten.x.immutable.com",
		apiAddress: "https://api.ropsten.x.immutable.com/v1",
		apiAddressV2: "https://api.ropsten.x.immutable.com/v2",
		alchemyApiKey: "GG27RjfvRVU073Kh33GjnfWQEk_1BFx8",
		metadataApiUrl: "https://gateway.pinata.cloud/ipfs/QmQoiMLbJD7z4GiH2VogTcGKAG67nnucUixK9rG94WyhTU",
		raribleCollection: {
			contractAddress: "0x582c911b50BCF07A7f9fb9b40a877Eff6825f875", // todo
		},
		starkContractAddress: "0x4527BE8f31E2ebFbEF4fCADDb5a17447B27d2aef",
		registrationAddress: "0x6C21EC8DE44AE44D0992ec3e2d9f1aBb6207D864",
		gasPrice: "40000000000",
		gasLimit: "7000000",
		enableDebug: true,
	},
}

export const RARIBLE_IMX_ENV_CONFIG: RaribleImxEnvConfig = {
	e2e: {
		...IMX_CONFIG.ropsten,
		raribleApiAddress: "",
	},
	dev: {
		...IMX_CONFIG.ropsten,
		raribleApiAddress: "",
	},
	staging: {
		...IMX_CONFIG.ropsten,
		raribleApiAddress: "",
	},
	prod: {
		...IMX_CONFIG.mainnet,
		raribleApiAddress: "",
	},
}
