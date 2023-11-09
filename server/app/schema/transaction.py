from pydantic import BaseModel


class DepositTransaction(BaseModel):
    amount: float
    source_account_id: str


class WithdrawTransaction(BaseModel):
    amount: float
    source_account_id: str


class TransferTransaction(BaseModel):
    source_account_id: str
    target_account_id: str
    amount: float
