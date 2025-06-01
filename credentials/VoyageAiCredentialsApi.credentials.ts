import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from "n8n-workflow"

export class VoyageAiCredentialsApi implements ICredentialType {
	name = "voyageAiApi"

	displayName = "Voyage AI API"

	documentationUrl = "https://docs.voyageai.com"

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

	test: ICredentialTestRequest = {
		request: {
			baseURL: "={{$credentials?.url}}",
			url: "/models",
		},
	}
}
