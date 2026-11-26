// This file is auto-generated. Do not edit deliberately.
import Foundation
import An5Adapters

/// Typed filters for the generated models.
///
/// A filter is a small builder whose `build()` produces the filter tree the runtime's SQL
/// builder reads, so a query is checked at the call site and still compiles down to bind
/// parameters rather than interpolated SQL.
public enum An5Orm {

    /// A filter on a string column.
    public struct StringFilter {
        private var operators: Where = [:]

        public init() {}

        public static func `is`(_ value: String?) -> StringFilter {
            var filter = StringFilter()
            filter.operators["equals"] = value.map { $0 as Any } ?? NSNull()
            return filter
        }

        public static func isNot(_ value: String?) -> StringFilter {
            var filter = StringFilter()
            filter.operators["not"] = value.map { $0 as Any } ?? NSNull()
            return filter
        }

        public static func has(_ value: String) -> StringFilter {
            var filter = StringFilter()
            filter.operators["contains"] = value
            return filter
        }

        public static func starts(_ value: String) -> StringFilter {
            var filter = StringFilter()
            filter.operators["startsWith"] = value
            return filter
        }

        public static func ends(_ value: String) -> StringFilter {
            var filter = StringFilter()
            filter.operators["endsWith"] = value
            return filter
        }

        public static func inList(_ values: [String]) -> StringFilter {
            StringFilter().inList(values)
        }

        public static func notInList(_ values: [String]) -> StringFilter {
            StringFilter().notInList(values)
        }

        public func inList(_ values: [String]) -> StringFilter {
            var filter = self
            filter.operators["in"] = values
            return filter
        }

        public func notInList(_ values: [String]) -> StringFilter {
            var filter = self
            filter.operators["notIn"] = values
            return filter
        }

        public func mode(_ value: String) -> StringFilter {
            var filter = self
            filter.operators["mode"] = value
            return filter
        }

        public func insensitive() -> StringFilter {
            mode("insensitive")
        }

        /// The filter as the runtime reads it.
        public func build() -> Where { operators }
    }

    /// A filter on an integer or floating-point column.
    public struct NumberFilter {
        private var operators: Where = [:]

        public init() {}

        public static func `is`(_ value: Double?) -> NumberFilter {
            var filter = NumberFilter()
            filter.operators["equals"] = value.map { $0 as Any } ?? NSNull()
            return filter
        }

        public static func isNot(_ value: Double?) -> NumberFilter {
            var filter = NumberFilter()
            filter.operators["not"] = value.map { $0 as Any } ?? NSNull()
            return filter
        }

        public static func atLeast(_ value: Double?) -> NumberFilter {
            var filter = NumberFilter()
            if let value { filter.operators["gte"] = value }
            return filter
        }

        public static func atMost(_ value: Double?) -> NumberFilter {
            var filter = NumberFilter()
            if let value { filter.operators["lte"] = value }
            return filter
        }

        public static func greater(_ value: Double?) -> NumberFilter {
            var filter = NumberFilter()
            if let value { filter.operators["gt"] = value }
            return filter
        }

        public static func less(_ value: Double?) -> NumberFilter {
            var filter = NumberFilter()
            if let value { filter.operators["lt"] = value }
            return filter
        }

        public static func inList(_ values: [Double]) -> NumberFilter {
            NumberFilter().inList(values)
        }

        public static func notInList(_ values: [Double]) -> NumberFilter {
            NumberFilter().notInList(values)
        }

        public func inList(_ values: [Double]) -> NumberFilter {
            var filter = self
            filter.operators["in"] = values
            return filter
        }

        public func notInList(_ values: [Double]) -> NumberFilter {
            var filter = self
            filter.operators["notIn"] = values
            return filter
        }

        /// The filter as the runtime reads it.
        public func build() -> Where { operators }
    }

    /// A filter on a boolean column.
    public struct BoolFilter {
        private var operators: Where = [:]

        public init() {}

        public static func `is`(_ value: Bool?) -> BoolFilter {
            var filter = BoolFilter()
            filter.operators["equals"] = value.map { $0 as Any } ?? NSNull()
            return filter
        }

        public static func isNot(_ value: Bool?) -> BoolFilter {
            var filter = BoolFilter()
            filter.operators["not"] = value.map { $0 as Any } ?? NSNull()
            return filter
        }

        /// The filter as the runtime reads it.
        public func build() -> Where { operators }
    }

    /// A filter on a date column.
    public struct DateFilter {
        private var operators: Where = [:]

        public init() {}

        public static func `is`(_ value: Date?) -> DateFilter {
            var filter = DateFilter()
            filter.operators["equals"] = value.map { $0 as Any } ?? NSNull()
            return filter
        }

        public static func atLeast(_ value: Date?) -> DateFilter {
            var filter = DateFilter()
            if let value { filter.operators["gte"] = value }
            return filter
        }

        public static func atMost(_ value: Date?) -> DateFilter {
            var filter = DateFilter()
            if let value { filter.operators["lte"] = value }
            return filter
        }

        /// The filter as the runtime reads it.
        public func build() -> Where { operators }
    }

    /// Common interface for generated per-model `WHERE` builders.
    public protocol WhereBuilder {
        init()
        func build() -> Where
    }

