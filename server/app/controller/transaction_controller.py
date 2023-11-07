from app.service.transaction_service import TransactionService
from fastapi import HTTPException, APIRouter, Request
from app.schema.transaction import DepositTransaction, WithdrawTransaction

transaction_router = APIRouter()


@transaction_router.post("/deposit")
async def deposit(data: DepositTransaction):
    return TransactionService.deposit(data=data)


@transaction_router.post("/withdraw")
async def withdraw(data: WithdrawTransaction):
    return TransactionService.withdraw(data=data)
