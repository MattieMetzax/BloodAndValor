# backend/models.py
from pydantic import BaseModel
from typing import List, Optional, Dict

class Tile(BaseModel):
    id: str
    tile_type: str  # e.g., "plains", "forest", etc.
    owner: Optional[str] = None
    settlements: List[str] = []

class Settlement(BaseModel):
    id: str
    settlement_type: str  # "village", "town", "capital", etc.
    buildings: List[str] = []

class Player(BaseModel):
    id: str
    name: str
    coins: int
    wood: int
    stone: int
    iron: int
    royal_decrees: int
    well_being: float
    army_size: int
    laws: Dict[str, str]
    settlements: List[str]
    rank: str
