# backend/models.py
from pydantic import BaseModel
from typing import List, Optional, Dict

class Settlement(BaseModel):
    id: str
    settlement_type: str  # "village", "town", "capital", etc.
    buildings: List[str] = []

class Tile:
    def __init__(self, id, tile_type, owner, settlements):
        self.id = id
        self.tile_type = tile_type
        self.owner = owner
        self.settlements = settlements

    def dict(self):
        return {
            "id": self.id,
            "tile_type": self.tile_type,
            "owner": self.owner,
            "settlements": self.settlements
        }

class Player:
    def __init__(self, player_id, name):
        self.player_id = player_id
        self.name = name

    def dict(self):
        return {
            "player_id": self.player_id,
            "name": self.name
        }
