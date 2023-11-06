from pydantic import BaseModel


class CreateAccount(BaseModel):
    balance: float
    user_id: int
