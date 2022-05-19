import type { Address } from "@rarible/types"
import type { Erc20AssetType, EthAssetType } from "@rarible/ethereum-api-client"
import { Configuration } from "@rarible/ethereum-api-client"
import type { BigNumberValue } from "@rarible/utils"
import { toBn } from "@rarible/utils"
import type { RaribleImxEnv } from "@rarible/immutable-wallet"
import { ImxBalanceControllerApi } from "../apis"
import { RARIBLE_IMX_ENV_CONFIG } from "../config/env"

export type BalanceRequestAssetType = EthAssetType | Erc20AssetType

export async function getBalance(
	env: RaribleImxEnv,
	address: Address,
	assetType: BalanceRequestAssetType,
): Promise<BigNumberValue> {
	const { apiAddressV2 } = RARIBLE_IMX_ENV_CONFIG[env]
	const balanceApiConfig = new Configuration({ basePath: apiAddressV2 })
	const api = new ImxBalanceControllerApi(balanceApiConfig)
	const { result } = await api.getAllBalances({ ownerAddress: address })
	const ethBalance = result.find(b => b.symbol === assetType.assetClass)
	return ethBalance ? toBn(ethBalance?.balance.toString()!) : toBn("0")
}
