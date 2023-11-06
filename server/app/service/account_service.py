from ..database import SessionLocal
from ..model import Account
from fastapi import HTTPException
from app.schema.account import CreateAccount
from sqlalchemy.exc import SQLAlchemyError

db = SessionLocal()


class AccountService:

    @staticmethod
    def create(data: CreateAccount):
        try:
            account = Account(
                balance=0,
                user_id=data.user_id
            )
            db.add(account)
            db.commit()
            return account
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def delete(id: int):
        try:
            account = db.query(Account).filter_by(id=id).first()
            db.delete(account)
            db.commit()
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))
