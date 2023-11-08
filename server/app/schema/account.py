from pydantic import BaseModel


class CreateAccount(BaseModel):
    account_type_id: int
