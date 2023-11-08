from ..model import Transaction, Account
from ..database import SessionLocal
from app.schema.transaction import DepositTransaction, WithdrawTransaction
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError

db = SessionLocal()


class TransactionService:

    # Para yatırma
    @staticmethod
    def deposit(data: DepositTransaction):
        db.begin()
        try: 
            account = db.query(Account).filter_by(id=data.source_account_id).first()
            if account:
                account.balance = account.balance + data.amount
                db.commit()
                transaction = Transaction(
                    source_account_id=data.source_account_id,
                    amount=data.amount
                )
                db.add(transaction)
                db.commit()
                return transaction
            else:
                raise HTTPException(status_code=500, detail="Database error!")
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    # Para çekme
    @staticmethod
    def withdraw(data: WithdrawTransaction):
        db.begin()
        try:
            account = db.query(Account).filter_by(id=data.source_account_id).first()
            if account:
                account.balance = account.balance - data.amount
                db.commit()
                transaction = Transaction(
                    source_account_id=data.source_account_id,
                    amount=data.amount
                )
                db.add(Transaction)
                db.commit()
                return transaction
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    # Para transfer
    @staticmethod
    def transfer() -> str:
        return ""
