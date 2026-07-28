# This file is auto-generated. Do not edit directly.

MODEL_TO_TABLE = {
    "embeddingConfig": "[dbo].[embeddingconfigs]",
    "embedding_config": "[dbo].[embeddingconfigs]",
    "llmConfig": "[dbo].[llmconfigs]",
    "llm_config": "[dbo].[llmconfigs]",
    "user": "[dbo].[users]",
    "order": "[dbo].[orders]",
}

MODEL_FIELDS = {
    "embeddingConfig": { "id": "string", "provider": "string", "apiKey": "string", "model": "string?", "endpoint": "string?", "isActive": "boolean", "createdAt": "Date", "updatedAt": "Date" },
    "embedding_config": { "id": "string", "provider": "string", "apiKey": "string", "model": "string?", "endpoint": "string?", "isActive": "boolean", "createdAt": "Date", "updatedAt": "Date" },
    "llmConfig": { "id": "string", "provider": "string", "apiKey": "string", "model": "string?", "endpoint": "string?", "isActive": "boolean", "createdAt": "Date", "updatedAt": "Date" },
    "llm_config": { "id": "string", "provider": "string", "apiKey": "string", "model": "string?", "endpoint": "string?", "isActive": "boolean", "createdAt": "Date", "updatedAt": "Date" },
    "user": { "id": "string", "email": "string", "name": "string?", "createdAt": "Date" },
    "order": { "id": "string", "userId": "string", "total": "number", "createdAt": "Date" },
}

RELATION_MAP = {
    "embeddingConfig": {
    },
    "embedding_config": {
    },
    "llmConfig": {
    },
    "llm_config": {
    },
    "user": {
    },
    "order": {
    },
}
