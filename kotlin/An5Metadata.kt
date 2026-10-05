// This file is auto-generated. Do not edit directly.
package an5.client

import an5.adapters.base.Metadata

/**
 * The generated models' tables, columns and relations.
 *
 * Registered with the runtime when a client is constructed. Without it the table clients have
 * no table names to work with and no primary key to fill in.
 */
object An5Metadata {

    /** Model name to table name, schema-qualified. */
    val modelToTable: Map<String, String> = linkedMapOf(
        "EmbeddingConfig" to "dbo.embeddingconfigs",
        "LlmConfig" to "dbo.llmconfigs",
        "User" to "dbo.users",
        "Order" to "dbo.orders",
    )

    /** Model name to its columns, as the runtime reads them. */
    val modelFields: Map<String, List<Map<String, Any?>>> = linkedMapOf(
        "EmbeddingConfig" to listOf(
            field("id", "string", "NVARCHAR(1000)", false, true, true, "Primary key"),
            field("provider", "string", "NVARCHAR(100)", false, false, false, "Embedding provider: openai, cohere, custom"),
            field("apiKey", "string", "NVARCHAR(4000)", false, false, false, "API key for the embedding service"),
            field("model", "string", "NVARCHAR(500)", true, false, false, "Model name, e.g. text-embedding-3-small"),
            field("endpoint", "string", "NVARCHAR(2000)", true, false, false, "Custom endpoint URL"),
            field("isActive", "boolean", "BIT", false, true, false, "Whether this config is active"),
            field("createdAt", "Date", "DATETIME2", false, true, false, "Creation timestamp"),
            field("updatedAt", "Date", "DATETIME2", false, true, false, "Last update timestamp")
        ),
        "LlmConfig" to listOf(
            field("id", "string", "NVARCHAR(1000)", false, true, true, "Primary key"),
            field("provider", "string", "NVARCHAR(100)", false, false, false, "LLM provider: openai, gemini, custom, azure"),
            field("apiKey", "string", "NVARCHAR(4000)", false, false, false, "API key for the LLM provider"),
            field("model", "string", "NVARCHAR(500)", true, false, false, "Model name, e.g. gpt-4o, gemini-2.5-flash"),
            field("endpoint", "string", "NVARCHAR(2000)", true, false, false, "Custom endpoint URL"),
            field("isActive", "boolean", "BIT", false, true, false, "Whether this config is active"),
            field("createdAt", "Date", "DATETIME2", false, true, false, "Creation timestamp"),
            field("updatedAt", "Date", "DATETIME2", false, true, false, "Last update timestamp")
        ),
        "User" to listOf(
            field("id", "string", "NVARCHAR(1000)", false, true, true, "Primary key for the User table (auto-generated UUID)"),
            field("email", "string", "NVARCHAR(255)", false, false, false, "Unique email address used for login and notifications"),
            field("name", "string", "NVARCHAR(255)", true, false, false, "Display name of the user"),
            field("createdAt", "Date", "DATETIME2", false, true, false, "Timestamp when the user profile was created")
        ),
        "Order" to listOf(
            field("id", "string", "NVARCHAR(1000)", false, true, true, "Primary key for the Order table (auto-generated UUID)"),
            field("userId", "string", "NVARCHAR(1000)", false, false, false, "Foreign key linking to the User model who placed the order"),
            field("total", "number", "INT", false, true, false, "Total cost amount of the order"),
            field("createdAt", "Date", "DATETIME2", false, true, false, "The date and time when the order was created.")
        ),
    )

    /** Model name to its relations, keyed by relation name. */
    val relationMap: Map<String, Map<String, Map<String, String>>> = linkedMapOf(

    )

    /** Registers this schema with the runtime. */
    fun register() {
        Metadata.setAdapterMetadata(
            linkedMapOf<String, Any?>(
                "modelToTable" to modelToTable,
                "modelFields" to modelFields,
                "relationMap" to relationMap,
            )
        )
    }

    private fun field(
        name: String,
        type: String,
        sql: String,
        optional: Boolean,
        hasDefault: Boolean,
        isId: Boolean,
        description: String? = null,
    ): Map<String, Any?> = linkedMapOf(
        "name" to name,
        "type" to type,
        "sql" to sql,
        "isOptional" to optional,
        "hasDefault" to hasDefault,
        "isId" to isId,
        "description" to description,
    )

    private fun relation(
        modelName: String,
        relationType: String,
        foreignKey: String,
        localKey: String,
    ): Map<String, String> = linkedMapOf(
        "modelName" to modelName,
        "relationType" to relationType,
        "foreignKey" to foreignKey,
        "localKey" to localKey,
    )
}
