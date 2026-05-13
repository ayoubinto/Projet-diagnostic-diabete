from passlib.context import CryptContext
from datetime import datetime , timedelta, timezone
import jwt

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
SECRET_KEY = "0T7nbOK8rG4YzUkoWY7VfDKWKFeWzYZRvGhn2d7Y4m7h01VTuMS1B4stjfq5DW4HpShHwmjMlybYZEFltWoAc2"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])


