# This file is auto-generated. Do not edit directly.
"""
AN5 ORM typed filter/args dataclasses.

These describe the filter shapes the Python client accepts. The adapter reads plain
dicts, not these dataclasses, and it quotes every key verbatim, so use the schema
field names (`createdAt`, not `created_at`):

    db.user.find_many(where={"name": {"contains": "John"}},
                      order_by={"createdAt": "desc"},
                      take=10)
"""
from __future__ import annotations
from dataclasses import dataclass, field
from typing import List, Optional, Any
from datetime import datetime

# ─── Base filter types ────────────────────────────────────────────────────────

@dataclass
class StringFilter:
    """Type-safe filter for string fields."""
    equals: Optional[str] = None
    not_: Optional[str] = None
    contains: Optional[str] = None
    starts_with: Optional[str] = None
    ends_with: Optional[str] = None
    in_: Optional[List[str]] = None
    not_in: Optional[List[str]] = None
    gt: Optional[str] = None
    gte: Optional[str] = None
    lt: Optional[str] = None
    lte: Optional[str] = None

@dataclass
class IntFilter:
    """Type-safe filter for integer fields."""
    equals: Optional[int] = None
    not_: Optional[int] = None
    in_: Optional[List[int]] = None
    not_in: Optional[List[int]] = None
    gt: Optional[int] = None
    gte: Optional[int] = None
    lt: Optional[int] = None
    lte: Optional[int] = None

@dataclass
class NumberFilter:
    """Type-safe filter for float/decimal fields."""
    equals: Optional[float] = None
    not_: Optional[float] = None
    in_: Optional[List[float]] = None
    not_in: Optional[List[float]] = None
    gt: Optional[float] = None
    gte: Optional[float] = None
    lt: Optional[float] = None
    lte: Optional[float] = None

@dataclass
class BoolFilter:
    """Type-safe filter for boolean fields."""
    equals: Optional[bool] = None

@dataclass
class DateTimeFilter:
    """Type-safe filter for datetime fields."""
    equals: Optional[datetime] = None
    not_: Optional[datetime] = None
    in_: Optional[List[datetime]] = None
    not_in: Optional[List[datetime]] = None
    gt: Optional[datetime] = None
    gte: Optional[datetime] = None
    lt: Optional[datetime] = None
    lte: Optional[datetime] = None

# ─── EmbeddingConfig ORM Types ────────────────────────────────────────────────────────

@dataclass
class EmbeddingConfigWhereInput:
    """Type-safe WHERE filter for EmbeddingConfig queries."""
    AND: Optional[List['EmbeddingConfigWhereInput']] = None
    OR: Optional[List['EmbeddingConfigWhereInput']] = None
    NOT: Optional['EmbeddingConfigWhereInput'] = None
    id: Optional[StringFilter] = None
    provider: Optional[StringFilter] = None
    api_key: Optional[StringFilter] = None
    model: Optional[StringFilter] = None
    endpoint: Optional[StringFilter] = None
    is_active: Optional[BoolFilter] = None
    created_at: Optional[DateTimeFilter] = None
    updated_at: Optional[DateTimeFilter] = None

@dataclass
class EmbeddingConfigOrderByInput:
    """Type-safe ORDER BY for EmbeddingConfig queries. Value: 'asc' or 'desc'."""
    id: Optional[str] = None
    provider: Optional[str] = None
    api_key: Optional[str] = None
    model: Optional[str] = None
    endpoint: Optional[str] = None
    is_active: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

@dataclass
class EmbeddingConfigCreateInput:
    """Typed data for creating a new EmbeddingConfig record."""
    provider: str
    api_key: str
    model: Optional[str] = None
    endpoint: Optional[str] = None
    is_active: Optional[bool] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

@dataclass
class EmbeddingConfigUpdateInput:
    """Typed data for updating an existing EmbeddingConfig record."""
    provider: Optional[str] = None
    api_key: Optional[str] = None
    model: Optional[str] = None
    endpoint: Optional[str] = None
    is_active: Optional[bool] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

@dataclass
class EmbeddingConfigFindManyArgs:
    """ORM-style args for EmbeddingConfig.find_many()."""
    where: Optional[EmbeddingConfigWhereInput] = None
    order_by: Optional[EmbeddingConfigOrderByInput] = None
    take: Optional[int] = None
    skip: int = 0
    select: Optional[List[str]] = None

@dataclass
class EmbeddingConfigFindFirstArgs:
    """ORM-style args for EmbeddingConfig.find_first()."""
    where: Optional[EmbeddingConfigWhereInput] = None
    order_by: Optional[EmbeddingConfigOrderByInput] = None
    select: Optional[List[str]] = None

# ─── LlmConfig ORM Types ────────────────────────────────────────────────────────

