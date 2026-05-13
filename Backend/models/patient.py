from __future__ import annotations
from sqlalchemy import Integer, ForeignKey, String
from sqlalchemy.orm import relationship, Mapped, mapped_column
from database.database import Base

class Patient(Base):
    __tablename__ = "patient"
    id_pat: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    id_user : Mapped[int] = mapped_column(ForeignKey("users.id_user"),unique=True,nullable=False)
    age: Mapped[int | None] = mapped_column(Integer, nullable=True)
    sexe: Mapped[str | None] = mapped_column(String, nullable=True)
    telephone: Mapped[str | None] = mapped_column(String, nullable=True)
    diagnostic: Mapped[list["Diagnostic"]] = relationship(
        "Diagnostic",
        back_populates="owner",
        cascade="all, delete-orphan"
    )
    check : Mapped["Users"] = relationship(
        "Users",
        back_populates="patient",
    )

