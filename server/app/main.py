from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controller import auth_controller, account_controller, transaction_controller
from .model import Base
from .database import engine

app = FastAPI()

origins = ["http://localhost:5173", "https://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)


@app.get("/")
async def index():
    return {"fastapi"}


app.include_router(router=auth_controller.auth_router, prefix="/api/v1/auth")
app.include_router(router=account_controller.account_router, prefix="/api/v1/account")
app.include_router(router=transaction_controller.transaction_router, prefix="/api/v1/transaction")