    /// Common interface for generated per-model `HAVING` builders.
    public protocol HavingBuilder {
        init()
        func build() -> Where
    }

    /// Common interface for generated per-model `groupBy` builders.
    public protocol GroupByBuilder {
        func build() -> Aggregate
    }

    /// A filter on a to-many relation (`some`, `none`, `every`).
    public struct ListRelationFilter<Target: WhereBuilder> {
        private var operators: Where = [:]

        public init() {}

        public static func some(_ filter: Target = Target()) -> ListRelationFilter {
            var relation = ListRelationFilter()
            relation.operators["some"] = filter.build()
            return relation
        }

        public static func none(_ filter: Target = Target()) -> ListRelationFilter {
            var relation = ListRelationFilter()
            relation.operators["none"] = filter.build()
            return relation
        }

        public static func every(_ filter: Target) -> ListRelationFilter {
            var relation = ListRelationFilter()
            relation.operators["every"] = filter.build()
            return relation
        }

        public func some(_ filter: Target = Target()) -> ListRelationFilter {
            var relation = self
            relation.operators["some"] = filter.build()
            return relation
        }

        public func none(_ filter: Target = Target()) -> ListRelationFilter {
            var relation = self
            relation.operators["none"] = filter.build()
            return relation
        }

        public func every(_ filter: Target) -> ListRelationFilter {
            var relation = self
            relation.operators["every"] = filter.build()
            return relation
        }

        /// The relation filter as the runtime reads it.
        public func build() -> Where { operators }
    }

    /// A filter on a to-one relation (`is`, `isNot`).
    public struct RelationFilter<Target: WhereBuilder> {
        private var operators: Where = [:]

        public init() {}

        public static func `is`(_ filter: Target?) -> RelationFilter {
            var relation = RelationFilter()
            let payload: Any = filter.map { $0.build() as Any } ?? NSNull()
            relation.operators["is"] = payload
            return relation
        }

        public static func isNot(_ filter: Target?) -> RelationFilter {
            var relation = RelationFilter()
            let payload: Any = filter.map { $0.build() as Any } ?? NSNull()
            relation.operators["isNot"] = payload
            return relation
        }

        public func `is`(_ filter: Target?) -> RelationFilter {
            var relation = self
            let payload: Any = filter.map { $0.build() as Any } ?? NSNull()
            relation.operators["is"] = payload
            return relation
        }

        public func isNot(_ filter: Target?) -> RelationFilter {
            var relation = self
            let payload: Any = filter.map { $0.build() as Any } ?? NSNull()
            relation.operators["isNot"] = payload
            return relation
        }

        /// The relation filter as the runtime reads it.
        public func build() -> Where { operators }
    }

    /// A `WHERE` for EmbeddingConfig. Unset filters are left out.
    public struct EmbeddingConfigWhere: WhereBuilder {
        private var operators: Where = [:]
        public var id: StringFilter?
        public var provider: StringFilter?
        public var apiKey: StringFilter?
        public var model: StringFilter?
        public var endpoint: StringFilter?
        public var isActive: BoolFilter?
        public var createdAt: DateFilter?
        public var updatedAt: DateFilter?

        /// Creates a filter with every column unset; assign the ones you want to match.
        public init() {}

        public func and(_ clauses: EmbeddingConfigWhere...) -> EmbeddingConfigWhere {
            var filter = self
            filter.operators["AND"] = clauses.map { $0.build() }
            return filter
        }

        public func or(_ clauses: EmbeddingConfigWhere...) -> EmbeddingConfigWhere {
            var filter = self
            filter.operators["OR"] = clauses.map { $0.build() }
            return filter
        }

        public func not(_ clause: EmbeddingConfigWhere) -> EmbeddingConfigWhere {
            var filter = self
            filter.operators["NOT"] = [clause.build()]
            return filter
        }

        /// The filter tree as the runtime reads it.
        ///
        /// Column conditions are read from the properties here rather than written into
        /// `operators` as they are assigned, because a condition dropped on the way in is not
        /// an error — it is a filter that quietly matches every row.
        public func build() -> Where {
            var filter = operators
            if let id = id { filter["id"] = id.build() }
            if let provider = provider { filter["provider"] = provider.build() }
            if let apiKey = apiKey { filter["apiKey"] = apiKey.build() }
            if let model = model { filter["model"] = model.build() }
            if let endpoint = endpoint { filter["endpoint"] = endpoint.build() }
            if let isActive = isActive { filter["isActive"] = isActive.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            if let updatedAt = updatedAt { filter["updatedAt"] = updatedAt.build() }
            return filter
        }
    }

    /// An `ORDER BY` for EmbeddingConfig.
    public struct EmbeddingConfigOrderBy {
        private var entries: [[String: String]] = []

        public init() {}

        /// Orders by the columns, ascending.
        public func asc(_ columns: String...) -> EmbeddingConfigOrderBy {
            var order = self
            for column in columns { order.entries.append([column: "asc"]) }
            return order
        }

        /// Orders by the column, descending.
        public func desc(_ column: String) -> EmbeddingConfigOrderBy {
            var order = self
            order.entries.append([column: "desc"])
            return order
        }

        /// The sort as the runtime reads it.
        public func build() -> [[String: String]] { entries }
    }

