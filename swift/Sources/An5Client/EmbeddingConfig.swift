// This file is auto-generated. Do not edit deliberately.
import Foundation
import An5Adapters

/// Embedding provider configuration. Stores API keys and model settings for RAG features.
public struct EmbeddingConfig {
    /// `NVARCHAR(1000)`, primary key — Primary key
    public let id: String?
    /// `NVARCHAR(100)` — Embedding provider: openai, cohere, custom
    public let provider: String?
    /// `NVARCHAR(4000)` — API key for the embedding service
    public let apiKey: String?
    /// `NVARCHAR(500)` — Model name, e.g. text-embedding-3-small
    public let model: String?
    /// `NVARCHAR(2000)` — Custom endpoint URL
    public let endpoint: String?
    /// `BIT` — Whether this config is active
    public let isActive: Bool?
    /// `DATETIME2` — Creation timestamp
    public let createdAt: Date?
    /// `DATETIME2` — Last update timestamp
    public let updatedAt: Date?

    public init(
        id: String? = nil,
        provider: String? = nil,
        apiKey: String? = nil,
        model: String? = nil,
        endpoint: String? = nil,
        isActive: Bool? = nil,
        createdAt: Date? = nil,
        updatedAt: Date? = nil
    ) {
        self.id = id
        self.provider = provider
        self.apiKey = apiKey
        self.model = model
        self.endpoint = endpoint
        self.isActive = isActive
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }

    /// Reads `EmbeddingConfig` from a database row.
    ///
    /// Every column goes through a converter rather than a cast: a `BOOL` arrives as an
    /// `Int` on one driver and `Bool` on another, and a `NUMERIC` column still arrives
    /// as a `Decimal` even when it would fit in an `Int`.
    ///
    /// Eager-loaded relations arrive as nested rows and are converted the same way; one
    /// that was not asked for keeps its default, so an empty `orders` does not say
    /// whether the query included it.
    public init(row: Row) {
        self.id = row.string("id")
        self.provider = row.string("provider")
        self.apiKey = row.string("apiKey")
        self.model = row.string("model")
        self.endpoint = row.string("endpoint")
        self.isActive = row.bool("isActive")
        self.createdAt = row.date("createdAt")
        self.updatedAt = row.date("updatedAt")
    }

    /// The columns to write, in declaration order, with `nil` left out.
    ///
    /// An unset column takes the schema's DEFAULT, which is what leaving it out means —
    /// and what `update` needs so a partial value does not blank every other column.
    public var values: Values {
        var values = Values()
        if let value = self.id { values["id"] = value }
        if let value = self.provider { values["provider"] = value }
        if let value = self.apiKey { values["apiKey"] = value }
        if let value = self.model { values["model"] = value }
        if let value = self.endpoint { values["endpoint"] = value }
        if let value = self.isActive { values["isActive"] = value }
        if let value = self.createdAt { values["createdAt"] = value }
        if let value = self.updatedAt { values["updatedAt"] = value }
        return values
    }
}
