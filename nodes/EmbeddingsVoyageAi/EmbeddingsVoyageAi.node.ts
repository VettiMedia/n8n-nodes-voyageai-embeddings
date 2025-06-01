import { NodeConnectionType, type INodeType, type INodeTypeDescription, type SupplyData, type ISupplyDataFunctions, type INodeProperties } from "n8n-workflow"
import { VoyageEmbeddings } from "@langchain/community/embeddings/voyage"

const modelParameter: INodeProperties = {
	displayName: "Model",
	name: "model",
	type: "options",
	description: "The model to generate embeddings with",
	options: [
		{ name: "voyage-3", value: "voyage-3" },
		{ name: "voyage-3-large", value: "voyage-3-large" },
		{ name: "voyage-3-lite", value: "voyage-3-lite" },
		{ name: "voyage-code-2", value: "voyage-code-2" },
		{ name: "voyage-code-3", value: "voyage-code-3" },
		{ name: "voyage-finance-2", value: "voyage-finance-2" },
		{ name: "voyage-law-2", value: "voyage-law-2" },
		{ name: "voyage-multilingual-2", value: "voyage-multilingual-2" },
	],
	default: "voyage-3",
	routing: {
		send: {
			type: "body",
			property: "model",
		},
	},
}

export class EmbeddingsVoyageAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Embeddings Voyage AI",
		name: "embeddingsVoyageAi",
		icon: "file:voyage-ai.svg",
		credentials: [
			{
				name: "voyageAiApi",
				required: true,
			},
		],
		group: ["transform"],
		version: [1],
		description: "Use Voyage AI to generate embeddings",
		defaults: {
			name: "Embeddings Voyage AI",
		},
		codex: {
			categories: ["AI"],
			subcategories: {
				AI: ["Embeddings"],
			},
			resources: {
				primaryDocumentation: [
					{
						url: "https://docs.voyageai.com",
					},
				],
			},
		},
		inputs: [],
		outputs: [NodeConnectionType.AiEmbedding],
		outputNames: ["Embeddings"],
		requestDefaults: {
			ignoreHttpStatusErrors: true,
			baseURL: '={{ $parameter.options?.baseURL || $credentials.url || "https://api.voyageai.com/v1" }}',
		},
		properties: [
			modelParameter,
			{
				displayName: "Options",
				name: "options",
				type: "collection",
				placeholder: "Add Option",
				default: {},
				options: [
					{
						displayName: "Base URL",
						name: "baseURL",
						type: "string",
						default: "https://api.voyageai.com/v1",
						description: "Override the default base URL for the API",
					},
					{
						displayName: "Batch Size",
						name: "batchSize",
						type: "number",
						default: 512,
						typeOptions: { maxValue: 2048 },
						description: "Maximum number of documents to send in each request",
					},
					{
						displayName: "Dimensions",
						name: "dimensions",
						type: "options",
						options: [
							{ name: "256", value: 256 },
							{ name: "512", value: 512 },
							{ name: "1024", value: 1024 },
							{ name: "2048", value: 2048 },
						],
						default: 256,
						description: "Number of dimensions for the embeddings (only supported by some models)",
						displayOptions: {
							show: {
								model: ["voyage-3-large", "voyage-code-3"],
							},
						},
					},
					{
						displayName: "Strip New Lines",
						name: "stripNewLines",
						type: "boolean",
						default: true,
						description: "Whether to strip new lines from the input text",
					},
					{
						displayName: "Timeout",
						name: "timeout",
						type: "number",
						default: -1,
						description: "Maximum amount of time a request is allowed to take in seconds. Set to -1 for no timeout.",
					},
				],
			},
		],
	}

	async supplyData(this: ISupplyDataFunctions, itemIndex: number): Promise<SupplyData> {
		const credentials = await this.getCredentials("voyageAiApi")
		const model = this.getNodeParameter("model", itemIndex) as string
		const options = this.getNodeParameter("options", itemIndex, {}) as {
			baseURL?: string
			batchSize?: number
			stripNewLines?: boolean
			timeout?: number
			dimensions?: number
		}

		const embeddings = new VoyageEmbeddings({
			apiKey: credentials.apiKey as string,
			modelName: model,
			inputType: "document",
			truncation: true,
			outputDimension: options.dimensions,
			encodingFormat: "float",
		})
		embeddings.basePath = options.baseURL ?? (credentials.url as string)

		return {
			response: embeddings,
		}
	}
}
