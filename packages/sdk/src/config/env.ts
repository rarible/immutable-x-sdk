import type { Address } from "@rarible/types"
import { ZERO_ADDRESS } from "@rarible/types"
import type { ImxEnvConfig, RaribleImxEnvConfig } from "./domain"

export const IMX_CONFIG: ImxEnvConfig = {
	mainnet: {
		imxNetwork: "mainnet",
		raribleEthereumApiUrl: "https://ethereum-api.rarible.org",
		linkAddress: "https://link.x.immutable.com",
		apiAddress: "https://api.x.immutable.com/v1",
		apiAddressV2: "https://api.x.immutable.com/v2",
		metadataApiUrl: "https://gateway.pinata.cloud/ipfs/QmQoiMLbJD7z4GiH2VogTcGKAG67nnucUixK9rG94WyhTU",
		alchemyApiKey: "", // todo place correct alchemy api key
		raribleCollection: {
			contractAddress: ZERO_ADDRESS, // todo define an address
		},
		starkContractAddress: "0x5FDCCA53617f4d2b9134B29090C87D01058e27e9",
		registrationAddress: "0x72a06bf2a1CE5e39cBA06c0CAb824960B587d64c",
		gasPrice: "40000000000",
		gasLimit: "7000000",
		enableDebug: false,
		protocolFee: {
			sellerFee: { account: "" as Address, value: 250 }, // todo define an address
			buyerFee: { account: "" as Address, value: 250 }, // todo define an address
		},
	},
	ropsten: {
		imxNetwork: "ropsten",
		raribleEthereumApiUrl: "https://ethereum-api-dev.rarible.org",
		linkAddress: "https://link.ropsten.x.immutable.com",
		apiAddress: "https://api.ropsten.x.immutable.com/v1",
		apiAddressV2: "https://api.ropsten.x.immutable.com/v2",
		alchemyApiKey: "GG27RjfvRVU073Kh33GjnfWQEk_1BFx8", // todo place correct alchemy api key
		metadataApiUrl: "https://gateway.pinata.cloud/ipfs/QmQoiMLbJD7z4GiH2VogTcGKAG67nnucUixK9rG94WyhTU", // todo define when schema tobe correct
		raribleCollection: {
			contractAddress: "0x6B11e2EEAbFa12ae875DdD9024665B7E7edEac68", // todo
		},
		starkContractAddress: "0x4527BE8f31E2ebFbEF4fCADDb5a17447B27d2aef",
		registrationAddress: "0x6C21EC8DE44AE44D0992ec3e2d9f1aBb6207D864",
		gasPrice: "40000000000",
		gasLimit: "7000000",
		enableDebug: true,
		protocolFee: {
			sellerFee: { account: "" as Address, value: 250 }, // todo define an address
			buyerFee: { account: "" as Address, value: 250 }, // todo define an address
		},
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
	development: {
		...IMX_CONFIG.ropsten,
		raribleApiAddress: "",
		raribleEthereumApiUrl: "https://dev-ethereum-api.rarible.org",
	},
}
