import { Configuration, NftCollectionControllerApi } from "@rarible/ethereum-api-client"
import { ZERO_ADDRESS } from "@rarible/types"
import { IMX_CONFIG } from "../../config/env"
import { getTokenId } from "./get-token-id"

describe("getTokenId test", () => {
	const config = new Configuration({ basePath: IMX_CONFIG.ropsten.raribleImxApiUrl })
	const collectionApi = new NftCollectionControllerApi(config)
	test("Should get token id", async () => {
		const { tokenId, signature } = await getTokenId(collectionApi, ZERO_ADDRESS, ZERO_ADDRESS)
		expect(parseInt(tokenId)).toBeGreaterThanOrEqual(0)
		expect(signature).toBeTruthy()
	})
})
