from models import Player
from player_data import players  # our in-memory "database"
from context import CryptContext

# Set up a password context with bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def register_player(player_id: str, name: str, password: str) -> bool:
    if player_id in players:
        return False  # Player already exists
    hashed_password = get_password_hash(password)
    players[player_id] = Player(
        id=player_id,
        name=name,
        password=hashed_password,
        coins=1000,
        wood=500,
        stone=300,
        iron=200,
        royal_decrees=2,
        well_being=100.0,
        army_size=0,
        laws={
            "recruitment": "balanced", 
            "taxation": "standard", 
            "justice": "balanced", 
            "foreign": "neutral"
        },
        settlements=[],
        rank="Baron"
    )
    return True

def authenticate_player(player_id: str, password: str) -> bool:
    player = players.get(player_id)
    if not player:
        return False
    if not verify_password(password, player.password):
        return False
    return True
