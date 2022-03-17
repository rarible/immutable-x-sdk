import type { Address } from "@rarible/types"
import type { Erc20AssetType, EthAssetType } from "@rarible/ethereum-api-client"
import type { BigNumberValue } from "@rarible/utils"
import { toBn } from "@rarible/utils"
import type { ImxBalanceControllerApi } from "../apis"

export type BalanceRequestAssetType = EthAssetType | Erc20AssetType

export class ImxBalances {
	constructor(private readonly apis: ImxBalanceControllerApi) {
		this.getBalance = this.getBalance.bind(this)
	}

	async getBalance(address: Address, assetType: BalanceRequestAssetType): Promise<BigNumberValue> {
		const { result } = await this.apis.getAllBalances({ ownerAddress: address })
		const ethBalance = result.find(b => b.symbol === assetType.assetClass)
		return toBn(ethBalance?.balance.toString()!)
	}
}
