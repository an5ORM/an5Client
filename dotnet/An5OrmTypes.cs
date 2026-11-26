// This file is auto-generated. Do not edit directly.
using System;
using System.Collections.Generic;

namespace An5Orm
{
    // ── Base Filter Types ──────────────────────────────────────────────────────

    /// <summary>Type-safe filter for string fields.</summary>
    public class StringFilter
    {
        public new string Equals { get; set; }
        public string Not { get; set; }
        public List<string> In { get; set; }
        public List<string> NotIn { get; set; }
        public string Contains { get; set; }
        public string StartsWith { get; set; }
        public string EndsWith { get; set; }
        public string Gt { get; set; }
        public string Gte { get; set; }
        public string Lt { get; set; }
        public string Lte { get; set; }
        public string Mode { get; set; } // "default" | "insensitive"
    }

    /// <summary>Type-safe filter for integer fields.</summary>
    public class IntFilter
    {
        public new int? Equals { get; set; }
        public int? Not { get; set; }
        public List<int> In { get; set; }
        public List<int> NotIn { get; set; }
        public int? Gt { get; set; }
        public int? Gte { get; set; }
        public int? Lt { get; set; }
        public int? Lte { get; set; }
    }

    /// <summary>Type-safe filter for numeric/float fields.</summary>
    public class NumberFilter
    {
        public new double? Equals { get; set; }
        public double? Not { get; set; }
        public List<double> In { get; set; }
        public List<double> NotIn { get; set; }
        public double? Gt { get; set; }
        public double? Gte { get; set; }
        public double? Lt { get; set; }
        public double? Lte { get; set; }
    }

    /// <summary>Type-safe filter for boolean fields.</summary>
    public class BoolFilter
    {
        public new bool? Equals { get; set; }
        public bool? Not { get; set; }
    }

    /// <summary>Type-safe filter for DateTime fields.</summary>
    public class DateTimeFilter
    {
        public new DateTime? Equals { get; set; }
        public DateTime? Not { get; set; }
        public List<DateTime> In { get; set; }
        public List<DateTime> NotIn { get; set; }
        public DateTime? Gt { get; set; }
        public DateTime? Gte { get; set; }
        public DateTime? Lt { get; set; }
        public DateTime? Lte { get; set; }
    }

    internal interface IAn5WhereInput { }

    internal interface IAn5HavingInput { }

    internal interface IAn5QueryArgs { }

    internal interface IAn5GroupByArgs { }

    internal interface IListRelationFilter
    {
        object SomeTarget { get; }
        object NoneTarget { get; }
        object EveryTarget { get; }
    }

    internal interface IRelationFilter
    {
        object IsTarget { get; }
        bool IsNull { get; }
        object IsNotTarget { get; }
        bool IsNotNull { get; }
    }

    /// <summary>Type-safe correlated filter for to-many relations.</summary>
    public class ListRelationFilter<T> : IListRelationFilter
    {
        public T Some { get; set; }
        public T None { get; set; }
        public T Every { get; set; }

        object IListRelationFilter.SomeTarget => Some;
        object IListRelationFilter.NoneTarget => None;
        object IListRelationFilter.EveryTarget => Every;
    }

    /// <summary>Type-safe correlated filter for to-one relations.</summary>
    public class RelationFilter<T> : IRelationFilter
    {
        public T Is { get; set; }
        public bool IsNull { get; set; }
        public T IsNot { get; set; }
        public bool IsNotNull { get; set; }

        object IRelationFilter.IsTarget => Is;
        bool IRelationFilter.IsNull => IsNull;
        object IRelationFilter.IsNotTarget => IsNot;
        bool IRelationFilter.IsNotNull => IsNotNull;
    }

    // ── EmbeddingConfig ORM Types ──────────────────────────────────────────────────────

    /// <summary>Type-safe WHERE filter for EmbeddingConfig queries.</summary>
    public class EmbeddingConfigWhereInput : IAn5WhereInput
    {
        public List<EmbeddingConfigWhereInput> AND { get; set; }
        public List<EmbeddingConfigWhereInput> OR { get; set; }
        public EmbeddingConfigWhereInput NOT { get; set; }
        public StringFilter Id { get; set; }
        public StringFilter Provider { get; set; }
        public StringFilter ApiKey { get; set; }
        public StringFilter Model { get; set; }
        public StringFilter Endpoint { get; set; }
        public BoolFilter IsActive { get; set; }
        public DateTimeFilter CreatedAt { get; set; }
        public DateTimeFilter UpdatedAt { get; set; }
    }

