import type { ImxProtocolFee, RaribleImxEnv } from "../config/domain"
import { RARIBLE_IMX_ENV_CONFIG } from "../config/env"

export function getProtocolFee(network: RaribleImxEnv): ImxProtocolFee {
	return RARIBLE_IMX_ENV_CONFIG[network].protocolFee
}
