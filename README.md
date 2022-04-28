# Rarible ImmutableX SDK

Rarible Immutable SDK enables easily interaction with [ImmutableX](https://www.immutable.com/) layer 2 on Rarible Protocol.

## Installation

```shell
yarn add @rarible/immutable-sdk @imtbl/imx-sdk @imtbl/imx-link-sdk
```

## Usage

SDK is written in TypeScript. You can use typing to explore SDK possibilities.

### Initialization

```typescript
import { createImxSdk } from "@rarible/immutable-sdk"
import Web3 from "web3"
import { Web3Ethereum } from "@rarible/web3-ethereum"

const web = new Web3(ethereum)
const web3Ethereum = new Web3Ethereum({ web3: web })
const sdk = createImxSdk(web3Ethereum, "dev")
```

- ethereum — Metamask browser instance (window.ethereum)

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
	payouts: [{ account: Address, value: BigNumber }],
	originFees: [{ account: Address, value: BigNumber }]
})
```

### Fill an order

```typescript
sdk.order.buy({
	orderIds: [""],
	fee: [{ account: Address, value: BigNumber }]
})
```

### Cancel an order

```typescript
sdk.order.cancel({
	orderId: "12345",
})
```

## Suggestions

You are welcome to [suggest features](https://github.com/rarible/protocol/discussions) and [report bugs found](https://github.com/rarible/protocol/issues)!

## Contributing

The codebase is maintained using the "contributor workflow" where everyone without exception contributes patch proposals using "pull requests" (PRs). This facilitates social contribution, easy testing, and peer review.

See more information on [CONTRIBUTING.md](https://github.com/rarible/protocol/blob/main/CONTRIBUTING.md).

## License

Rarible Immutable SDK is available under the [MIT License](LICENSE).
