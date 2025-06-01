<img src="images/voyage-ai.png" alt="Voyage AI Logo" width="100" align="right" />

# Embeddings Voyage AI (n8n node)

This node integrates [Voyage AI](https://www.voyageai.com/) with [n8n](https://n8n.io), allowing you to generate high-quality text embeddings using Voyage’s models. It is compatible with n8n’s AI embedding interface.

## Installation

`n8n-nodes-voyageai-embeddings-unofficial`

## Features

- Supports all major Voyage AI embedding models
- Uses LangChain’s `VoyageEmbeddings`
- Configurable output dimensions, batch size, and timeout
- Works with vector stores and retrievers in n8n

## Setup

1. Create a new credential using your Voyage AI API key.
2. Add the **Embeddings Voyage AI** node to your workflow.
3. Select a model (e.g. `voyage-3`, `voyage-code-3`, etc).
4. Optionally configure advanced options like dimensions or timeout.
5. Connect it to a compatible node (e.g. vector store).

## Requirements

- A valid Voyage AI API key

## Resources

- [Voyage AI Documentation](https://docs.voyageai.com)
