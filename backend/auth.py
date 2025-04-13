from models import Player
from player_data import players
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def register_player(player_id: str, name: str, password: str) -> bool:
    if player_id in players:
        return False
    hashed_password = get_password_hash(password)
    players[player_id] = Player(
        id=player_id,
        name=name,
        password=hashed_password,
        ...
    )
    return True

def authenticate_player(player_id: str, password: str) -> bool:
    player = players.get(player_id)
    if not player:
        return False
    if not verify_password(password, player.password):
        return False
    return True
