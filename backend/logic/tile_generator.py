from PIL import Image
from typing import List
from backend.models import Tile

# Define the mapping from RGB colors to tile types.
# Ensure these colors match exactly the ones in your reference image.
COLOR_TO_TILE = {
    (144, 238, 144): "plains",    # Light green for plains
    (34, 139, 34): "forest",      # Dark green for forest
    (128, 128, 128): "mountain",  # Gray for mountains
    (237, 201, 175): "desert",    # Sandy for desert
    (85, 107, 47): "marsh",       # Olive-green for marsh
    (0, 105, 148): "ocean"        # Blue for ocean
}

def generate_map_from_image(image_path: str) -> List[Tile]:
    """
    Reads an image from the given path and generates a list of Tile objects.
    
    Each pixel in the image is mapped to a tile type based on the COLOR_TO_TILE dictionary.
    
    Parameters:
        image_path (str): The path to the map image.
        
    Returns:
        List[Tile]: A flat list of Tile objects with x, y coordinates.
    """
    # Open the image and ensure it is in RGB mode
    img = Image.open(image_path).convert("RGB")
    width, height = img.size
    tiles = []
    tile_id = 1

    for y in range(height):
        for x in range(width):
            pixel = img.getpixel((x, y))
            # Look up the tile type from the color mapping.
            # If the pixel color doesn't match exactly, default to "plains".
            tile_type = COLOR_TO_TILE.get(pixel, "plains")
            tile = Tile(
                id=f"tile_{tile_id}",
                tile_type=tile_type,
                owner=None,
                settlements=[],
                x=x,
                y=y
            )
            tiles.append(tile)
            tile_id += 1

    return tiles

if __name__ == "__main__":
    # For local testing, you can provide the path to your map image.
    test_image_path = "path/to/your/map_image.png"  # Replace with your image path
    generated_tiles = generate_map_from_image(test_image_path)
    for tile in generated_tiles:
        print(f"{tile.id}: ({tile.x}, {tile.y}) - {tile.tile_type}")