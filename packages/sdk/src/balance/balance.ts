import type { Address } from "@rarible/types"
import type { Erc20AssetType, EthAssetType } from "@rarible/ethereum-api-client"
import { Configuration } from "@rarible/ethereum-api-client"
import type { BigNumberValue } from "@rarible/utils"
import { toBn } from "@rarible/utils"
import type { ImxEnv } from "@rarible/immutable-wallet"
import { ImxBalanceControllerApi } from "../apis"
import { IMX_ENV_CONFIG } from "../config/env"

export type BalanceRequestAssetType = EthAssetType | Erc20AssetType

export async function getBalance(
	env: ImxEnv,
	address: Address,
	assetType: BalanceRequestAssetType,
): Promise<BigNumberValue> {
	const { apiAddressV2 } = IMX_ENV_CONFIG[env]
	const balanceApiConfig = new Configuration({ basePath: apiAddressV2 })
	const api = new ImxBalanceControllerApi(balanceApiConfig)
	const { result } = await api.getAllBalances({ ownerAddress: address })
	const ethBalance = result.find(b => b.symbol === assetType.assetClass)
	return ethBalance ? toBn(ethBalance?.balance.toString()!) : toBn("0")
}