    /// <summary>Type-safe ORDER BY for EmbeddingConfig queries.</summary>
    public class EmbeddingConfigOrderByInput
    {
        public string Id { get; set; } // "asc" or "desc"
        public string Provider { get; set; } // "asc" or "desc"
        public string ApiKey { get; set; } // "asc" or "desc"
        public string Model { get; set; } // "asc" or "desc"
        public string Endpoint { get; set; } // "asc" or "desc"
        public string IsActive { get; set; } // "asc" or "desc"
        public string CreatedAt { get; set; } // "asc" or "desc"
        public string UpdatedAt { get; set; } // "asc" or "desc"
    }

    /// <summary>Typed data for creating a new EmbeddingConfig record.</summary>
    public class EmbeddingConfigCreateInput
    {
        public string Provider { get; set; }
        public string ApiKey { get; set; }
        public string Model { get; set; }
        public string Endpoint { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    /// <summary>Typed data for updating an existing EmbeddingConfig record.</summary>
    public class EmbeddingConfigUpdateInput
    {
        public string Provider { get; set; }
        public string ApiKey { get; set; }
        public string Model { get; set; }
        public string Endpoint { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    /// <summary>ORM-style args for EmbeddingConfig.FindMany().</summary>
    public class EmbeddingConfigFindManyArgs : IAn5QueryArgs
    {
        public EmbeddingConfigWhereInput Where { get; set; }
        public EmbeddingConfigOrderByInput OrderBy { get; set; }
        public int? Take { get; set; }
        public int? Skip { get; set; }
        public List<string> Select { get; set; }
    }

    /// <summary>ORM-style args for EmbeddingConfig.FindFirst().</summary>
    public class EmbeddingConfigFindFirstArgs : IAn5QueryArgs
    {
        public EmbeddingConfigWhereInput Where { get; set; }
        public EmbeddingConfigOrderByInput OrderBy { get; set; }
        public List<string> Select { get; set; }
    }

    /// <summary>ORM-style args for EmbeddingConfig.FindUnique().</summary>
    public class EmbeddingConfigFindUniqueArgs : IAn5QueryArgs
    {
        public EmbeddingConfigWhereInput Where { get; set; }
    }

    /// <summary>ORM-style args for EmbeddingConfig.DeleteMany().</summary>
    public class EmbeddingConfigDeleteManyArgs : IAn5QueryArgs
    {
        public EmbeddingConfigWhereInput Where { get; set; }
    }

    /// <summary>ORM-style args for EmbeddingConfig.Count().</summary>
    public class EmbeddingConfigCountArgs : IAn5QueryArgs
    {
        public EmbeddingConfigWhereInput Where { get; set; }
    }

    /// <summary>Count aggregate filters for EmbeddingConfig.GroupBy() HAVING clauses.</summary>
    public class EmbeddingConfigCountAggregateFilter
    {
        public IntFilter _all { get; set; }
        public IntFilter Id { get; set; }
        public IntFilter Provider { get; set; }
        public IntFilter ApiKey { get; set; }
        public IntFilter Model { get; set; }
        public IntFilter Endpoint { get; set; }
        public IntFilter IsActive { get; set; }
        public IntFilter CreatedAt { get; set; }
        public IntFilter UpdatedAt { get; set; }
    }

    /// <summary>Numeric aggregate filters (sum/avg) for EmbeddingConfig.GroupBy() HAVING clauses.</summary>
    public class EmbeddingConfigNumericAggregateFilter
    {
    }

    /// <summary>Scalar aggregate filters (min/max) for EmbeddingConfig.GroupBy() HAVING clauses.</summary>
    public class EmbeddingConfigScalarAggregateFilter
    {
        public StringFilter Id { get; set; }
        public StringFilter Provider { get; set; }
        public StringFilter ApiKey { get; set; }
        public StringFilter Model { get; set; }
        public StringFilter Endpoint { get; set; }
        public BoolFilter IsActive { get; set; }
        public DateTimeFilter CreatedAt { get; set; }
        public DateTimeFilter UpdatedAt { get; set; }
    }

    /// <summary>Type-safe HAVING filter for EmbeddingConfig.GroupBy() queries.</summary>
    public class EmbeddingConfigAggregateHavingInput : IAn5HavingInput
    {
        public List<EmbeddingConfigAggregateHavingInput> AND { get; set; }
        public List<EmbeddingConfigAggregateHavingInput> OR { get; set; }
        public EmbeddingConfigAggregateHavingInput NOT { get; set; }
        public EmbeddingConfigCountAggregateFilter _count { get; set; }
        public EmbeddingConfigNumericAggregateFilter _sum { get; set; }
        public EmbeddingConfigNumericAggregateFilter _avg { get; set; }
        public EmbeddingConfigScalarAggregateFilter _min { get; set; }
        public EmbeddingConfigScalarAggregateFilter _max { get; set; }
        public StringFilter Id { get; set; }
        public StringFilter Provider { get; set; }
        public StringFilter ApiKey { get; set; }
        public StringFilter Model { get; set; }
        public StringFilter Endpoint { get; set; }
        public BoolFilter IsActive { get; set; }
        public DateTimeFilter CreatedAt { get; set; }
        public DateTimeFilter UpdatedAt { get; set; }
    }

    /// <summary>ORM-style args for EmbeddingConfig.GroupBy().</summary>
    public class EmbeddingConfigGroupByArgs : IAn5GroupByArgs
    {
        public List<string> By { get; set; }
        public EmbeddingConfigWhereInput Where { get; set; }
        public EmbeddingConfigAggregateHavingInput Having { get; set; }
        public EmbeddingConfigOrderByInput OrderBy { get; set; }
        public int? Skip { get; set; }
        public int? Take { get; set; }
        public object Count { get; set; }
        public List<string> Sum { get; set; }
        public List<string> Avg { get; set; }
        public List<string> Min { get; set; }
        public List<string> Max { get; set; }
    }

    // ── LlmConfig ORM Types ──────────────────────────────────────────────────────

    /// <summary>Type-safe WHERE filter for LlmConfig queries.</summary>
    public class LlmConfigWhereInput : IAn5WhereInput
    {
        public List<LlmConfigWhereInput> AND { get; set; }
        public List<LlmConfigWhereInput> OR { get; set; }
        public LlmConfigWhereInput NOT { get; set; }
        public StringFilter Id { get; set; }
        public StringFilter Provider { get; set; }
        public StringFilter ApiKey { get; set; }
        public StringFilter Model { get; set; }
        public StringFilter Endpoint { get; set; }
        public BoolFilter IsActive { get; set; }
        public DateTimeFilter CreatedAt { get; set; }
        public DateTimeFilter UpdatedAt { get; set; }
    }

    /// <summary>Type-safe ORDER BY for LlmConfig queries.</summary>
    public class LlmConfigOrderByInput
    {
        public string Id { get; set; } // "asc" or "desc"
        public string Provider { get; set; } // "asc" or "desc"
        public string ApiKey { get; set; } // "asc" or "desc"
        public string Model { get; set; } // "asc" or "desc"
        public string Endpoint { get; set; } // "asc" or "desc"
        public string IsActive { get; set; } // "asc" or "desc"
        public string CreatedAt { get; set; } // "asc" or "desc"
        public string UpdatedAt { get; set; } // "asc" or "desc"
    }

    /// <summary>Typed data for creating a new LlmConfig record.</summary>
    public class LlmConfigCreateInput
    {
        public string Provider { get; set; }
        public string ApiKey { get; set; }
        public string Model { get; set; }
        public string Endpoint { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    /// <summary>Typed data for updating an existing LlmConfig record.</summary>
    public class LlmConfigUpdateInput
    {
        public string Provider { get; set; }
        public string ApiKey { get; set; }
        public string Model { get; set; }
        public string Endpoint { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    /// <summary>ORM-style args for LlmConfig.FindMany().</summary>
    public class LlmConfigFindManyArgs : IAn5QueryArgs
    {
        public LlmConfigWhereInput Where { get; set; }
        public LlmConfigOrderByInput OrderBy { get; set; }
        public int? Take { get; set; }
        public int? Skip { get; set; }
        public List<string> Select { get; set; }
    }

    /// <summary>ORM-style args for LlmConfig.FindFirst().</summary>
    public class LlmConfigFindFirstArgs : IAn5QueryArgs
    {
        public LlmConfigWhereInput Where { get; set; }
        public LlmConfigOrderByInput OrderBy { get; set; }
        public List<string> Select { get; set; }
    }

    /// <summary>ORM-style args for LlmConfig.FindUnique().</summary>
    public class LlmConfigFindUniqueArgs : IAn5QueryArgs
    {
        public LlmConfigWhereInput Where { get; set; }
    }

    /// <summary>ORM-style args for LlmConfig.DeleteMany().</summary>
    public class LlmConfigDeleteManyArgs : IAn5QueryArgs
    {
        public LlmConfigWhereInput Where { get; set; }
    }

    /// <summary>ORM-style args for LlmConfig.Count().</summary>
    public class LlmConfigCountArgs : IAn5QueryArgs
    {
        public LlmConfigWhereInput Where { get; set; }
    }

    /// <summary>Count aggregate filters for LlmConfig.GroupBy() HAVING clauses.</summary>
    public class LlmConfigCountAggregateFilter
    {
        public IntFilter _all { get; set; }
        public IntFilter Id { get; set; }
        public IntFilter Provider { get; set; }
        public IntFilter ApiKey { get; set; }
        public IntFilter Model { get; set; }
        public IntFilter Endpoint { get; set; }
        public IntFilter IsActive { get; set; }
        public IntFilter CreatedAt { get; set; }
        public IntFilter UpdatedAt { get; set; }
    }

    /// <summary>Numeric aggregate filters (sum/avg) for LlmConfig.GroupBy() HAVING clauses.</summary>
    public class LlmConfigNumericAggregateFilter
    {
    }

    /// <summary>Scalar aggregate filters (min/max) for LlmConfig.GroupBy() HAVING clauses.</summary>
    public class LlmConfigScalarAggregateFilter
    {
        public StringFilter Id { get; set; }
        public StringFilter Provider { get; set; }
        public StringFilter ApiKey { get; set; }
        public StringFilter Model { get; set; }
        public StringFilter Endpoint { get; set; }
        public BoolFilter IsActive { get; set; }
        public DateTimeFilter CreatedAt { get; set; }
        public DateTimeFilter UpdatedAt { get; set; }
    }

    /// <summary>Type-safe HAVING filter for LlmConfig.GroupBy() queries.</summary>
    public class LlmConfigAggregateHavingInput : IAn5HavingInput
    {
        public List<LlmConfigAggregateHavingInput> AND { get; set; }
        public List<LlmConfigAggregateHavingInput> OR { get; set; }
        public LlmConfigAggregateHavingInput NOT { get; set; }
        public LlmConfigCountAggregateFilter _count { get; set; }
        public LlmConfigNumericAggregateFilter _sum { get; set; }
        public LlmConfigNumericAggregateFilter _avg { get; set; }
        public LlmConfigScalarAggregateFilter _min { get; set; }
        public LlmConfigScalarAggregateFilter _max { get; set; }
        public StringFilter Id { get; set; }
        public StringFilter Provider { get; set; }
        public StringFilter ApiKey { get; set; }
        public StringFilter Model { get; set; }
        public StringFilter Endpoint { get; set; }
        public BoolFilter IsActive { get; set; }
        public DateTimeFilter CreatedAt { get; set; }
        public DateTimeFilter UpdatedAt { get; set; }
    }

    /// <summary>ORM-style args for LlmConfig.GroupBy().</summary>
    public class LlmConfigGroupByArgs : IAn5GroupByArgs
    {
        public List<string> By { get; set; }
        public LlmConfigWhereInput Where { get; set; }
        public LlmConfigAggregateHavingInput Having { get; set; }
        public LlmConfigOrderByInput OrderBy { get; set; }
        public int? Skip { get; set; }
        public int? Take { get; set; }
        public object Count { get; set; }
        public List<string> Sum { get; set; }
        public List<string> Avg { get; set; }
        public List<string> Min { get; set; }
        public List<string> Max { get; set; }
    }

    // ── User ORM Types ──────────────────────────────────────────────────────

    /// <summary>Type-safe WHERE filter for User queries.</summary>
    public class UserWhereInput : IAn5WhereInput
    {
        public List<UserWhereInput> AND { get; set; }
        public List<UserWhereInput> OR { get; set; }
        public UserWhereInput NOT { get; set; }
        public StringFilter Id { get; set; }
        public StringFilter Email { get; set; }
        public StringFilter Name { get; set; }
        public DateTimeFilter CreatedAt { get; set; }
    }

    /// <summary>Type-safe ORDER BY for User queries.</summary>
    public class UserOrderByInput
    {
        public string Id { get; set; } // "asc" or "desc"
        public string Email { get; set; } // "asc" or "desc"
        public string Name { get; set; } // "asc" or "desc"
        public string CreatedAt { get; set; } // "asc" or "desc"
    }

    /// <summary>Typed data for creating a new User record.</summary>
    public class UserCreateInput
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public DateTime? CreatedAt { get; set; }
    }

    /// <summary>Typed data for updating an existing User record.</summary>
    public class UserUpdateInput
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public DateTime? CreatedAt { get; set; }
    }

    /// <summary>ORM-style args for User.FindMany().</summary>
    public class UserFindManyArgs : IAn5QueryArgs
    {
        public UserWhereInput Where { get; set; }
        public UserOrderByInput OrderBy { get; set; }
        public int? Take { get; set; }
        public int? Skip { get; set; }
        public List<string> Select { get; set; }
    }

    /// <summary>ORM-style args for User.FindFirst().</summary>
    public class UserFindFirstArgs : IAn5QueryArgs
    {
        public UserWhereInput Where { get; set; }
        public UserOrderByInput OrderBy { get; set; }
        public List<string> Select { get; set; }
    }

    /// <summary>ORM-style args for User.FindUnique().</summary>
    public class UserFindUniqueArgs : IAn5QueryArgs
    {
        public UserWhereInput Where { get; set; }
    }

    /// <summary>ORM-style args for User.DeleteMany().</summary>
    public class UserDeleteManyArgs : IAn5QueryArgs
    {
        public UserWhereInput Where { get; set; }
    }

    /// <summary>ORM-style args for User.Count().</summary>
    public class UserCountArgs : IAn5QueryArgs
    {
        public UserWhereInput Where { get; set; }
    }

    /// <summary>Count aggregate filters for User.GroupBy() HAVING clauses.</summary>
    public class UserCountAggregateFilter
    {
        public IntFilter _all { get; set; }
        public IntFilter Id { get; set; }
        public IntFilter Email { get; set; }
        public IntFilter Name { get; set; }
        public IntFilter CreatedAt { get; set; }
    }

    /// <summary>Numeric aggregate filters (sum/avg) for User.GroupBy() HAVING clauses.</summary>
    public class UserNumericAggregateFilter
    {
    }

    /// <summary>Scalar aggregate filters (min/max) for User.GroupBy() HAVING clauses.</summary>
    public class UserScalarAggregateFilter
    {
        public StringFilter Id { get; set; }
        public StringFilter Email { get; set; }
        public StringFilter Name { get; set; }
        public DateTimeFilter CreatedAt { get; set; }
    }

    /// <summary>Type-safe HAVING filter for User.GroupBy() queries.</summary>
    public class UserAggregateHavingInput : IAn5HavingInput
    {
        public List<UserAggregateHavingInput> AND { get; set; }
        public List<UserAggregateHavingInput> OR { get; set; }
        public UserAggregateHavingInput NOT { get; set; }
        public UserCountAggregateFilter _count { get; set; }
        public UserNumericAggregateFilter _sum { get; set; }
        public UserNumericAggregateFilter _avg { get; set; }
        public UserScalarAggregateFilter _min { get; set; }
        public UserScalarAggregateFilter _max { get; set; }
        public StringFilter Id { get; set; }
        public StringFilter Email { get; set; }
        public StringFilter Name { get; set; }
        public DateTimeFilter CreatedAt { get; set; }
    }

    /// <summary>ORM-style args for User.GroupBy().</summary>
    public class UserGroupByArgs : IAn5GroupByArgs
    {
        public List<string> By { get; set; }
        public UserWhereInput Where { get; set; }
        public UserAggregateHavingInput Having { get; set; }
        public UserOrderByInput OrderBy { get; set; }
        public int? Skip { get; set; }
        public int? Take { get; set; }
        public object Count { get; set; }
        public List<string> Sum { get; set; }
        public List<string> Avg { get; set; }
        public List<string> Min { get; set; }
        public List<string> Max { get; set; }
    }

    // ── Order ORM Types ──────────────────────────────────────────────────────

    /// <summary>Type-safe WHERE filter for Order queries.</summary>
    public class OrderWhereInput : IAn5WhereInput
    {
        public List<OrderWhereInput> AND { get; set; }
        public List<OrderWhereInput> OR { get; set; }
        public OrderWhereInput NOT { get; set; }
        public StringFilter Id { get; set; }
        public StringFilter UserId { get; set; }
        public IntFilter Total { get; set; }
        public DateTimeFilter CreatedAt { get; set; }
    }

    /// <summary>Type-safe ORDER BY for Order queries.</summary>
    public class OrderOrderByInput
    {
        public string Id { get; set; } // "asc" or "desc"
        public string UserId { get; set; } // "asc" or "desc"
        public string Total { get; set; } // "asc" or "desc"
        public string CreatedAt { get; set; } // "asc" or "desc"
    }

    /// <summary>Typed data for creating a new Order record.</summary>
    public class OrderCreateInput
    {
        public string UserId { get; set; }
        public int? Total { get; set; }
        public DateTime? CreatedAt { get; set; }
    }

    /// <summary>Typed data for updating an existing Order record.</summary>
    public class OrderUpdateInput
    {
        public string UserId { get; set; }
        public int? Total { get; set; }
        public DateTime? CreatedAt { get; set; }
    }

    /// <summary>ORM-style args for Order.FindMany().</summary>
    public class OrderFindManyArgs : IAn5QueryArgs
    {
        public OrderWhereInput Where { get; set; }
        public OrderOrderByInput OrderBy { get; set; }
        public int? Take { get; set; }
        public int? Skip { get; set; }
        public List<string> Select { get; set; }
    }

    /// <summary>ORM-style args for Order.FindFirst().</summary>
    public class OrderFindFirstArgs : IAn5QueryArgs
    {
        public OrderWhereInput Where { get; set; }
        public OrderOrderByInput OrderBy { get; set; }
        public List<string> Select { get; set; }
    }

    /// <summary>ORM-style args for Order.FindUnique().</summary>
    public class OrderFindUniqueArgs : IAn5QueryArgs
    {
        public OrderWhereInput Where { get; set; }
    }

    /// <summary>ORM-style args for Order.DeleteMany().</summary>
    public class OrderDeleteManyArgs : IAn5QueryArgs
    {
        public OrderWhereInput Where { get; set; }
    }

    /// <summary>ORM-style args for Order.Count().</summary>
    public class OrderCountArgs : IAn5QueryArgs
    {
        public OrderWhereInput Where { get; set; }
    }

    /// <summary>Count aggregate filters for Order.GroupBy() HAVING clauses.</summary>
    public class OrderCountAggregateFilter
    {
        public IntFilter _all { get; set; }
        public IntFilter Id { get; set; }
        public IntFilter UserId { get; set; }
        public IntFilter Total { get; set; }
        public IntFilter CreatedAt { get; set; }
    }

    /// <summary>Numeric aggregate filters (sum/avg) for Order.GroupBy() HAVING clauses.</summary>
    public class OrderNumericAggregateFilter
    {
        public NumberFilter Total { get; set; }
    }

    /// <summary>Scalar aggregate filters (min/max) for Order.GroupBy() HAVING clauses.</summary>
    public class OrderScalarAggregateFilter
    {
        public StringFilter Id { get; set; }
        public StringFilter UserId { get; set; }
        public IntFilter Total { get; set; }
        public DateTimeFilter CreatedAt { get; set; }
    }

    /// <summary>Type-safe HAVING filter for Order.GroupBy() queries.</summary>
    public class OrderAggregateHavingInput : IAn5HavingInput
    {
        public List<OrderAggregateHavingInput> AND { get; set; }
        public List<OrderAggregateHavingInput> OR { get; set; }
        public OrderAggregateHavingInput NOT { get; set; }
        public OrderCountAggregateFilter _count { get; set; }
        public OrderNumericAggregateFilter _sum { get; set; }
        public OrderNumericAggregateFilter _avg { get; set; }
        public OrderScalarAggregateFilter _min { get; set; }
        public OrderScalarAggregateFilter _max { get; set; }
        public StringFilter Id { get; set; }
        public StringFilter UserId { get; set; }
        public IntFilter Total { get; set; }
        public DateTimeFilter CreatedAt { get; set; }
    }

    /// <summary>ORM-style args for Order.GroupBy().</summary>
    public class OrderGroupByArgs : IAn5GroupByArgs
    {
        public List<string> By { get; set; }
        public OrderWhereInput Where { get; set; }
        public OrderAggregateHavingInput Having { get; set; }
        public OrderOrderByInput OrderBy { get; set; }
        public int? Skip { get; set; }
        public int? Take { get; set; }
        public object Count { get; set; }
        public List<string> Sum { get; set; }
        public List<string> Avg { get; set; }
        public List<string> Min { get; set; }
        public List<string> Max { get; set; }
    }

}
