# This file is auto-generated. Do not edit directly.
from dataclasses import dataclass, field
from typing import Optional, List, Any, TypedDict
from datetime import datetime

"""Represents a registered user in the database."""
@dataclass
class User:
    email: str
    id: Optional[str] = None
    name: Optional[str] = None
    created_at: Optional[datetime] = None

class _UserRequired(TypedDict):
    """Required keys of a User row."""
    email: str

class UserRow(_UserRequired, total=False):
    """Row shape returned for User queries."""
    id: str
    name: str
    created_at: datetime

