from fastapi import APIRouter, Request, Response, HTTPException, Depends, status
from app.service.account_service import AccountService
from app.depend.get_current_user import get_current_user
from app.schema.account import CreateAccount
from app.depend.auth_user import auth_user
from typing import Annotated
from app.schema.user import CurrentUser
account_router = APIRouter()


@account_router.post("/", status_code=201)
async def create_account(
        a: Annotated[dict, Depends(auth_user)],
        data: CreateAccount
):
    return AccountService.create(data=data)


@account_router.delete("/{id}")
async def delete_account(id: int):
    AccountService.delete(id=id)
    return {"message": "Account deleted with id"}
