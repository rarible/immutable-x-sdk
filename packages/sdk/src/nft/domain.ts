import type { Address, Erc721AssetType } from "@rarible/ethereum-api-client"
import type { ERC20TokenType, ERC721TokenType, ETHTokenType, Link } from "@imtbl/imx-sdk"

export type ImxAssetTypeWithAmount = {
	type: ERC721TokenType;
	tokenId: string;
	tokenAddress: string;
} | ({
	type: ETHTokenType;
} & {
	amount: string;
}) | ({
	type: ERC20TokenType;
	tokenAddress: string;
	symbol: string;
} & {
	amount: string;
})

export type ImxAssetType = {
	type: ETHTokenType;
} | {
	type: ERC721TokenType;
	tokenId: string;
	tokenAddress: string;
} | {
	type: ERC20TokenType;
	tokenAddress: string;
	symbol: string;
}

export type TransferRequest = {
	asset: Erc721AssetType,
	to: Address
}

export type TransferResponse = ReturnType<Link["transfer"]>
