# backend/db.py
from backend.models import Tile, Player

# Simulated in-memory database
game_state = {
    "tiles": [],
    "players": {}
}
