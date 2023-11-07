from datetime import datetime
from sqlalchemy import ForeignKey, Column, Integer, String, DateTime, Float
from .database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(30), unique=True)
    email = Column(String(60), unique=True)
    password = Column(String(80))
    role_id = Column(Integer, ForeignKey("roles.id"), default=1)
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())


class Role(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(40), unique=True)
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())


class Account(Base):
    __tablename__ = "accounts"
    id = Column(Integer, primary_key=True, index=True)
    balance = Column(Float, default=0)
    user_id = Column(Integer, ForeignKey("users.id"))
    account_type_id = Column(Integer, ForeignKey("account_types.id"))
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())


class AccountType(Base):
    __tablename__ = "account_types"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(50))
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())


class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    source_account_id = Column(Integer, ForeignKey("accounts.id"))
    target_account_id = Column(Integer, ForeignKey("accounts.id"))
    amount = Column(Float)
    transaction_date = Column(DateTime, default=datetime.now())
