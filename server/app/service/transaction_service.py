from ..model import Transaction, Account
from ..database import SessionLocal
from app.schema.transaction import DepositTransaction, WithdrawTransaction, TransferTransaction
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError

db = SessionLocal()


class TransactionService:

    # Para yatırma
    @staticmethod
    def deposit(id: str, data: DepositTransaction):
        db.begin()
        try:
            account = db.query(Account).filter_by(id=data.source_account_id).first()
            if account:
                account.balance = account.balance + data.amount
                db.commit()
                transaction = Transaction(
                    source_account_id=data.source_account_id,
                    target_account_id=None,
                    amount=data.amount
                )
                db.add(transaction)
                db.commit()
                return {"message": f"An amount of {transaction.amount} TL has been deposited into your account"}
            else:
                raise HTTPException(status_code=500, detail="Database error!")
        except SQLAlchemyError as e:
            db.rollback()
            print(e)
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            db.close()

    # Para çekme
    @staticmethod
    def withdraw(id: int, data: WithdrawTransaction):
        db.begin()
        try:
            account = db.query(Account).filter_by(id=data.source_account_id).first()
            if account:
                account.balance = account.balance - data.amount
                db.commit()
                transaction = Transaction(
                    source_account_id=data.source_account_id,
                    target_account_id=None,
                    amount=data.amount
                )
                db.add(transaction)
                db.commit()
                return {"message": f"An amount of {transaction.amount} TL has been withdraw into your account."}
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            db.close()

    # Para transfer
    @staticmethod
    def transfer(id: int, data: TransferTransaction):
        db.begin()
        try:
            account1 = db.query(Account).filter_by(id=data.source_account_id).first()
            account2 = db.query(Account).filter_by(id=data.target_account_id).first()
            if account1 and account2:
                account1.balance = account1.balance - data.amount
                account2.balance = account2.balance + data.amount
                db.commit()
                transaction = Transaction(
                    source_account_id=data.source_account_id,
                    target_account_id=data.target_account_id,
                    amount=data.amount
                )
                db.add(transaction)
                db.commit()
                return {"message": f"{transaction.amount} TL transferred to {transaction.target_account_id}."}
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            db.close()

    @staticmethod
    def list_transaction(source_account_id: str):
        try:
            transaction_list = db.query(Transaction).filter_by(source_account_id=source_account_id).limit(30).all()
            print(transaction_list)
            if transaction_list:
                return transaction_list
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=str(e))
