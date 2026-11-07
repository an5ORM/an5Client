# This file is auto-generated. Do not edit directly.
from dataclasses import dataclass, field
from typing import Optional, List, Any, TypedDict
from datetime import datetime

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

class _LlmConfigRequired(TypedDict):
    """Required keys of a LlmConfig row."""
    id: str
    provider: str
    api_key: str
    model: Optional[str]
    endpoint: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: datetime

class LlmConfigRow(_LlmConfigRequired, total=False):
    """Row shape returned for LlmConfig queries."""
    pass

