from pydantic import BaseModel


class DepositTransaction(BaseModel):
    amount: float


class WithdrawTransaction(BaseModel):
    source_account_id: int
    amount: float
