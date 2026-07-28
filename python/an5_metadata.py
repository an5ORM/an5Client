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
    "embeddingConfig": [
        { "name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": True, "isId": True },
        { "name": "provider", "type": "string", "sql": "NVARCHAR(100)", "isOptional": False, "hasDefault": False, "isId": False },
        { "name": "apiKey", "type": "string", "sql": "NVARCHAR(4000)", "isOptional": False, "hasDefault": False, "isId": False },
        { "name": "model", "type": "string?", "sql": "NVARCHAR(500)", "isOptional": True, "hasDefault": False, "isId": False },
        { "name": "endpoint", "type": "string?", "sql": "NVARCHAR(2000)", "isOptional": True, "hasDefault": False, "isId": False },
        { "name": "isActive", "type": "boolean", "sql": "BIT", "isOptional": False, "hasDefault": True, "isId": False },
        { "name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False },
        { "name": "updatedAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False }
    ],
    "embedding_config": [
        { "name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": True, "isId": True },
        { "name": "provider", "type": "string", "sql": "NVARCHAR(100)", "isOptional": False, "hasDefault": False, "isId": False },
        { "name": "apiKey", "type": "string", "sql": "NVARCHAR(4000)", "isOptional": False, "hasDefault": False, "isId": False },
        { "name": "model", "type": "string?", "sql": "NVARCHAR(500)", "isOptional": True, "hasDefault": False, "isId": False },
        { "name": "endpoint", "type": "string?", "sql": "NVARCHAR(2000)", "isOptional": True, "hasDefault": False, "isId": False },
        { "name": "isActive", "type": "boolean", "sql": "BIT", "isOptional": False, "hasDefault": True, "isId": False },
        { "name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False },
        { "name": "updatedAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False }
    ],
    "llmConfig": [
        { "name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": True, "isId": True },
        { "name": "provider", "type": "string", "sql": "NVARCHAR(100)", "isOptional": False, "hasDefault": False, "isId": False },
        { "name": "apiKey", "type": "string", "sql": "NVARCHAR(4000)", "isOptional": False, "hasDefault": False, "isId": False },
        { "name": "model", "type": "string?", "sql": "NVARCHAR(500)", "isOptional": True, "hasDefault": False, "isId": False },
        { "name": "endpoint", "type": "string?", "sql": "NVARCHAR(2000)", "isOptional": True, "hasDefault": False, "isId": False },
        { "name": "isActive", "type": "boolean", "sql": "BIT", "isOptional": False, "hasDefault": True, "isId": False },
        { "name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False },
        { "name": "updatedAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False }
    ],
    "llm_config": [
        { "name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": True, "isId": True },
        { "name": "provider", "type": "string", "sql": "NVARCHAR(100)", "isOptional": False, "hasDefault": False, "isId": False },
        { "name": "apiKey", "type": "string", "sql": "NVARCHAR(4000)", "isOptional": False, "hasDefault": False, "isId": False },
        { "name": "model", "type": "string?", "sql": "NVARCHAR(500)", "isOptional": True, "hasDefault": False, "isId": False },
        { "name": "endpoint", "type": "string?", "sql": "NVARCHAR(2000)", "isOptional": True, "hasDefault": False, "isId": False },
        { "name": "isActive", "type": "boolean", "sql": "BIT", "isOptional": False, "hasDefault": True, "isId": False },
        { "name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False },
        { "name": "updatedAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False }
    ],
    "user": [
        { "name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": True, "isId": True },
        { "name": "email", "type": "string", "sql": "NVARCHAR(255)", "isOptional": False, "hasDefault": False, "isId": False },
        { "name": "name", "type": "string?", "sql": "NVARCHAR(255)", "isOptional": True, "hasDefault": False, "isId": False },
        { "name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False }
    ],
    "order": [
        { "name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": True, "isId": True },
        { "name": "userId", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": False, "hasDefault": False, "isId": False },
        { "name": "total", "type": "number", "sql": "INT", "isOptional": False, "hasDefault": True, "isId": False },
        { "name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": False, "hasDefault": True, "isId": False }
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
