# This file is auto-generated. Do not edit directly.
from dataclasses import dataclass, field
from typing import Optional, List, Any, TypedDict
from datetime import datetime

"""Embedding provider configuration. Stores API keys and model settings for RAG features."""
@dataclass
class EmbeddingConfig:
    provider: str
    api_key: str
    id: Optional[str] = None
    model: Optional[str] = None
    endpoint: Optional[str] = None
    is_active: Optional[bool] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class EmbeddingConfigRow(TypedDict, total=False):
    """Row shape returned for EmbeddingConfig queries."""
    id: str
    provider: str
    api_key: str
    model: str
    endpoint: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

"""LLM provider configuration. Stores API keys and model settings for AI features."""
@dataclass
class LlmConfig:
    provider: str
    api_key: str
    id: Optional[str] = None
    model: Optional[str] = None
    endpoint: Optional[str] = None
    is_active: Optional[bool] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class LlmConfigRow(TypedDict, total=False):
    """Row shape returned for LlmConfig queries."""
    id: str
    provider: str
    api_key: str
    model: str
    endpoint: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

"""Represents a registered user in the database."""
@dataclass
class User:
    email: str
    id: Optional[str] = None
    name: Optional[str] = None
    created_at: Optional[datetime] = None

class UserRow(TypedDict, total=False):
    """Row shape returned for User queries."""
    id: str
    email: str
    name: str
    created_at: datetime

"""Represents a customer order in the system."""
@dataclass
class Order:
    user_id: str
    id: Optional[str] = None
    total: Optional[int] = None
    created_at: Optional[datetime] = None

class OrderRow(TypedDict, total=False):
    """Row shape returned for Order queries."""
    id: str
    user_id: str
    total: int
    created_at: datetime

