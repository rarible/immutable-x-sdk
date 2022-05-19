import type { ImxEnvConfig, RaribleImxEnvConfig } from "./domain"

export const IMX_CONFIG: ImxEnvConfig = {
	mainnet: {
		chainName: "mainnet",
		linkAddress: "https://link.x.immutable.com",
		gasPrice: "4000000",
		gasLimit: "7000000",
		enableDebug: false,
	},
	ropsten: {
		chainName: "ropsten",
		linkAddress: "https://link.ropsten.x.immutable.com",
		gasPrice: "4000000",
		gasLimit: "7000000",
		enableDebug: true,
	},
}

export const RARIBLE_IMX_ENV_CONFIG: RaribleImxEnvConfig = {
	e2e: {
		...IMX_CONFIG.ropsten,
	},
	dev: {
		...IMX_CONFIG.ropsten,
	},
	staging: {
		...IMX_CONFIG.ropsten,
	},
	prod: {
		...IMX_CONFIG.mainnet,
	},
	development: {
		...IMX_CONFIG.ropsten,
	},
}
