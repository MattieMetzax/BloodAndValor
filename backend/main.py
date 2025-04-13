# backend/main.py
from fastapi import FastAPI, HTTPException, UploadFile, File, Body
from typing import List
import io

from models import Tile, Player
from db import game_state
from logic.tile_generator import generate_world_map
from logic.image_tile_generator import generate_map_from_image
from player_data import create_player, get_player, players
from auth import register_player, authenticate_player
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to Kingdom Strategy Game Backend"}

# Map endpoints
@app.post("/generate-map/")
def regenerate_map(width: int = 20, height: int = 20):
    game_state["tiles"] = generate_world_map(width, height)
    return {"message": f"Map generated: {width}x{height}", "total_tiles": len(game_state["tiles"])}

@app.post("/upload-map/")
async def upload_map(file: UploadFile = File(...)):
    content = await file.read()
    from PIL import Image
    image = Image.open(io.BytesIO(content)).convert("RGB")
    tiles = []
    tile_id = 1
    for y in range(image.height):
        for x in range(image.width):
            pixel = image.getpixel((x, y))
            tile_type = {
                (144, 238, 144): "plains",
                (34, 139, 34): "forest",
                (128, 128, 128): "mountain",
                (237, 201, 175): "desert",
                (85, 107, 47): "marsh",
                (0, 105, 148): "ocean"
            }.get(pixel, "plains")
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
    game_state["tiles"] = tiles
    return {"message": "Map uploaded and processed", "total_tiles": len(tiles)}

@app.get("/get-map/")
def get_map():
    return {"map": [tile.dict() for tile in game_state["tiles"]]}

# Player endpoints
@app.post("/register/")
def register(
    player_id: str = Body(...),
    name: str = Body(...),
    password: str = Body(...)
):
    if not register_player(player_id, name, password):
        raise HTTPException(status_code=400, detail="Player already exists.")
    return {"message": f"Player {player_id} registered successfully."}

@app.post("/login/")
def login(
    player_id: str = Body(...),
    password: str = Body(...)
):
    if not authenticate_player(player_id, password):
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    # For now, we simply return a success message.
    # In a production system, you would return a token (e.g., JWT) here.
    return {"message": f"Player {player_id} logged in successfully."}

@app.get("/player/{player_id}")
def get_player_info(player_id: str):
    player = get_player(player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found.")
    return player.dict()
