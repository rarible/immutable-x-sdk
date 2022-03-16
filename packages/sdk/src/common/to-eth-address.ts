import type { ImmutableXClient } from "@imtbl/imx-sdk"

type ImxBrandedEthAddress = Parameters<ImmutableXClient["getBalances"]>[0]["user"]

export function toEthAddress(address: string): ImxBrandedEthAddress {

	return address as ImxBrandedEthAddress
}
