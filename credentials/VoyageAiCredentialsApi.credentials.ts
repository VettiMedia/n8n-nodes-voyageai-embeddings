import type { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from "n8n-workflow"

export class VoyageAiCredentialsApi implements ICredentialType {
	name = "voyageAiApi"
	displayName = "Voyage AI API"
	documentationUrl = "https://docs.voyageai.com/docs/api-key-and-installation"
	icon: Icon = "file:voyage-ai.svg"

	properties: INodeProperties[] = [
		{
			displayName: "API Key",
			name: "apiKey",
			type: "string",
			typeOptions: { password: true },
			required: true,
			default: "",
		},
		{
			displayName: "Base URL",
			name: "url",
			type: "string",
			default: "https://api.voyageai.com/v1",
			description: "Override the default base URL for the API",
		},
	]

	authenticate: IAuthenticateGeneric = {
		type: "generic",
		properties: {
			headers: {
				Authorization: "=Bearer {{$credentials.apiKey}}",
			},
		},
	}

	// test: ICredentialTestRequest = {
	// 	request: {
	// 		method: "POST",
	// 		baseURL: "={{$credentials?.url}}",
	// 		url: "/embeddings",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: {
	// 			input: ["test"],
	// 			model: "invalid-model-for-testing",
	// 		},
	// 	},
	// }
}
