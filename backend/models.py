from pydantic import BaseModel
from typing import List, Optional

class Settlement(BaseModel):
    id: str
    settlement_type: str
    buildings: List[str] = []

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
    password: str
    coins: int = 1000
    wood: int = 500
    stone: int = 300
    iron: int = 200
    royal_decrees: int = 2
    well_being: float = 100.0
    army_size: int = 0
    laws: dict = {
        "recruitment": "balanced",
        "taxation": "standard",
        "justice": "balanced",
        "foreign": "neutral"
    }
    settlements: List[str] = []
    rank: str = "Baron"
