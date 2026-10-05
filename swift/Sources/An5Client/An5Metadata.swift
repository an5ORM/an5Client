// This file is auto-generated. Do not edit deliberately.
import Foundation
import An5Adapters

/// The generated models' tables, columns and relations.
///
/// Passed to the runtime when a database is opened. Without it the table clients have no
/// table names to work with and no primary key to fill in.
public enum An5Metadata {

    /// Model name to table name, schema-qualified.
    public static let modelToTable: [String: String] = [
        "EmbeddingConfig": "dbo.embeddingconfigs",
        "LlmConfig": "dbo.llmconfigs",
        "User": "dbo.users",
        "Order": "dbo.orders",
    ]

    /// Model name to its columns, as the runtime reads them.
    public static let modelFields: [String: [[String: Any?]]] = [
        "EmbeddingConfig": [
            ["name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": false, "hasDefault": true, "isId": true, "description": "Primary key"],
            ["name": "provider", "type": "string", "sql": "NVARCHAR(100)", "isOptional": false, "hasDefault": false, "isId": false, "description": "Embedding provider: openai, cohere, custom"],
            ["name": "apiKey", "type": "string", "sql": "NVARCHAR(4000)", "isOptional": false, "hasDefault": false, "isId": false, "description": "API key for the embedding service"],
            ["name": "model", "type": "string", "sql": "NVARCHAR(500)", "isOptional": true, "hasDefault": false, "isId": false, "description": "Model name, e.g. text-embedding-3-small"],
            ["name": "endpoint", "type": "string", "sql": "NVARCHAR(2000)", "isOptional": true, "hasDefault": false, "isId": false, "description": "Custom endpoint URL"],
            ["name": "isActive", "type": "boolean", "sql": "BIT", "isOptional": false, "hasDefault": true, "isId": false, "description": "Whether this config is active"],
            ["name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": false, "hasDefault": true, "isId": false, "description": "Creation timestamp"],
            ["name": "updatedAt", "type": "Date", "sql": "DATETIME2", "isOptional": false, "hasDefault": true, "isId": false, "description": "Last update timestamp"],
        ],
        "LlmConfig": [
            ["name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": false, "hasDefault": true, "isId": true, "description": "Primary key"],
            ["name": "provider", "type": "string", "sql": "NVARCHAR(100)", "isOptional": false, "hasDefault": false, "isId": false, "description": "LLM provider: openai, gemini, custom, azure"],
            ["name": "apiKey", "type": "string", "sql": "NVARCHAR(4000)", "isOptional": false, "hasDefault": false, "isId": false, "description": "API key for the LLM provider"],
            ["name": "model", "type": "string", "sql": "NVARCHAR(500)", "isOptional": true, "hasDefault": false, "isId": false, "description": "Model name, e.g. gpt-4o, gemini-2.5-flash"],
            ["name": "endpoint", "type": "string", "sql": "NVARCHAR(2000)", "isOptional": true, "hasDefault": false, "isId": false, "description": "Custom endpoint URL"],
            ["name": "isActive", "type": "boolean", "sql": "BIT", "isOptional": false, "hasDefault": true, "isId": false, "description": "Whether this config is active"],
            ["name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": false, "hasDefault": true, "isId": false, "description": "Creation timestamp"],
            ["name": "updatedAt", "type": "Date", "sql": "DATETIME2", "isOptional": false, "hasDefault": true, "isId": false, "description": "Last update timestamp"],
        ],
        "User": [
            ["name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": false, "hasDefault": true, "isId": true, "description": "Primary key for the User table (auto-generated UUID)"],
            ["name": "email", "type": "string", "sql": "NVARCHAR(255)", "isOptional": false, "hasDefault": false, "isId": false, "description": "Unique email address used for login and notifications"],
            ["name": "name", "type": "string", "sql": "NVARCHAR(255)", "isOptional": true, "hasDefault": false, "isId": false, "description": "Display name of the user"],
            ["name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": false, "hasDefault": true, "isId": false, "description": "Timestamp when the user profile was created"],
        ],
        "Order": [
            ["name": "id", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": false, "hasDefault": true, "isId": true, "description": "Primary key for the Order table (auto-generated UUID)"],
            ["name": "userId", "type": "string", "sql": "NVARCHAR(1000)", "isOptional": false, "hasDefault": false, "isId": false, "description": "Foreign key linking to the User model who placed the order"],
            ["name": "total", "type": "number", "sql": "INT", "isOptional": false, "hasDefault": true, "isId": false, "description": "Total cost amount of the order"],
            ["name": "createdAt", "type": "Date", "sql": "DATETIME2", "isOptional": false, "hasDefault": true, "isId": false, "description": "The date and time when the order was created."],
        ],
    ]

    /// Model name to its relations, keyed by relation name.
    public static let relationMap: [String: [String: [String: String]]] = [:]


    /// This schema, in the shape the runtime reads.
    public static var metadata: Metadata {
        Metadata([
            "modelToTable": modelToTable,
            "modelFields": modelFields,
            "relationMap": relationMap,
        ]) ?? .empty
    }
}
