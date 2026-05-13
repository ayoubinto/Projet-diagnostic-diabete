from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models import Users
from schemas.validation_mod import UserCreate, UserUpdate


async def create_user(db: AsyncSession, user:UserCreate) -> Users:
    db_user = Users(**user.dict())
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def get_user_by_email(db:AsyncSession, email:str) -> Users | None:
    result = await db.execute(select(Users).where(Users.email == email))
    return result.scalar_one_or_none()

async def get_user_by_id(db:AsyncSession, user_id:int) -> Users | None:
    result = await db.execute(select(Users).where(Users.id_user == user_id))
    return result.scalar_one_or_none()

async def update_user(db:AsyncSession, db_user:Users,update:UserUpdate) -> Users | None:
    if not db_user:
        return None
    for key, value in update.dict(exclude_unset=True).items():
        setattr(db_user, key, value)
    await db.commit()
    await db.refresh(db_user)
    return db_user