from app.service.transaction_service import TransactionService
from fastapi import HTTPException, APIRouter, Request, Depends
from app.schema.transaction import DepositTransaction, WithdrawTransaction, TransferTransaction
from ..model import User
from app.depend.auth_user import auth_user
from typing import Annotated

transaction_router = APIRouter()


@transaction_router.post("/deposit")
async def deposit(
        data: DepositTransaction,
        user: Annotated[User, Depends(auth_user)]
):
    return TransactionService.deposit(data=data, id=user.id)


@transaction_router.post("/withdraw")
async def withdraw(
        data: WithdrawTransaction,
        user: Annotated[User, Depends(auth_user)]
):
    return TransactionService.withdraw(data=data, id=user.id)


@transaction_router.post("/transfer")
async def transfer(
        data: TransferTransaction,
        user: Annotated[User, Depends(auth_user)]
):
    return TransactionService.transfer(data=data, id=user.id)


@transaction_router.get("/{source_account_id}")
async def list_transactions(
        source_account_id: str,
        user: Annotated[User, Depends(auth_user)]
):
    return TransactionService.list_transaction(source_account_id=source_account_id)
