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
 * LLM provider configuration. Stores API keys and model settings for AI features.
 *
 * Every property is nullable and defaults to `null`, because `update` and `upsert` take a
 * partly filled value and a property left alone has to stay out of the statement.
 */
data class LlmConfig(
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
        this["id"] = this@LlmConfig.id
        this["provider"] = this@LlmConfig.provider
        this["apiKey"] = this@LlmConfig.apiKey
        this["model"] = this@LlmConfig.model
        this["endpoint"] = this@LlmConfig.endpoint
        this["isActive"] = this@LlmConfig.isActive
        this["createdAt"] = this@LlmConfig.createdAt
        this["updatedAt"] = this@LlmConfig.updatedAt
    }

    companion object {
        /**
         * Reads a LlmConfig out of a database row.
         *
         * Eager-loaded relations arrive as nested rows and are converted the same way; one
         * that was not asked for stays at its default, so an empty `orders` does not say
         * whether the query included it.
         */
        fun fromRow(row: Row): LlmConfig = LlmConfig(
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
