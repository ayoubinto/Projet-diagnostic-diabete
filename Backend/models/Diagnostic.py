from __future__ import annotations
from decimal import Decimal
from sqlalchemy import Integer,String, ForeignKey, Numeric, Boolean, DateTime, func
from sqlalchemy.orm import relationship, Mapped, mapped_column,DeclarativeBase
import datetime
from database.database import Base

class Diagnostic(Base):
    __tablename__ = "diagnostic"
    id_diagnose : Mapped[int] = mapped_column(Integer,primary_key=True)
    id_pat : Mapped[int] = mapped_column(ForeignKey("patient.id_pat"),nullable=False) #FK column

    owner: Mapped["Patient"] = relationship(
        "Patient",
        back_populates="diagnostic"
    )
    genre : Mapped[str] = mapped_column(String(20))
    age : Mapped[int] = mapped_column(Integer)
    hypertension : Mapped[bool] = mapped_column(Boolean)
    heart_disease : Mapped[bool] = mapped_column(Boolean)
    smoking_history : Mapped[str] = mapped_column(String(50))
    bmi : Mapped[Decimal] = mapped_column(Numeric(5,2))
    HbA1c_level : Mapped[float] = mapped_column(Numeric(4,2))
    blood_glucose_level : Mapped[float] = mapped_column(Numeric(6,2))
    prediction_result : Mapped[bool] = mapped_column(Boolean)
    prediction_probability : Mapped[float] = mapped_column(Numeric(8,6))
    diagnostic_date : Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )