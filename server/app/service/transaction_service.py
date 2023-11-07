from ..model import Transaction, Account
from ..database import SessionLocal
from app.schema.transaction import DepositTransaction, WithdrawTransaction
from fastapi import HTTPException

db = SessionLocal()


class TransactionService:

    # Para yatırma
    @staticmethod
    def deposit(data: DepositTransaction):
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

    # Para çekme
    @staticmethod
    def withdraw(data: WithdrawTransaction):
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
            return Transaction

    # Para transfer
    @staticmethod
    def transfer() -> str:
        return ""
