import { toAddress, ZERO_ADDRESS } from "@rarible/types"
import { Configuration, NftCollectionControllerApi } from "@rarible/ethereum-api-client"
import { createImxSdk, RARIBLE_IMX_ENV_CONFIG } from "../index"
import { createClientTest } from "../test/create-client-test"
import { TEST_USERS } from "../test/test-users"
import { mintScript } from "../test/mint-test"

describe("Mint test", () => {
	const [userPk] = TEST_USERS
	const { raribleImxApiUrl, raribleCollection, metadataApiUrl } = RARIBLE_IMX_ENV_CONFIG["dev"]
	const raribleApiConfig = new Configuration({ basePath: raribleImxApiUrl })
	const nftCollectionApi = new NftCollectionControllerApi(raribleApiConfig)

	test("Shoult mint to rarible test collection", async () => {
		const sdk = createImxSdk(undefined, "dev")
		const balance = await sdk.balance.getBalance(ZERO_ADDRESS, { assetClass: "ETH" })
		expect(parseInt(balance.toString())).toBeGreaterThanOrEqual(1)

		const { client } = await createClientTest("dev", userPk)
		const result = await mintScript(
			client,
			nftCollectionApi,
			{
				metaUrl: metadataApiUrl,
				collection: toAddress(raribleCollection.contractAddress),
				royalties: [],
			},
		)
		console.log("result", result)
	}, 20000)
})
