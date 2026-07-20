# This file is auto-generated. Do not edit directly.

MODEL_TO_TABLE = {
    "user": "[dbo].[users]",
    "order": "[dbo].[orders]",
}

MODEL_FIELDS = {
    "user": { "id": "string", "email": "string", "name": "string?", "createdAt": "Date" },
    "order": { "id": "string", "userId": "string", "total": "number", "createdAt": "Date" },
}

RELATION_MAP = {
    "user": {
    },
    "order": {
    },
}
