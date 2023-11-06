from fastapi import HTTPException, status, Depends
import jwt
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer
from ..database import SessionLocal
from ..model import User

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

db = SessionLocal()


async def get_current_user(token: Annotated[str, Depends(oauth2_schema)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, "secret_key", algorithms=["HS256"])
        user_id = (payload["payload"]["user_id"])
        if user_id is None:
            raise credentials_exception
        user = db.query(User).filter(User.id == user_id).first()
        if user is None:
            raise credentials_exception
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=403, detail="Invalid token")
