from ..database import SessionLocal
from ..model import Account
from fastapi import HTTPException
from app.schema.account import CreateAccount
from sqlalchemy.exc import SQLAlchemyError

db = SessionLocal()


class AccountService:

    @staticmethod
    def create(user_id: int, account_type_id: int):
        try:
            account = Account(
                balance=0,
                user_id=user_id,
                account_type_id=account_type_id
            )
            db.add(account)
            db.commit()
            return {"message": "Account created."}
        except SQLAlchemyError as e:
            db.rollback()
            print(e)
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def delete(id: str):
        try:
            account = db.query(Account).filter_by(id=id).first()
            db.delete(account)
            db.commit()
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def show(id: str):
        try:
            account = db.query(Account).filter_by(id=id).first()
            if not account:
                raise HTTPException(status_code=404, detail="Account not found!")
            return account
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def list_by_user(user_id: int):
        try:
            account_list = db.query(Account).filter_by(user_id=user_id).limit(limit=30).all()
            return account_list
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=str(e))
