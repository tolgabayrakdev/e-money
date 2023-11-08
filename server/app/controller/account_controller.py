from fastapi import APIRouter, Request, Response, HTTPException, Depends, status
from app.service.account_service import AccountService
from app.depend.get_current_user import get_current_user
from app.schema.account import CreateAccount
from app.depend.auth_user import auth_user
from ..model import User
from typing import Annotated
from app.schema.user import CurrentUser

account_router = APIRouter()


@account_router.post("/", status_code=201)
async def create_account(
        user: Annotated[User, Depends(auth_user)],
        request: CreateAccount
):
    return AccountService.create(user.id, account_type_id=request.account_type_id)


@account_router.delete("/{id}")
async def delete_account(id: int):
    AccountService.delete(id=id)
    return {"message": "Account deleted with id"}


@account_router.get("/{id}")
async def show_account(id: int):
    return AccountService.show(id)
