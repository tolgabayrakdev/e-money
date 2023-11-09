from pydantic import BaseModel


class DepositTransaction(BaseModel):
    amount: float


class WithdrawTransaction(BaseModel):
    amount: float
