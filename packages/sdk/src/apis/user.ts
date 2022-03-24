/* tslint:disable */
import type { ApiResponse, HTTPHeaders, HTTPQuery} from "./runtime"
import { BaseImxSdkAPI, JSONApiResponse, RequiredError } from "./runtime"

export interface GetImxUserStarkKeysRequest {
	address: string;
}

export interface GetImxUserStarkKeysResponse {
	accounts: string[]
}


export class ImxUserControllerApi extends BaseImxSdkAPI {

	async getImxUserStarkKeysRaw(
		requestParameters: GetImxUserStarkKeysRequest,
	): Promise<ApiResponse<GetImxUserStarkKeysResponse>> {
		if (requestParameters.address === null || requestParameters.address === undefined) {
			throw new RequiredError("address", "Required parameter requestParameters.address was null or undefined when calling getImxUserStarkKeys.")
		}

		const queryParameters: HTTPQuery = {}

		const headerParameters: HTTPHeaders = {}

		const response = await this.request({
			path: "/users/{address}".replace(`{${"address"}}`, encodeURIComponent(String(requestParameters.address))),
			method: "GET",
			headers: headerParameters,
			query: queryParameters,
		})
		// @ts-ignore
		return new JSONApiResponse(response, (jsonValue) => jsonValue as GetImxUserStarkKeysResponse)

	}

	/**
	 */
	async getImxUserStarkKeys(requestParameters: GetImxUserStarkKeysRequest): Promise<GetImxUserStarkKeysResponse> {
		const response = await this.getImxUserStarkKeysRaw(requestParameters)
		return await response.value()
	}
}
