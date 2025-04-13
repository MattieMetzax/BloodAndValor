# backend/db.py
from models import Tile, Player

# Simulated in-memory database
game_state = {
    "tiles": [],
    "players": {}
}
