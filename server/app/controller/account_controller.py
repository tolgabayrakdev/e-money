from fastapi import APIRouter, Request, Response, HTTPException, Depends, status
from app.service.account_service import AccountService
from app.depend.get_current_user import get_current_user
from typing import Annotated
from app.schema.user import CurrentUser
account_router = APIRouter()


@account_router.post("/", status_code=201)
async def create_account(
        current_user: Annotated[dict, Depends(get_current_user)]
):
    return current_user


@account_router.delete("/{id}") 
async def delete_account(id: int):
    AccountService.delete(id=id)
    return {"message": "Account deleted with id"}
