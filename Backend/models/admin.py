from __future__ import annotations
from sqlalchemy import Integer,ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column,DeclarativeBase
from database.database import Base


class Admin(Base):
    __tablename__ = "admin"
    id_adm: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    id_user : Mapped[int] = mapped_column(ForeignKey("users.id_user"),unique=True,nullable=False)
    check : Mapped["Users"] = relationship(
        "Users",
        back_populates="admin",
    )