@dataclass
class LlmConfigWhereInput:
    """Type-safe WHERE filter for LlmConfig queries."""
    AND: Optional[List['LlmConfigWhereInput']] = None
    OR: Optional[List['LlmConfigWhereInput']] = None
    NOT: Optional['LlmConfigWhereInput'] = None
    id: Optional[StringFilter] = None
    provider: Optional[StringFilter] = None
    api_key: Optional[StringFilter] = None
    model: Optional[StringFilter] = None
    endpoint: Optional[StringFilter] = None
    is_active: Optional[BoolFilter] = None
    created_at: Optional[DateTimeFilter] = None
    updated_at: Optional[DateTimeFilter] = None

@dataclass
class LlmConfigOrderByInput:
    """Type-safe ORDER BY for LlmConfig queries. Value: 'asc' or 'desc'."""
    id: Optional[str] = None
    provider: Optional[str] = None
    api_key: Optional[str] = None
    model: Optional[str] = None
    endpoint: Optional[str] = None
    is_active: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

@dataclass
class LlmConfigCreateInput:
    """Typed data for creating a new LlmConfig record."""
    provider: str
    api_key: str
    model: Optional[str] = None
    endpoint: Optional[str] = None
    is_active: Optional[bool] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

@dataclass
class LlmConfigUpdateInput:
    """Typed data for updating an existing LlmConfig record."""
    provider: Optional[str] = None
    api_key: Optional[str] = None
    model: Optional[str] = None
    endpoint: Optional[str] = None
    is_active: Optional[bool] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

@dataclass
class LlmConfigFindManyArgs:
    """ORM-style args for LlmConfig.find_many()."""
    where: Optional[LlmConfigWhereInput] = None
    order_by: Optional[LlmConfigOrderByInput] = None
    take: Optional[int] = None
    skip: int = 0
    select: Optional[List[str]] = None

@dataclass
class LlmConfigFindFirstArgs:
    """ORM-style args for LlmConfig.find_first()."""
    where: Optional[LlmConfigWhereInput] = None
    order_by: Optional[LlmConfigOrderByInput] = None
    select: Optional[List[str]] = None

# ─── User ORM Types ────────────────────────────────────────────────────────

@dataclass
class UserWhereInput:
    """Type-safe WHERE filter for User queries."""
    AND: Optional[List['UserWhereInput']] = None
    OR: Optional[List['UserWhereInput']] = None
    NOT: Optional['UserWhereInput'] = None
    id: Optional[StringFilter] = None
    email: Optional[StringFilter] = None
    name: Optional[StringFilter] = None
    created_at: Optional[DateTimeFilter] = None

@dataclass
class UserOrderByInput:
    """Type-safe ORDER BY for User queries. Value: 'asc' or 'desc'."""
    id: Optional[str] = None
    email: Optional[str] = None
    name: Optional[str] = None
    created_at: Optional[str] = None

@dataclass
class UserCreateInput:
    """Typed data for creating a new User record."""
    email: str
    name: Optional[str] = None
    created_at: Optional[datetime] = None

@dataclass
class UserUpdateInput:
    """Typed data for updating an existing User record."""
    email: Optional[str] = None
    name: Optional[str] = None
    created_at: Optional[datetime] = None

@dataclass
class UserFindManyArgs:
    """ORM-style args for User.find_many()."""
    where: Optional[UserWhereInput] = None
    order_by: Optional[UserOrderByInput] = None
    take: Optional[int] = None
    skip: int = 0
    select: Optional[List[str]] = None

@dataclass
class UserFindFirstArgs:
    """ORM-style args for User.find_first()."""
    where: Optional[UserWhereInput] = None
    order_by: Optional[UserOrderByInput] = None
    select: Optional[List[str]] = None

# ─── Order ORM Types ────────────────────────────────────────────────────────

@dataclass
class OrderWhereInput:
    """Type-safe WHERE filter for Order queries."""
    AND: Optional[List['OrderWhereInput']] = None
    OR: Optional[List['OrderWhereInput']] = None
    NOT: Optional['OrderWhereInput'] = None
    id: Optional[StringFilter] = None
    user_id: Optional[StringFilter] = None
    total: Optional[IntFilter] = None
    created_at: Optional[DateTimeFilter] = None

@dataclass
class OrderOrderByInput:
    """Type-safe ORDER BY for Order queries. Value: 'asc' or 'desc'."""
    id: Optional[str] = None
    user_id: Optional[str] = None
    total: Optional[str] = None
    created_at: Optional[str] = None

@dataclass
class OrderCreateInput:
    """Typed data for creating a new Order record."""
    user_id: str
    total: Optional[int] = None
    created_at: Optional[datetime] = None

@dataclass
class OrderUpdateInput:
    """Typed data for updating an existing Order record."""
    user_id: Optional[str] = None
    total: Optional[int] = None
    created_at: Optional[datetime] = None

@dataclass
class OrderFindManyArgs:
    """ORM-style args for Order.find_many()."""
    where: Optional[OrderWhereInput] = None
    order_by: Optional[OrderOrderByInput] = None
    take: Optional[int] = None
    skip: int = 0
    select: Optional[List[str]] = None

@dataclass
class OrderFindFirstArgs:
    """ORM-style args for Order.find_first()."""
    where: Optional[OrderWhereInput] = None
    order_by: Optional[OrderOrderByInput] = None
    select: Optional[List[str]] = None

