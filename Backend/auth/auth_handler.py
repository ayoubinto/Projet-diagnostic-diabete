from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session

from crud.user_crud import update_user
from database.database import get_db
from models.user import Users
from models.patient import Patient
from crud.patient_crud import update_patient
from schemas.validation_mod import UserCreate, Token, RegisterResponse, PatientCreate, ChangePassword, PatientUpdate, \
    UserUpdate
from security.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token
)

from models.patient import Patient

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

@router.post("/register",response_model=RegisterResponse)
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Users).where(Users.email == user.email)
    )
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email déjà utilisé")

    db_user = Users(
        nom=user.nom,
        prenom=user.prenom,
        email=user.email,
        hashed_password=hash_password(user.password),
        role=user.role,
        date_inscription=datetime.now()
    )

    db.add(db_user)
    await db.flush()
    db_patient = Patient(
        id_user=db_user.id_user
    )
    db.add(db_patient)
    await db.commit()
    await db.refresh(db_user)

    return {
        "message": "Compte créé avec succès",
        "user": db_user
    }


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession  = Depends(get_db)):

    result = await db.execute(
        select(Users).where(Users.email == form_data.username)
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email incorrect"
        )

    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Mot de passe incorrect"
        )

    access_token = create_access_token(data={"sub": str(user.id_user)})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "message": "Connexion réussie"
    }


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token invalide"
    )

    try:
        payload = decode_access_token(token)
        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

    except Exception:
        raise credentials_exception

    result = await db.execute(
        select(Users).where(Users.id_user == int(user_id))
    )
    user = result.scalar_one_or_none()

    if user is None:
        raise credentials_exception

    return user

@router.get("/me")
def get_me(current_user: Users = Depends(get_current_user)):
    return {
        "id_user": current_user.id_user,
        "nom": current_user.nom,
        "prenom": current_user.prenom,
        "email": current_user.email,
        "role": current_user.role,
        "date_inscription":current_user.date_inscription
    }

@router.post("/verifier_mtp")
async def verifymtp(data:ChangePassword,current_user: Users = Depends(get_current_user)):
    if not verify_password(data.password_current, current_user.hashed_password):
        raise HTTPException(
            status_code=400,detail="Mot de passe incorrect"
        )
    return {
            "message":
            "Mot de passe correct"
    }

@router.put("/update_patient/{patient_id}")
async def update_p(patient_id:int,update:PatientUpdate,db:AsyncSession= Depends(get_db)):
    result = await db.execute(
        select(Patient).where(Patient.id_pat == patient_id)
    )
    db_patient = result.scalar_one_or_none()

    if not db_patient:
        raise HTTPException(status_code=404,detail="Patient not found")

    update_pa = await update_patient(db,db_patient,update)
    return update_pa

@router.put("/update_user/{user_id}")
async def update_u(user_id: int,update:UserUpdate,db:AsyncSession=Depends(get_db)):
    result = await db.execute(
        select(Users).where(Users.id_user == user_id)
    )
    db_user = result.scalar_one_or_none()
    if not db_user:
        raise HTTPException(status_code=404,detail="User not found")

    db_user.nom = update.nom
    db_user.prenom = update.prenom
    db_user.email = update.email
    db_user.role = update.role

    if update.password:
        db_user.hashed_password = hash_password(update.password)

    update_us = await update_user(db,db_user,update)
    return update_us