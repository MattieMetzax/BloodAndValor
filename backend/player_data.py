# backend/player_data.py

from models import Player

players = {}

def create_player(player_id: str, name: str) -> bool:
    if player_id not in players:
        players[player_id] = Player(
            id=player_id,
            name=name,
            coins=1000,
            wood=500,
            stone=300,
            iron=200,
            royal_decrees=2,
            well_being=100.0,
            army_size=0,
            laws={"recruitment": "balanced", "taxation": "standard", "justice": "balanced", "foreign": "neutral"},
            settlements=[],
            rank="Baron"
        )
        return True
    return False

def get_player(player_id: str):
    return players.get(player_id)
