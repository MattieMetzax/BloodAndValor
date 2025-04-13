# backend/models.py
from pydantic import BaseModel
from typing import List, Optional, Dict

class Settlement(BaseModel):
    id: str
    settlement_type: str  # "village", "town", "capital", etc.
    buildings: List[str] = []

# backend/models.py
from pydantic import BaseModel
from typing import List, Optional

class Tile(BaseModel):
    id: str
    tile_type: str
    owner: Optional[str] = None
    settlements: List[str] = []
    x: int
    y: int

class Player(BaseModel):
    id: str
    name: str
