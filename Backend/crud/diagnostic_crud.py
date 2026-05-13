from unittest import result

from sqlalchemy.engine import row
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, case
from models import Diagnostic, Patient, Users
from schemas.validation_mod import DiagnosticCreate

from models import Diagnostic


async def create_diagnostic(db:AsyncSession, diagnostic:DiagnosticCreate) -> Diagnostic:
    db_diagnostic = Diagnostic(**diagnostic.dict())
    db.add(db_diagnostic)
    await db.commit()
    await db.refresh(db_diagnostic)
    return db_diagnostic


async def get_diagnostic_by_id(db:AsyncSession, diagnostic_id:int) -> Diagnostic | None:
    result = await db.execute(select(Diagnostic).where(Diagnostic.id == diagnostic_id))
    return result.scalar_one_or_none()

async def get_diagnostics_by_patient(db:AsyncSession, patient_id:int) -> list[Diagnostic] | None:
    result = await db.execute(select(Diagnostic).where(Diagnostic.id_pat == patient_id))
    return result.scalars().all()


async def get_diagnostics(db:AsyncSession) -> list[Diagnostic] | None:
    result = await db.execute(select(Diagnostic))
    return result.scalars().all()

async def get_last_five_diagnostics(db:AsyncSession) ->list[tuple[Diagnostic,Patient,Users]]:
    result = await db.execute(
        select(Diagnostic, Patient, Users).join(
            Patient,
            Diagnostic.id_pat == Patient.id_pat
        ).join(Users, Users.id_user == Patient.id_user).order_by(Diagnostic.diagnostic_date.desc()).limit(5)
    )
    return result.all()

async def get_diagnostics_with_patient_and_user(db:AsyncSession) -> list[tuple[Diagnostic,Patient,Users]]:
    result = await db.execute(
        select(Diagnostic,Patient,Users).join(
            Patient,
            Diagnostic.id_pat == Patient.id_pat
        ).join(Users,Users.id_user == Patient.id_user)
    )
    return result.all()


async def get_diagnostic_by_month(db:AsyncSession):
    mois_expr = func.date_trunc('month', Diagnostic.diagnostic_date)
    stmt = select(
        mois_expr.label("mois"),
        func.count().label("nombres_selectionnes")
    ).group_by(
        mois_expr
    ).order_by(
        mois_expr
    )

    result = await db.execute(stmt)
    data = result.all()
    return [
        {
            "mois": row.mois.strftime('%Y-%m'),
            "total" : row.nombres_selectionnes
        }
        for row in data
    ]


async def get_destribution_age(db:AsyncSession):
    stmt = select(
        Diagnostic.age,
        func.count(Diagnostic.age).label("nombres_age")
    ).group_by(
        Diagnostic.age
    ).order_by(
        Diagnostic.age
    )
    result = await db.execute(stmt)
    data = result.all()
    return [
        {
            "age" : row.age,
            "total" : row.nombres_age
        }
        for row in data
    ]


async def get_number_genre(db:AsyncSession):
    stmt = select(
        func.sum(
            case((Diagnostic.genre == "Male",1),else_=None)
        ).label("nombres_genre_male"),
        func.sum(
            case((Diagnostic.genre == "Female",1), else_=None)
                   ).label("nombres_genre_female")
    )

    result = await db.execute(stmt)
    data = result.all()
    return [
        {
            "N_male" : row.nombres_genre_male,
            "N_female": row.nombres_genre_female
        }
        for row in data
    ]