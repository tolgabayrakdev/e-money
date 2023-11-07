from pydantic import BaseModel


class DepositTransaction(BaseModel):
    source_account_id: int
    amount: float


class WithdrawTransaction(BaseModel):
    source_account_id: int
    amount: float
