import type { Address } from "@rarible/types"
import type { Erc20AssetType, EthAssetType } from "@rarible/ethereum-api-client"
import type { ImxUserControllerApi } from "../apis/user"

export type BalanceRequestAssetType = EthAssetType | Erc20AssetType

export class ImxUser {
	constructor(private readonly apis: ImxUserControllerApi) {
		this.getUserStarkKeys = this.getUserStarkKeys.bind(this)
		this.checkUserIsRegistered = this.checkUserIsRegistered.bind(this)
	}

	async getUserStarkKeys(address: Address): Promise<string[]> {
		return await this.apis.getImxUserStarkKeys({ address })
	}

	async checkUserIsRegistered(address: Address, starkKey: string): Promise<boolean> {
		const starkKeys = await this.getUserStarkKeys(address)
		const found = starkKeys.find(e => e.toLowerCase() === starkKey.toLowerCase())
		return found?.toLowerCase() === starkKey.toLowerCase()
	}
}