    /// Count aggregate filter for EmbeddingConfig.groupBy() HAVING clauses.
    public struct EmbeddingConfigCountAggregateFilter {
        public var _all: NumberFilter?
        public var id: NumberFilter?
        public var provider: NumberFilter?
        public var apiKey: NumberFilter?
        public var model: NumberFilter?
        public var endpoint: NumberFilter?
        public var isActive: NumberFilter?
        public var createdAt: NumberFilter?
        public var updatedAt: NumberFilter?

        public init() {}

        public func build() -> Where {
            var filter: Where = [:]
            if let _all = _all { filter["_all"] = _all.build() }
            if let id = id { filter["id"] = id.build() }
            if let provider = provider { filter["provider"] = provider.build() }
            if let apiKey = apiKey { filter["apiKey"] = apiKey.build() }
            if let model = model { filter["model"] = model.build() }
            if let endpoint = endpoint { filter["endpoint"] = endpoint.build() }
            if let isActive = isActive { filter["isActive"] = isActive.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            if let updatedAt = updatedAt { filter["updatedAt"] = updatedAt.build() }
            return filter
        }
    }

    /// Numeric aggregate filter (sum/avg) for EmbeddingConfig.groupBy() HAVING clauses.
    public struct EmbeddingConfigNumericAggregateFilter {


        public init() {}

        public func build() -> Where {
            return [:]
        }
    }

    /// Scalar aggregate filter (min/max) for EmbeddingConfig.groupBy() HAVING clauses.
    public struct EmbeddingConfigScalarAggregateFilter {
        public var id: StringFilter?
        public var provider: StringFilter?
        public var apiKey: StringFilter?
        public var model: StringFilter?
        public var endpoint: StringFilter?
        public var isActive: BoolFilter?
        public var createdAt: DateFilter?
        public var updatedAt: DateFilter?

        public init() {}

        public func build() -> Where {
            var filter: Where = [:]
            if let id = id { filter["id"] = id.build() }
            if let provider = provider { filter["provider"] = provider.build() }
            if let apiKey = apiKey { filter["apiKey"] = apiKey.build() }
            if let model = model { filter["model"] = model.build() }
            if let endpoint = endpoint { filter["endpoint"] = endpoint.build() }
            if let isActive = isActive { filter["isActive"] = isActive.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            if let updatedAt = updatedAt { filter["updatedAt"] = updatedAt.build() }
            return filter
        }
    }

    /// A `HAVING` builder for EmbeddingConfig.groupBy() queries.
    public struct EmbeddingConfigAggregateHaving: HavingBuilder {
        private var operators: Where = [:]
        public var _count: EmbeddingConfigCountAggregateFilter?
        public var _sum: EmbeddingConfigNumericAggregateFilter?
        public var _avg: EmbeddingConfigNumericAggregateFilter?
        public var _min: EmbeddingConfigScalarAggregateFilter?
        public var _max: EmbeddingConfigScalarAggregateFilter?
        public var id: StringFilter?
        public var provider: StringFilter?
        public var apiKey: StringFilter?
        public var model: StringFilter?
        public var endpoint: StringFilter?
        public var isActive: BoolFilter?
        public var createdAt: DateFilter?
        public var updatedAt: DateFilter?

        public init() {}

        public func and(_ clauses: EmbeddingConfigAggregateHaving...) -> EmbeddingConfigAggregateHaving {
            var filter = self
            filter.operators["AND"] = clauses.map { $0.build() }
            return filter
        }

        public func or(_ clauses: EmbeddingConfigAggregateHaving...) -> EmbeddingConfigAggregateHaving {
            var filter = self
            filter.operators["OR"] = clauses.map { $0.build() }
            return filter
        }

        public func not(_ clause: EmbeddingConfigAggregateHaving) -> EmbeddingConfigAggregateHaving {
            var filter = self
            filter.operators["NOT"] = [clause.build()]
            return filter
        }

        public func build() -> Where {
            var filter = operators
            if let _count = _count { filter["_count"] = _count.build() }
            if let _sum = _sum { filter["_sum"] = _sum.build() }
            if let _avg = _avg { filter["_avg"] = _avg.build() }
            if let _min = _min { filter["_min"] = _min.build() }
            if let _max = _max { filter["_max"] = _max.build() }
            if let id = id { filter["id"] = id.build() }
            if let provider = provider { filter["provider"] = provider.build() }
            if let apiKey = apiKey { filter["apiKey"] = apiKey.build() }
            if let model = model { filter["model"] = model.build() }
            if let endpoint = endpoint { filter["endpoint"] = endpoint.build() }
            if let isActive = isActive { filter["isActive"] = isActive.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            if let updatedAt = updatedAt { filter["updatedAt"] = updatedAt.build() }
            return filter
        }
    }

    /// Type-safe `groupBy` builder for EmbeddingConfig.
    public struct EmbeddingConfigGroupBy: GroupByBuilder {
        private var spec = Aggregate()

        public init() {}

        public func by(_ columns: String...) -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.by.append(contentsOf: columns)
            return builder
        }

        public func `where`(_ filter: EmbeddingConfigWhere) -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.filter = filter.build()
            return builder
        }

        public func `where`(_ filter: Where) -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.filter = filter
            return builder
        }

        public func having(_ filter: EmbeddingConfigAggregateHaving) -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.having = filter.build()
            return builder
        }

