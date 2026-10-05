// This file is auto-generated. Do not edit deliberately.
import Foundation
import An5Adapters

/// Represents a registered user in the database.
public struct User {
    /// `NVARCHAR(1000)`, primary key — Primary key for the User table (auto-generated UUID)
    public let id: String?
    /// `NVARCHAR(255)` — Unique email address used for login and notifications
    public let email: String?
    /// `NVARCHAR(255)` — Display name of the user
    public let name: String?
    /// `DATETIME2` — Timestamp when the user profile was created
    public let createdAt: Date?

    public init(
        id: String? = nil,
        email: String? = nil,
        name: String? = nil,
        createdAt: Date? = nil
    ) {
        self.id = id
        self.email = email
        self.name = name
        self.createdAt = createdAt
    }

    /// Reads `User` from a database row.
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
        self.email = row.string("email")
        self.name = row.string("name")
        self.createdAt = row.date("createdAt")
    }

    /// The columns to write, in declaration order, with `nil` left out.
    ///
    /// An unset column takes the schema's DEFAULT, which is what leaving it out means —
    /// and what `update` needs so a partial value does not blank every other column.
    public var values: Values {
        var values = Values()
        if let value = self.id { values["id"] = value }
        if let value = self.email { values["email"] = value }
        if let value = self.name { values["name"] = value }
        if let value = self.createdAt { values["createdAt"] = value }
        return values
    }
}
