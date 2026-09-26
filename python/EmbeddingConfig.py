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

class _EmbeddingConfigRequired(TypedDict):
    """Required keys of a EmbeddingConfig row."""
    provider: str
    api_key: str

class EmbeddingConfigRow(_EmbeddingConfigRequired, total=False):
    """Row shape returned for EmbeddingConfig queries."""
    id: str
    model: str
    endpoint: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

