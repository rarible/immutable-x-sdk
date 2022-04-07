import { ImmutableXClient } from "@imtbl/imx-sdk"
import { AlchemyProvider } from "@ethersproject/providers"
import { Wallet } from "@ethersproject/wallet"
import type { RaribleImxEnv } from "../config/domain"
import { RARIBLE_IMX_ENV_CONFIG } from "../config/env"

export async function createClientTest(
	env: RaribleImxEnv,
	pk: string,
): Promise<{ client: ImmutableXClient, address: string }> {
	const {
		publicApiUrl,
		alchemyApiKey,
		starkContractAddress,
		registrationContractAddress,
		gasLimit,
		gasPrice,
		imxNetwork,
	} = RARIBLE_IMX_ENV_CONFIG[env]
	const provider = new AlchemyProvider(imxNetwork, alchemyApiKey)
	const wallet = new Wallet(Buffer.from(fixPK(pk), "hex"))
	const signer = wallet.connect(provider)
	const client = await ImmutableXClient.build({
		publicApiUrl,
		signer,
		starkContractAddress,
		registrationContractAddress,
		gasLimit,
		gasPrice,
		enableDebug: false,
	})
	return { client, address: client.address }
}

function fixPK(pk: string) {
	return pk.startsWith("0x") ? pk.substring(2) : pk
}
