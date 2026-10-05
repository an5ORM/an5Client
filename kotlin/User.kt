// This file is auto-generated. Do not edit directly.
@file:Suppress("RedundantVisibilityModifier", "unused")

package an5.client

import java.time.LocalDateTime
import an5.adapters.Data as Values
import an5.adapters.Row
import an5.adapters.stringOrNull
import an5.adapters.localDateTimeOrNull

/**
 * Represents a registered user in the database.
 *
 * Every property is nullable and defaults to `null`, because `update` and `upsert` take a
 * partly filled value and a property left alone has to stay out of the statement.
 */
data class User(
    val id: String? = null,
    val email: String? = null,
    val name: String? = null,
    val createdAt: LocalDateTime? = null
) {

    /**
     * The columns to write, in declaration order, with `null` left out.
     *
     * An unset column takes the schema's DEFAULT, which is what leaving it out means.
     */
    fun toValues(): Values = buildValues {
        this["id"] = this@User.id
        this["email"] = this@User.email
        this["name"] = this@User.name
        this["createdAt"] = this@User.createdAt
    }

    companion object {
        /**
         * Reads a User out of a database row.
         *
         * Eager-loaded relations arrive as nested rows and are converted the same way; one
         * that was not asked for stays at its default, so an empty `orders` does not say
         * whether the query included it.
         */
        fun fromRow(row: Row): User = User(
            id = row.stringOrNull("id"),
            email = row.stringOrNull("email"),
            name = row.stringOrNull("name"),
            createdAt = row.localDateTimeOrNull("createdAt"),
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
