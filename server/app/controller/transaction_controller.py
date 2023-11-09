from app.service.transaction_service import TransactionService
from fastapi import HTTPException, APIRouter, Request, Depends
from app.schema.transaction import DepositTransaction, WithdrawTransaction
from ..model import User
from app.depend.auth_user import auth_user
from typing import Annotated


transaction_router = APIRouter()


@transaction_router.post("/deposit")
async def deposit(
        data: DepositTransaction,
        user: Annotated[User, Depends(auth_user)],
):
    return TransactionService.deposit(data=data, id=user.id)


@transaction_router.post("/withdraw")
async def withdraw(data: WithdrawTransaction):
    return TransactionService.withdraw(data=data)
