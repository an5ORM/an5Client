// This file is auto-generated. Do not edit deliberately.
import Foundation
import An5Adapters

/// Represents a customer order in the system.
public struct Order {
    /// `NVARCHAR(1000)`, primary key — Primary key for the Order table (auto-generated UUID)
    public let id: String?
    /// `NVARCHAR(1000)` — Foreign key linking to the User model who placed the order
    public let userId: String?
    /// `INT` — Total cost amount of the order
    public let total: Int?
    /// `DATETIME2` — The date and time when the order was created.
    public let createdAt: Date?

    public init(
        id: String? = nil,
        userId: String? = nil,
        total: Int? = nil,
        createdAt: Date? = nil
    ) {
        self.id = id
        self.userId = userId
        self.total = total
        self.createdAt = createdAt
    }

    /// Reads `Order` from a database row.
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
        self.userId = row.string("userId")
        self.total = row.int("total")
        self.createdAt = row.date("createdAt")
    }

    /// The columns to write, in declaration order, with `nil` left out.
    ///
    /// An unset column takes the schema's DEFAULT, which is what leaving it out means —
    /// and what `update` needs so a partial value does not blank every other column.
    public var values: Values {
        var values = Values()
        if let value = self.id { values["id"] = value }
        if let value = self.userId { values["userId"] = value }
        if let value = self.total { values["total"] = value }
        if let value = self.createdAt { values["createdAt"] = value }
        return values
    }
}
