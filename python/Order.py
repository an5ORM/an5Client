# This file is auto-generated. Do not edit directly.
from dataclasses import dataclass, field
from typing import Optional, List, Any, TypedDict
from datetime import datetime

"""Represents a customer order in the system."""
@dataclass
class Order:
    user_id: str
    id: Optional[str] = None
    total: Optional[int] = None
    created_at: Optional[datetime] = None

class _OrderRequired(TypedDict):
    """Required keys of a Order row."""
    user_id: str

class OrderRow(_OrderRequired, total=False):
    """Row shape returned for Order queries."""
    id: str
    total: int
    created_at: datetime

