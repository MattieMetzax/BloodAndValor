# backend/logic/tile_generator.py
import random
from typing import List
from backend.models import Tile

TILE_TYPES = {
    "plains": 0.25,
    "forest": 0.2,
    "mountain": 0.2,
    "desert": 0.15,
    "marsh": 0.1,
    "ocean": 0.1,
}

def generate_world_map(width: int = 20, height: int = 20) -> List[Tile]:
    tiles = []
    tile_id = 1

    # Build a weighted pool for random selection
    tile_pool = []
    for tile_type, weight in TILE_TYPES.items():
        tile_pool.extend([tile_type] * int(weight * 100))

    for y in range(height):
        for x in range(width):
            tile_type = random.choice(tile_pool)
            tile = Tile(
                id=f"tile_{tile_id}",
                tile_type=tile_type,
                owner=None,
                settlements=[]
            )
            tiles.append(tile)
            tile_id += 1

    return tiles
