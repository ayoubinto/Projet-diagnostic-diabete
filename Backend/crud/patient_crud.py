from unittest import result

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models import Patient, Users
from schemas.validation_mod import PatientCreate,PatientUpdate
from typing import Optional

async def create_patient(db: AsyncSession, patient:PatientCreate) -> Patient:
    db_patient = Patient(**patient.dict())
    db.add(db_patient)
    await db.commit()
    await db.refresh(db_patient)
    return db_patient

async def get_patient(db: AsyncSession, patient_id:int) -> Optional[Patient]:
    result = await db.execute(select(Patient).where(Patient.id_pat  == patient_id))
    return result.scalar_one_or_none()

async def get_patient_user(db: AsyncSession, id_user:int) -> Optional[Patient]:
    result = await db.execute(select(Patient).where(Patient.id_user  == id_user))
    return result.scalar_one_or_none()


async def get_patients(db:AsyncSession) -> list[Patient] | None:
    result = await db.execute(select(Patient))
    return result.scalars().all()

async def update_patient(db: AsyncSession, db_patient:Patient,update:PatientUpdate) -> Patient | None:
    if not db_patient:
        return None
    for key , value in update.dict(exclude_unset=True).items():
        setattr(db_patient,key,value)
    await db.commit()
    await db.refresh(db_patient)
    return db_patient

async def delete_patient(db: AsyncSession, id_pat:int) -> bool:
    result = await db.execute(select(Patient).where(Patient.id_pat == id_pat))
    patient = result.scalar_one_or_none()
    if not patient:
        return False

    await db.delete(patient)
    await db.commit()
    return True
