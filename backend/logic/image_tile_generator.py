# backend/logic/image_tile_generator.py
from PIL import Image
from typing import List
from backend.models import Tile

# Define mapping from RGB to tile type
COLOR_TO_TILE = {
    (144, 238, 144): "plains",
    (34, 139, 34): "forest",
    (128, 128, 128): "mountain",
    (237, 201, 175): "desert",
    (85, 107, 47): "marsh",
    (0, 105, 148): "ocean",
}

def generate_map_from_image(image_path: str) -> List[Tile]:
    img = Image.open(image_path).convert("RGB")
    width, height = img.size
    tiles = []
    tile_id = 1

    for y in range(height):
        for x in range(width):
            pixel = img.getpixel((x, y))
            tile_type = COLOR_TO_TILE.get(pixel, "plains")  # Default to plains if unknown
            tile = Tile(
                id=f"tile_{tile_id}",
                tile_type=tile_type,
                owner=None,
                settlements=[]
            )
            tiles.append(tile)
            tile_id += 1

    return tiles
