// This file is auto-generated. Do not edit directly.
@file:Suppress("RedundantVisibilityModifier", "unused")

package an5.client

import java.time.LocalDateTime
import an5.adapters.Data as Values
import an5.adapters.Row
import an5.adapters.stringOrNull
import an5.adapters.boolOrNull
import an5.adapters.localDateTimeOrNull

/**
 * Embedding provider configuration. Stores API keys and model settings for RAG features.
 *
 * Every property is nullable and defaults to `null`, because `update` and `upsert` take a
 * partly filled value and a property left alone has to stay out of the statement.
 */
data class EmbeddingConfig(
    val id: String? = null,
    val provider: String? = null,
    val apiKey: String? = null,
    val model: String? = null,
    val endpoint: String? = null,
    val isActive: Boolean? = null,
    val createdAt: LocalDateTime? = null,
    val updatedAt: LocalDateTime? = null
) {

    /**
     * The columns to write, in declaration order, with `null` left out.
     *
     * An unset column takes the schema's DEFAULT, which is what leaving it out means.
     */
    fun toValues(): Values = buildValues {
        this["id"] = this@EmbeddingConfig.id
        this["provider"] = this@EmbeddingConfig.provider
        this["apiKey"] = this@EmbeddingConfig.apiKey
        this["model"] = this@EmbeddingConfig.model
        this["endpoint"] = this@EmbeddingConfig.endpoint
        this["isActive"] = this@EmbeddingConfig.isActive
        this["createdAt"] = this@EmbeddingConfig.createdAt
        this["updatedAt"] = this@EmbeddingConfig.updatedAt
    }

    companion object {
        /**
         * Reads a EmbeddingConfig out of a database row.
         *
         * Eager-loaded relations arrive as nested rows and are converted the same way; one
         * that was not asked for stays at its default, so an empty `orders` does not say
         * whether the query included it.
         */
        fun fromRow(row: Row): EmbeddingConfig = EmbeddingConfig(
            id = row.stringOrNull("id"),
            provider = row.stringOrNull("provider"),
            apiKey = row.stringOrNull("apiKey"),
            model = row.stringOrNull("model"),
            endpoint = row.stringOrNull("endpoint"),
            isActive = row.boolOrNull("isActive"),
            createdAt = row.localDateTimeOrNull("createdAt"),
            updatedAt = row.localDateTimeOrNull("updatedAt"),
        )
    }
}

/** Collects column values, skipping the ones left unset. */
private inline fun buildValues(block: MutableMap<String, Any?>.() -> Unit): Values {
    val values = LinkedHashMap<String, Any?>()
    values.block()
    values.entries.removeAll { it.value == null }
    return values
}
