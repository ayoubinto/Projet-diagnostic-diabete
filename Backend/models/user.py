from __future__ import annotations
from datetime import datetime
from sqlalchemy import Integer, String, func, DateTime
from sqlalchemy.orm import relationship, Mapped, mapped_column,DeclarativeBase
from database.database import Base


class Users(Base):
    __tablename__ = "users"
    id_user : Mapped[int] = mapped_column(Integer,primary_key=True)
    nom : Mapped[str] = mapped_column(String(25),nullable=False)
    prenom : Mapped[str] = mapped_column(String(25),nullable=False)
    email : Mapped[str] = mapped_column(String(100),unique=True,nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role : Mapped[str] = mapped_column(String(12),nullable=False)
    date_inscription: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    patient : Mapped["Patient"] = relationship(
        "Patient",
        back_populates="check",
        cascade="all, delete-orphan"
    )
    admin : Mapped["Admin"] = relationship(
        "Admin",
        back_populates="check",
        cascade="all, delete-orphan"
    )

