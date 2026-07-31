# This file is auto-generated. Do not edit directly.

MODEL_TO_TABLE = {
    "embeddingConfig": "[dbo].[embeddingconfigs]",
    "embedding_config": "[dbo].[embeddingconfigs]",
    "llmConfig": "[dbo].[llmconfigs]",
    "llm_config": "[dbo].[llmconfigs]",
    "user": "[dbo].[users]",
    "order": "[dbo].[orders]",
}

MODEL_DESCRIPTIONS = {
    "embeddingConfig": "Embedding provider configuration. Stores API keys and model settings for RAG features.",
    "embedding_config": "Embedding provider configuration. Stores API keys and model settings for RAG features.",
    "llmConfig": "LLM provider configuration. Stores API keys and model settings for AI features.",
    "llm_config": "LLM provider configuration. Stores API keys and model settings for AI features.",
    "user": "Represents a registered user in the database.",
    "order": "Represents a customer order in the system.",
}

MODEL_FIELDS = {
    "embeddingConfig": [
        { "name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": True, "isId": True, "description": "Primary key" },
        { "name": "provider", "type": "string", "sql": "NVARCHAR(100)", "isOptional": False, "hasDefault": False, "isId": False, "description": "Embedding provider: openai, cohere, custom" },
        { "name": "apiKey", "type": "string", "sql": "NVARCHAR(4000)", "isOptional": False, "hasDefault": False, "isId": False, "description": "API key for the embedding service" },
        { "name": "model", "type": "string?", "sql": "NVARCHAR(500)", "isOptional": True, "hasDefault": False, "isId": False, "description": "Model name, e.g. text-embedding-3-small" },
        { "name": "endpoint", "type": "string?", "sql": "NVARCHAR(2000)", "isOptional": True, "hasDefault": False, "isId": False, "description": "Custom endpoint URL" },
        { "name": "isActive", "type": "boolean", "sql": "BIT", "isOptional": False, "hasDefault": True, "isId": False, "description": "Whether this config is active" },
        { "name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False, "description": "Creation timestamp" },
        { "name": "updatedAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False, "description": "Last update timestamp" }
    ],
    "embedding_config": [
        { "name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": True, "isId": True, "description": "Primary key" },
        { "name": "provider", "type": "string", "sql": "NVARCHAR(100)", "isOptional": False, "hasDefault": False, "isId": False, "description": "Embedding provider: openai, cohere, custom" },
        { "name": "apiKey", "type": "string", "sql": "NVARCHAR(4000)", "isOptional": False, "hasDefault": False, "isId": False, "description": "API key for the embedding service" },
        { "name": "model", "type": "string?", "sql": "NVARCHAR(500)", "isOptional": True, "hasDefault": False, "isId": False, "description": "Model name, e.g. text-embedding-3-small" },
        { "name": "endpoint", "type": "string?", "sql": "NVARCHAR(2000)", "isOptional": True, "hasDefault": False, "isId": False, "description": "Custom endpoint URL" },
        { "name": "isActive", "type": "boolean", "sql": "BIT", "isOptional": False, "hasDefault": True, "isId": False, "description": "Whether this config is active" },
        { "name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False, "description": "Creation timestamp" },
        { "name": "updatedAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False, "description": "Last update timestamp" }
    ],
    "llmConfig": [
        { "name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": True, "isId": True, "description": "Primary key" },
        { "name": "provider", "type": "string", "sql": "NVARCHAR(100)", "isOptional": False, "hasDefault": False, "isId": False, "description": "LLM provider: openai, gemini, custom, azure" },
        { "name": "apiKey", "type": "string", "sql": "NVARCHAR(4000)", "isOptional": False, "hasDefault": False, "isId": False, "description": "API key for the LLM provider" },
        { "name": "model", "type": "string?", "sql": "NVARCHAR(500)", "isOptional": True, "hasDefault": False, "isId": False, "description": "Model name, e.g. gpt-4o, gemini-2.5-flash" },
        { "name": "endpoint", "type": "string?", "sql": "NVARCHAR(2000)", "isOptional": True, "hasDefault": False, "isId": False, "description": "Custom endpoint URL" },
        { "name": "isActive", "type": "boolean", "sql": "BIT", "isOptional": False, "hasDefault": True, "isId": False, "description": "Whether this config is active" },
        { "name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False, "description": "Creation timestamp" },
        { "name": "updatedAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False, "description": "Last update timestamp" }
    ],
    "llm_config": [
        { "name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": True, "isId": True, "description": "Primary key" },
        { "name": "provider", "type": "string", "sql": "NVARCHAR(100)", "isOptional": False, "hasDefault": False, "isId": False, "description": "LLM provider: openai, gemini, custom, azure" },
        { "name": "apiKey", "type": "string", "sql": "NVARCHAR(4000)", "isOptional": False, "hasDefault": False, "isId": False, "description": "API key for the LLM provider" },
        { "name": "model", "type": "string?", "sql": "NVARCHAR(500)", "isOptional": True, "hasDefault": False, "isId": False, "description": "Model name, e.g. gpt-4o, gemini-2.5-flash" },
        { "name": "endpoint", "type": "string?", "sql": "NVARCHAR(2000)", "isOptional": True, "hasDefault": False, "isId": False, "description": "Custom endpoint URL" },
        { "name": "isActive", "type": "boolean", "sql": "BIT", "isOptional": False, "hasDefault": True, "isId": False, "description": "Whether this config is active" },
        { "name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False, "description": "Creation timestamp" },
        { "name": "updatedAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False, "description": "Last update timestamp" }
    ],
    "user": [
        { "name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": True, "isId": True, "description": "Primary key for the User table (auto-generated UUID)" },
        { "name": "email", "type": "string", "sql": "NVARCHAR(255)", "isOptional": False, "hasDefault": False, "isId": False, "description": "Unique email address used for login and notifications" },
        { "name": "name", "type": "string?", "sql": "NVARCHAR(255)", "isOptional": True, "hasDefault": False, "isId": False, "description": "Display name of the user" },
        { "name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False, "description": "Timestamp when the user profile was created" }
    ],
    "order": [
        { "name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": True, "isId": True, "description": "Primary key for the Order table (auto-generated UUID)" },
        { "name": "userId", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": False, "isId": False, "description": "Foreign key linking to the User model who placed the order" },
        { "name": "total", "type": "number", "sql": "INT", "isOptional": False, "hasDefault": True, "isId": False, "description": "Total cost amount of the order" },
        { "name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False, "description": "The date and time when the order was created." }
    ],
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