        public func having(_ filter: Where) -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.having = filter
            return builder
        }

        public func orderBy(_ order: EmbeddingConfigOrderBy) -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.orderBy = order.build()
            return builder
        }

        public func orderBy(_ entries: [[String: String]]) -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.orderBy = entries
            return builder
        }

        public func skip(_ value: Int) -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.skip = Swift.max(0, value)
            return builder
        }

        public func take(_ value: Int?) -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.take = value
            return builder
        }

        public func count() -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.count = true
            return builder
        }

        public func count(_ columns: String...) -> EmbeddingConfigGroupBy {
            var builder = self
            for column in columns {
                if column == "_all" {
                    builder.spec.count = true
                }
                if !builder.spec.countFields.contains(column) {
                    builder.spec.countFields.append(column)
                }
            }
            return builder
        }

        public func sum(_ columns: String...) -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.sum.append(contentsOf: columns)
            return builder
        }

        public func average(_ columns: String...) -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.average.append(contentsOf: columns)
            return builder
        }

        public func min(_ columns: String...) -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.minimum.append(contentsOf: columns)
            return builder
        }

        public func max(_ columns: String...) -> EmbeddingConfigGroupBy {
            var builder = self
            builder.spec.maximum.append(contentsOf: columns)
            return builder
        }

        public func build() -> Aggregate { spec }
    }

    /// A `WHERE` for LlmConfig. Unset filters are left out.
    public struct LlmConfigWhere: WhereBuilder {
        private var operators: Where = [:]
        public var id: StringFilter?
        public var provider: StringFilter?
        public var apiKey: StringFilter?
        public var model: StringFilter?
        public var endpoint: StringFilter?
        public var isActive: BoolFilter?
        public var createdAt: DateFilter?
        public var updatedAt: DateFilter?

        /// Creates a filter with every column unset; assign the ones you want to match.
        public init() {}

        public func and(_ clauses: LlmConfigWhere...) -> LlmConfigWhere {
            var filter = self
            filter.operators["AND"] = clauses.map { $0.build() }
            return filter
        }

        public func or(_ clauses: LlmConfigWhere...) -> LlmConfigWhere {
            var filter = self
            filter.operators["OR"] = clauses.map { $0.build() }
            return filter
        }

        public func not(_ clause: LlmConfigWhere) -> LlmConfigWhere {
            var filter = self
            filter.operators["NOT"] = [clause.build()]
            return filter
        }

        /// The filter tree as the runtime reads it.
        ///
        /// Column conditions are read from the properties here rather than written into
        /// `operators` as they are assigned, because a condition dropped on the way in is not
        /// an error — it is a filter that quietly matches every row.
        public func build() -> Where {
            var filter = operators
            if let id = id { filter["id"] = id.build() }
            if let provider = provider { filter["provider"] = provider.build() }
            if let apiKey = apiKey { filter["apiKey"] = apiKey.build() }
            if let model = model { filter["model"] = model.build() }
            if let endpoint = endpoint { filter["endpoint"] = endpoint.build() }
            if let isActive = isActive { filter["isActive"] = isActive.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            if let updatedAt = updatedAt { filter["updatedAt"] = updatedAt.build() }
            return filter
        }
    }

    /// An `ORDER BY` for LlmConfig.
    public struct LlmConfigOrderBy {
        private var entries: [[String: String]] = []

        public init() {}

        /// Orders by the columns, ascending.
        public func asc(_ columns: String...) -> LlmConfigOrderBy {
            var order = self
            for column in columns { order.entries.append([column: "asc"]) }
            return order
        }

        /// Orders by the column, descending.
        public func desc(_ column: String) -> LlmConfigOrderBy {
            var order = self
            order.entries.append([column: "desc"])
            return order
        }

        /// The sort as the runtime reads it.
        public func build() -> [[String: String]] { entries }
    }

    /// Count aggregate filter for LlmConfig.groupBy() HAVING clauses.
    public struct LlmConfigCountAggregateFilter {
        public var _all: NumberFilter?
        public var id: NumberFilter?
        public var provider: NumberFilter?
        public var apiKey: NumberFilter?
        public var model: NumberFilter?
        public var endpoint: NumberFilter?
        public var isActive: NumberFilter?
        public var createdAt: NumberFilter?
        public var updatedAt: NumberFilter?

        public init() {}

        public func build() -> Where {
            var filter: Where = [:]
            if let _all = _all { filter["_all"] = _all.build() }
            if let id = id { filter["id"] = id.build() }
            if let provider = provider { filter["provider"] = provider.build() }
            if let apiKey = apiKey { filter["apiKey"] = apiKey.build() }
            if let model = model { filter["model"] = model.build() }
            if let endpoint = endpoint { filter["endpoint"] = endpoint.build() }
            if let isActive = isActive { filter["isActive"] = isActive.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            if let updatedAt = updatedAt { filter["updatedAt"] = updatedAt.build() }
            return filter
        }
    }

    /// Numeric aggregate filter (sum/avg) for LlmConfig.groupBy() HAVING clauses.
    public struct LlmConfigNumericAggregateFilter {


        public init() {}

        public func build() -> Where {
            return [:]
        }
    }

    /// Scalar aggregate filter (min/max) for LlmConfig.groupBy() HAVING clauses.
    public struct LlmConfigScalarAggregateFilter {
        public var id: StringFilter?
        public var provider: StringFilter?
        public var apiKey: StringFilter?
        public var model: StringFilter?
        public var endpoint: StringFilter?
        public var isActive: BoolFilter?
        public var createdAt: DateFilter?
        public var updatedAt: DateFilter?

        public init() {}

        public func build() -> Where {
            var filter: Where = [:]
            if let id = id { filter["id"] = id.build() }
            if let provider = provider { filter["provider"] = provider.build() }
            if let apiKey = apiKey { filter["apiKey"] = apiKey.build() }
            if let model = model { filter["model"] = model.build() }
            if let endpoint = endpoint { filter["endpoint"] = endpoint.build() }
            if let isActive = isActive { filter["isActive"] = isActive.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            if let updatedAt = updatedAt { filter["updatedAt"] = updatedAt.build() }
            return filter
        }
    }

    /// A `HAVING` builder for LlmConfig.groupBy() queries.
    public struct LlmConfigAggregateHaving: HavingBuilder {
        private var operators: Where = [:]
        public var _count: LlmConfigCountAggregateFilter?
        public var _sum: LlmConfigNumericAggregateFilter?
        public var _avg: LlmConfigNumericAggregateFilter?
        public var _min: LlmConfigScalarAggregateFilter?
        public var _max: LlmConfigScalarAggregateFilter?
        public var id: StringFilter?
        public var provider: StringFilter?
        public var apiKey: StringFilter?
        public var model: StringFilter?
        public var endpoint: StringFilter?
        public var isActive: BoolFilter?
        public var createdAt: DateFilter?
        public var updatedAt: DateFilter?

        public init() {}

        public func and(_ clauses: LlmConfigAggregateHaving...) -> LlmConfigAggregateHaving {
            var filter = self
            filter.operators["AND"] = clauses.map { $0.build() }
            return filter
        }

        public func or(_ clauses: LlmConfigAggregateHaving...) -> LlmConfigAggregateHaving {
            var filter = self
            filter.operators["OR"] = clauses.map { $0.build() }
            return filter
        }

        public func not(_ clause: LlmConfigAggregateHaving) -> LlmConfigAggregateHaving {
            var filter = self
            filter.operators["NOT"] = [clause.build()]
            return filter
        }

        public func build() -> Where {
            var filter = operators
            if let _count = _count { filter["_count"] = _count.build() }
            if let _sum = _sum { filter["_sum"] = _sum.build() }
            if let _avg = _avg { filter["_avg"] = _avg.build() }
            if let _min = _min { filter["_min"] = _min.build() }
            if let _max = _max { filter["_max"] = _max.build() }
            if let id = id { filter["id"] = id.build() }
            if let provider = provider { filter["provider"] = provider.build() }
            if let apiKey = apiKey { filter["apiKey"] = apiKey.build() }
            if let model = model { filter["model"] = model.build() }
            if let endpoint = endpoint { filter["endpoint"] = endpoint.build() }
            if let isActive = isActive { filter["isActive"] = isActive.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            if let updatedAt = updatedAt { filter["updatedAt"] = updatedAt.build() }
            return filter
        }
    }

    /// Type-safe `groupBy` builder for LlmConfig.
    public struct LlmConfigGroupBy: GroupByBuilder {
        private var spec = Aggregate()

        public init() {}

        public func by(_ columns: String...) -> LlmConfigGroupBy {
            var builder = self
            builder.spec.by.append(contentsOf: columns)
            return builder
        }

        public func `where`(_ filter: LlmConfigWhere) -> LlmConfigGroupBy {
            var builder = self
            builder.spec.filter = filter.build()
            return builder
        }

        public func `where`(_ filter: Where) -> LlmConfigGroupBy {
            var builder = self
            builder.spec.filter = filter
            return builder
        }

        public func having(_ filter: LlmConfigAggregateHaving) -> LlmConfigGroupBy {
            var builder = self
            builder.spec.having = filter.build()
            return builder
        }

        public func having(_ filter: Where) -> LlmConfigGroupBy {
            var builder = self
            builder.spec.having = filter
            return builder
        }

        public func orderBy(_ order: LlmConfigOrderBy) -> LlmConfigGroupBy {
            var builder = self
            builder.spec.orderBy = order.build()
            return builder
        }

        public func orderBy(_ entries: [[String: String]]) -> LlmConfigGroupBy {
            var builder = self
            builder.spec.orderBy = entries
            return builder
        }

        public func skip(_ value: Int) -> LlmConfigGroupBy {
            var builder = self
            builder.spec.skip = Swift.max(0, value)
            return builder
        }

        public func take(_ value: Int?) -> LlmConfigGroupBy {
            var builder = self
            builder.spec.take = value
            return builder
        }

        public func count() -> LlmConfigGroupBy {
            var builder = self
            builder.spec.count = true
            return builder
        }

        public func count(_ columns: String...) -> LlmConfigGroupBy {
            var builder = self
            for column in columns {
                if column == "_all" {
                    builder.spec.count = true
                }
                if !builder.spec.countFields.contains(column) {
                    builder.spec.countFields.append(column)
                }
            }
            return builder
        }

        public func sum(_ columns: String...) -> LlmConfigGroupBy {
            var builder = self
            builder.spec.sum.append(contentsOf: columns)
            return builder
        }

        public func average(_ columns: String...) -> LlmConfigGroupBy {
            var builder = self
            builder.spec.average.append(contentsOf: columns)
            return builder
        }

        public func min(_ columns: String...) -> LlmConfigGroupBy {
            var builder = self
            builder.spec.minimum.append(contentsOf: columns)
            return builder
        }

        public func max(_ columns: String...) -> LlmConfigGroupBy {
            var builder = self
            builder.spec.maximum.append(contentsOf: columns)
            return builder
        }

        public func build() -> Aggregate { spec }
    }

    /// A `WHERE` for User. Unset filters are left out.
    public struct UserWhere: WhereBuilder {
        private var operators: Where = [:]
        public var id: StringFilter?
        public var email: StringFilter?
        public var name: StringFilter?
        public var createdAt: DateFilter?

        /// Creates a filter with every column unset; assign the ones you want to match.
        public init() {}

        public func and(_ clauses: UserWhere...) -> UserWhere {
            var filter = self
            filter.operators["AND"] = clauses.map { $0.build() }
            return filter
        }

        public func or(_ clauses: UserWhere...) -> UserWhere {
            var filter = self
            filter.operators["OR"] = clauses.map { $0.build() }
            return filter
        }

        public func not(_ clause: UserWhere) -> UserWhere {
            var filter = self
            filter.operators["NOT"] = [clause.build()]
            return filter
        }

        /// The filter tree as the runtime reads it.
        ///
        /// Column conditions are read from the properties here rather than written into
        /// `operators` as they are assigned, because a condition dropped on the way in is not
        /// an error — it is a filter that quietly matches every row.
        public func build() -> Where {
            var filter = operators
            if let id = id { filter["id"] = id.build() }
            if let email = email { filter["email"] = email.build() }
            if let name = name { filter["name"] = name.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            return filter
        }
    }

    /// An `ORDER BY` for User.
    public struct UserOrderBy {
        private var entries: [[String: String]] = []

        public init() {}

        /// Orders by the columns, ascending.
        public func asc(_ columns: String...) -> UserOrderBy {
            var order = self
            for column in columns { order.entries.append([column: "asc"]) }
            return order
        }

        /// Orders by the column, descending.
        public func desc(_ column: String) -> UserOrderBy {
            var order = self
            order.entries.append([column: "desc"])
            return order
        }

        /// The sort as the runtime reads it.
        public func build() -> [[String: String]] { entries }
    }

    /// Count aggregate filter for User.groupBy() HAVING clauses.
    public struct UserCountAggregateFilter {
        public var _all: NumberFilter?
        public var id: NumberFilter?
        public var email: NumberFilter?
        public var name: NumberFilter?
        public var createdAt: NumberFilter?

        public init() {}

        public func build() -> Where {
            var filter: Where = [:]
            if let _all = _all { filter["_all"] = _all.build() }
            if let id = id { filter["id"] = id.build() }
            if let email = email { filter["email"] = email.build() }
            if let name = name { filter["name"] = name.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            return filter
        }
    }

    /// Numeric aggregate filter (sum/avg) for User.groupBy() HAVING clauses.
    public struct UserNumericAggregateFilter {


        public init() {}

        public func build() -> Where {
            return [:]
        }
    }

    /// Scalar aggregate filter (min/max) for User.groupBy() HAVING clauses.
    public struct UserScalarAggregateFilter {
        public var id: StringFilter?
        public var email: StringFilter?
        public var name: StringFilter?
        public var createdAt: DateFilter?

        public init() {}

        public func build() -> Where {
            var filter: Where = [:]
            if let id = id { filter["id"] = id.build() }
            if let email = email { filter["email"] = email.build() }
            if let name = name { filter["name"] = name.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            return filter
        }
    }

    /// A `HAVING` builder for User.groupBy() queries.
    public struct UserAggregateHaving: HavingBuilder {
        private var operators: Where = [:]
        public var _count: UserCountAggregateFilter?
        public var _sum: UserNumericAggregateFilter?
        public var _avg: UserNumericAggregateFilter?
        public var _min: UserScalarAggregateFilter?
        public var _max: UserScalarAggregateFilter?
        public var id: StringFilter?
        public var email: StringFilter?
        public var name: StringFilter?
        public var createdAt: DateFilter?

        public init() {}

        public func and(_ clauses: UserAggregateHaving...) -> UserAggregateHaving {
            var filter = self
            filter.operators["AND"] = clauses.map { $0.build() }
            return filter
        }

        public func or(_ clauses: UserAggregateHaving...) -> UserAggregateHaving {
            var filter = self
            filter.operators["OR"] = clauses.map { $0.build() }
            return filter
        }

        public func not(_ clause: UserAggregateHaving) -> UserAggregateHaving {
            var filter = self
            filter.operators["NOT"] = [clause.build()]
            return filter
        }

        public func build() -> Where {
            var filter = operators
            if let _count = _count { filter["_count"] = _count.build() }
            if let _sum = _sum { filter["_sum"] = _sum.build() }
            if let _avg = _avg { filter["_avg"] = _avg.build() }
            if let _min = _min { filter["_min"] = _min.build() }
            if let _max = _max { filter["_max"] = _max.build() }
            if let id = id { filter["id"] = id.build() }
            if let email = email { filter["email"] = email.build() }
            if let name = name { filter["name"] = name.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            return filter
        }
    }

    /// Type-safe `groupBy` builder for User.
    public struct UserGroupBy: GroupByBuilder {
        private var spec = Aggregate()

        public init() {}

        public func by(_ columns: String...) -> UserGroupBy {
            var builder = self
            builder.spec.by.append(contentsOf: columns)
            return builder
        }

        public func `where`(_ filter: UserWhere) -> UserGroupBy {
            var builder = self
            builder.spec.filter = filter.build()
            return builder
        }

        public func `where`(_ filter: Where) -> UserGroupBy {
            var builder = self
            builder.spec.filter = filter
            return builder
        }

        public func having(_ filter: UserAggregateHaving) -> UserGroupBy {
            var builder = self
            builder.spec.having = filter.build()
            return builder
        }

        public func having(_ filter: Where) -> UserGroupBy {
            var builder = self
            builder.spec.having = filter
            return builder
        }

        public func orderBy(_ order: UserOrderBy) -> UserGroupBy {
            var builder = self
            builder.spec.orderBy = order.build()
            return builder
        }

        public func orderBy(_ entries: [[String: String]]) -> UserGroupBy {
            var builder = self
            builder.spec.orderBy = entries
            return builder
        }

        public func skip(_ value: Int) -> UserGroupBy {
            var builder = self
            builder.spec.skip = Swift.max(0, value)
            return builder
        }

        public func take(_ value: Int?) -> UserGroupBy {
            var builder = self
            builder.spec.take = value
            return builder
        }

        public func count() -> UserGroupBy {
            var builder = self
            builder.spec.count = true
            return builder
        }

        public func count(_ columns: String...) -> UserGroupBy {
            var builder = self
            for column in columns {
                if column == "_all" {
                    builder.spec.count = true
                }
                if !builder.spec.countFields.contains(column) {
                    builder.spec.countFields.append(column)
                }
            }
            return builder
        }

        public func sum(_ columns: String...) -> UserGroupBy {
            var builder = self
            builder.spec.sum.append(contentsOf: columns)
            return builder
        }

        public func average(_ columns: String...) -> UserGroupBy {
            var builder = self
            builder.spec.average.append(contentsOf: columns)
            return builder
        }

        public func min(_ columns: String...) -> UserGroupBy {
            var builder = self
            builder.spec.minimum.append(contentsOf: columns)
            return builder
        }

        public func max(_ columns: String...) -> UserGroupBy {
            var builder = self
            builder.spec.maximum.append(contentsOf: columns)
            return builder
        }

        public func build() -> Aggregate { spec }
    }

    /// A `WHERE` for Order. Unset filters are left out.
    public struct OrderWhere: WhereBuilder {
        private var operators: Where = [:]
        public var id: StringFilter?
        public var userId: StringFilter?
        public var total: NumberFilter?
        public var createdAt: DateFilter?

        /// Creates a filter with every column unset; assign the ones you want to match.
        public init() {}

        public func and(_ clauses: OrderWhere...) -> OrderWhere {
            var filter = self
            filter.operators["AND"] = clauses.map { $0.build() }
            return filter
        }

        public func or(_ clauses: OrderWhere...) -> OrderWhere {
            var filter = self
            filter.operators["OR"] = clauses.map { $0.build() }
            return filter
        }

        public func not(_ clause: OrderWhere) -> OrderWhere {
            var filter = self
            filter.operators["NOT"] = [clause.build()]
            return filter
        }

        /// The filter tree as the runtime reads it.
        ///
        /// Column conditions are read from the properties here rather than written into
        /// `operators` as they are assigned, because a condition dropped on the way in is not
        /// an error — it is a filter that quietly matches every row.
        public func build() -> Where {
            var filter = operators
            if let id = id { filter["id"] = id.build() }
            if let userId = userId { filter["userId"] = userId.build() }
            if let total = total { filter["total"] = total.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            return filter
        }
    }

    /// An `ORDER BY` for Order.
    public struct OrderOrderBy {
        private var entries: [[String: String]] = []

        public init() {}

        /// Orders by the columns, ascending.
        public func asc(_ columns: String...) -> OrderOrderBy {
            var order = self
            for column in columns { order.entries.append([column: "asc"]) }
            return order
        }

        /// Orders by the column, descending.
        public func desc(_ column: String) -> OrderOrderBy {
            var order = self
            order.entries.append([column: "desc"])
            return order
        }

        /// The sort as the runtime reads it.
        public func build() -> [[String: String]] { entries }
    }

    /// Count aggregate filter for Order.groupBy() HAVING clauses.
    public struct OrderCountAggregateFilter {
        public var _all: NumberFilter?
        public var id: NumberFilter?
        public var userId: NumberFilter?
        public var total: NumberFilter?
        public var createdAt: NumberFilter?

        public init() {}

        public func build() -> Where {
            var filter: Where = [:]
            if let _all = _all { filter["_all"] = _all.build() }
            if let id = id { filter["id"] = id.build() }
            if let userId = userId { filter["userId"] = userId.build() }
            if let total = total { filter["total"] = total.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            return filter
        }
    }

    /// Numeric aggregate filter (sum/avg) for Order.groupBy() HAVING clauses.
    public struct OrderNumericAggregateFilter {
        public var total: NumberFilter?

        public init() {}

        public func build() -> Where {
            var filter: Where = [:]
            if let total = total { filter["total"] = total.build() }
            return filter
        }
    }

    /// Scalar aggregate filter (min/max) for Order.groupBy() HAVING clauses.
    public struct OrderScalarAggregateFilter {
        public var id: StringFilter?
        public var userId: StringFilter?
        public var total: NumberFilter?
        public var createdAt: DateFilter?

        public init() {}

        public func build() -> Where {
            var filter: Where = [:]
            if let id = id { filter["id"] = id.build() }
            if let userId = userId { filter["userId"] = userId.build() }
            if let total = total { filter["total"] = total.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            return filter
        }
    }

    /// A `HAVING` builder for Order.groupBy() queries.
    public struct OrderAggregateHaving: HavingBuilder {
        private var operators: Where = [:]
        public var _count: OrderCountAggregateFilter?
        public var _sum: OrderNumericAggregateFilter?
        public var _avg: OrderNumericAggregateFilter?
        public var _min: OrderScalarAggregateFilter?
        public var _max: OrderScalarAggregateFilter?
        public var id: StringFilter?
        public var userId: StringFilter?
        public var total: NumberFilter?
        public var createdAt: DateFilter?

        public init() {}

        public func and(_ clauses: OrderAggregateHaving...) -> OrderAggregateHaving {
            var filter = self
            filter.operators["AND"] = clauses.map { $0.build() }
            return filter
        }

        public func or(_ clauses: OrderAggregateHaving...) -> OrderAggregateHaving {
            var filter = self
            filter.operators["OR"] = clauses.map { $0.build() }
            return filter
        }

        public func not(_ clause: OrderAggregateHaving) -> OrderAggregateHaving {
            var filter = self
            filter.operators["NOT"] = [clause.build()]
            return filter
        }

        public func build() -> Where {
            var filter = operators
            if let _count = _count { filter["_count"] = _count.build() }
            if let _sum = _sum { filter["_sum"] = _sum.build() }
            if let _avg = _avg { filter["_avg"] = _avg.build() }
            if let _min = _min { filter["_min"] = _min.build() }
            if let _max = _max { filter["_max"] = _max.build() }
            if let id = id { filter["id"] = id.build() }
            if let userId = userId { filter["userId"] = userId.build() }
            if let total = total { filter["total"] = total.build() }
            if let createdAt = createdAt { filter["createdAt"] = createdAt.build() }
            return filter
        }
    }

    /// Type-safe `groupBy` builder for Order.
    public struct OrderGroupBy: GroupByBuilder {
        private var spec = Aggregate()

        public init() {}

        public func by(_ columns: String...) -> OrderGroupBy {
            var builder = self
            builder.spec.by.append(contentsOf: columns)
            return builder
        }

        public func `where`(_ filter: OrderWhere) -> OrderGroupBy {
            var builder = self
            builder.spec.filter = filter.build()
            return builder
        }

        public func `where`(_ filter: Where) -> OrderGroupBy {
            var builder = self
            builder.spec.filter = filter
            return builder
        }

        public func having(_ filter: OrderAggregateHaving) -> OrderGroupBy {
            var builder = self
            builder.spec.having = filter.build()
            return builder
        }

        public func having(_ filter: Where) -> OrderGroupBy {
            var builder = self
            builder.spec.having = filter
            return builder
        }

        public func orderBy(_ order: OrderOrderBy) -> OrderGroupBy {
            var builder = self
            builder.spec.orderBy = order.build()
            return builder
        }

        public func orderBy(_ entries: [[String: String]]) -> OrderGroupBy {
            var builder = self
            builder.spec.orderBy = entries
            return builder
        }

        public func skip(_ value: Int) -> OrderGroupBy {
            var builder = self
            builder.spec.skip = Swift.max(0, value)
            return builder
        }

        public func take(_ value: Int?) -> OrderGroupBy {
            var builder = self
            builder.spec.take = value
            return builder
        }

        public func count() -> OrderGroupBy {
            var builder = self
            builder.spec.count = true
            return builder
        }

        public func count(_ columns: String...) -> OrderGroupBy {
            var builder = self
            for column in columns {
                if column == "_all" {
                    builder.spec.count = true
                }
                if !builder.spec.countFields.contains(column) {
                    builder.spec.countFields.append(column)
                }
            }
            return builder
        }

        public func sum(_ columns: String...) -> OrderGroupBy {
            var builder = self
            builder.spec.sum.append(contentsOf: columns)
            return builder
        }

        public func average(_ columns: String...) -> OrderGroupBy {
            var builder = self
            builder.spec.average.append(contentsOf: columns)
            return builder
        }

        public func min(_ columns: String...) -> OrderGroupBy {
            var builder = self
            builder.spec.minimum.append(contentsOf: columns)
            return builder
        }

        public func max(_ columns: String...) -> OrderGroupBy {
            var builder = self
            builder.spec.maximum.append(contentsOf: columns)
            return builder
        }

        public func build() -> Aggregate { spec }
    }
}
