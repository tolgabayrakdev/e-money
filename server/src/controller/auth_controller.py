from typing import Dict

from fastapi import Response, Request, HTTPException, APIRouter
from service.auth_service import AuthService
from schema.user import LoginUser, RegisterUser

auth_router = APIRouter()


@auth_router.post("/login")
async def login(user: LoginUser, response: Response) -> dict[str, str]:
    result = AuthService.login(user.email, user.password)
    if result:
        response.set_cookie(key="access_token", value=result["access_token"], httponly=True)
        response.set_cookie(key="refresh_token", value=result["refresh_token"], httponly=True)
        return {"message": "Login is successful."}
    else:
        raise HTTPException(status_code=500, detail="Server error!")
