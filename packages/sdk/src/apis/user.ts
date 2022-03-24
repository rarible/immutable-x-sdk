/* tslint:disable */
import * as runtime from "./runtime"

export interface GetImxUserStarkKeysRequest {
	address: string;
}

export interface GetImxUserStarkKeysResponse {
	accounts: string[]
}


export class ImxUserControllerApi extends runtime.BaseAPI {

	async getImxUserStarkKeysRaw(
		requestParameters: GetImxUserStarkKeysRequest,
	): Promise<runtime.ApiResponse<GetImxUserStarkKeysResponse>> {
		if (requestParameters.address === null || requestParameters.address === undefined) {
			throw new runtime.RequiredError("address", "Required parameter requestParameters.address was null or undefined when calling getImxUserStarkKeys.")
		}

		const queryParameters: runtime.HTTPQuery = {}

		const headerParameters: runtime.HTTPHeaders = {}

		const response = await this.request({
			path: "/users/{address}".replace(`{${"address"}}`, encodeURIComponent(String(requestParameters.address))),
			method: "GET",
			headers: headerParameters,
			query: queryParameters,
		})
		// @ts-ignore
		return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue as GetImxUserStarkKeysResponse)

	}

	/**
	 */
	async getImxUserStarkKeys(requestParameters: GetImxUserStarkKeysRequest): Promise<GetImxUserStarkKeysResponse> {
		const response = await this.getImxUserStarkKeysRaw(requestParameters)
		return await response.value()
	}
}
