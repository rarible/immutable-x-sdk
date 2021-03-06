import type { ImxEnvConfig } from "./domain"

export const IMMUTABLE_ENV_CONFIG: ImxEnvConfig = {
	e2e: {
		linkAddress: "https://link.ropsten.x.immutable.com",
		apiAddress: "https://api.ropsten.x.immutable.com/v1",
		apiAddressV2: "https://api.ropsten.x.immutable.com/v2",
		raribleApiAddress: "",
	},
	dev: {
		linkAddress: "https://link.ropsten.x.immutable.com",
		apiAddress: "https://api.ropsten.x.immutable.com/v1",
		apiAddressV2: "https://api.ropsten.x.immutable.com/v2",
		raribleApiAddress: "",
	},
	staging: {
		linkAddress: "https://link.ropsten.x.immutable.com",
		apiAddress: "https://api.ropsten.x.immutable.com/v1",
		apiAddressV2: "https://api.ropsten.x.immutable.com/v2",
		raribleApiAddress: "",
	},
	prod: {
		linkAddress: "https://link.x.immutable.com",
		apiAddress: "https://api.x.immutable.com/v1",
		apiAddressV2: "https://api.x.immutable.com/v2",
		raribleApiAddress: "",
	},
}
