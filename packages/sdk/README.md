## Rarible ImmutableS SDK

Rarible immutable sdk enables easily interaction with [ImmutableX](https://www.immutable.com/) layer 2 on Rarible
Protocol.

### Installation

```shell
yarn add @rarible/immutable-sdk @imtbl/imx-sdk @imtbl/imx-link-sdk
```

### Usage

SDK is written in TypeScript. You can use typings to explore SDK possibilities.

### Initialisation

```typescript
import { createImxLink, createImxSdk } from "@rarible/immutable-sdk/build"

const wallet = createImxLink("dev")
const sdk = createImxSdk(wallet)
```

### Create sell order

```typescript
sdk.order.sell({
	takeAssetType: { assetClass: "ETH" },
	makeAssetType: {
		assetClass: "ERC721",
		contract,
		tokenId
	},
	amount: 1,
	price: "0.1",
	payouts: [],
	originFees: []
})
```

### Fill an order

```typescript
sdk.order.buy({
	orderIds: [""],
	fee: []
})
```
