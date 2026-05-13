from unittest import result

from fastapi import FastAPI,HTTPException,Depends
from fastapi.security import OAuth2PasswordRequestForm , OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, true
from sqlalchemy.ext.asyncio import AsyncSession
from database.database import SessionLocal, engine, Base
from models import Users, Patient, Admin, Diagnostic
from schemas.validation_mod import PatientRead, PredictRequest, PredictResponse, DiagnosticRead, DiagnosticCreate, \
    DiagnosticWithPatientAndUser
from auth.auth_handler import router as auth_router
from database.database import get_db
from ml.predict.predict import *
from crud.patient_crud import get_patient_user,get_patients, delete_patient
from crud.diagnostic_crud import get_diagnostics_by_patient, get_diagnostics, get_diagnostics_with_patient_and_user, \
    get_last_five_diagnostics, get_diagnostic_by_month, get_destribution_age, get_number_genre
from auth.auth_handler import get_current_user
app = FastAPI()
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login/")

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(auth_router, prefix="/auth", tags=["Auth"])

@app.post("/diagnostic/",response_model=DiagnosticRead)
async def create_diagnose(diagnose:DiagnosticCreate, db: AsyncSession = Depends(get_db),current_user: Users = Depends(get_current_user)):
    patient = await get_patient_user(db,current_user.id_user)
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    id_pat = patient.id_pat
    predict_data = PredictRequest(
        gender=diagnose.genre.value,
        age=diagnose.age,
        hypertension=diagnose.hypertension,
        heart_disease=diagnose.heart_disease,
        smoking_history=diagnose.smoking_history,
        bmi=diagnose.bmi,
        HbA1c_level=diagnose.HbA1c_level,
        blood_glucose_level=diagnose.blood_glucose_level
    )
    result = predict(predict_data)
    prediction = result["prediction"]
    proba = result["proba"]
    diagnostic_data = {
        "id_pat": id_pat,
        "genre": diagnose.genre.value,
        "age": diagnose.age,
        "hypertension": diagnose.hypertension,
        "heart_disease": diagnose.heart_disease,
        "smoking_history": diagnose.smoking_history,
        "bmi": diagnose.bmi,
        "HbA1c_level": diagnose.HbA1c_level,
        "blood_glucose_level": diagnose.blood_glucose_level,
        "prediction_result": prediction,
        "prediction_probability": proba
    }
    print(diagnostic_data)
    db_dia = Diagnostic(**diagnostic_data)
    print(db_dia)
    db.add(db_dia)
    await db.commit()
    await db.refresh(db_dia)
    return db_dia
@app.get("/patient/{patient_id}",response_model=PatientRead)
async def get_patient(patient_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Patient).where(Patient.id_pat == patient_id)
    )
    patient = result.scalar_one_or_none()
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@app.get("/patient_user/{user_id}",response_model=PatientRead)
async def get_patient(user_id: int, db: AsyncSession = Depends(get_db)):
    patient = await get_patient_user(db,user_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@app.get("/patients/",response_model=list[PatientRead])
async def get_pats(db: AsyncSession = Depends(get_db)):
    patients = await get_patients(db)
    if not patients:
        raise HTTPException(status_code=404, detail="Patients not found")
    return patients

@app.get("/diagnostics/",response_model=list[DiagnosticRead])
async def get_pats(db: AsyncSession = Depends(get_db)):
    diagnostics = await get_diagnostics(db)
    if not diagnostics:
        raise HTTPException(status_code=404, detail="Diagnostics not found")
    return diagnostics

@app.get('/last_five_diagnostic/',response_model=list[DiagnosticWithPatientAndUser])
async def get_last_five_diagnostic(db: AsyncSession = Depends(get_db)):
    diagnostics = await get_last_five_diagnostics(db)
    if not diagnostics:
        raise HTTPException(status_code=404, detail="Diagnostics not found")
    return [
        {
            "diagnostic":d,
            "patient":p,
            "user":u
        }
        for d,p,u in diagnostics
    ]

@app.post("/predict",response_model=PredictResponse)
async def get_predict(data: PredictRequest):
    return predict(data)

@app.get("/diagnostics_par/",response_model=list[DiagnosticWithPatientAndUser])
async def getdiagnostic_with_p(db: AsyncSession = Depends(get_db)):
    diagnostics = await get_diagnostics_with_patient_and_user(db)
    if not diagnostics:
        raise HTTPException(status_code=404, detail="Diagnostics not found")
    return [
        {
            "diagnostic":d,
            "patient":p,
            "user":u
        }
        for d,p, u in diagnostics
    ]

@app.get("/diagnostic/me",response_model=list[DiagnosticRead])
async def get_diagnostic(db: AsyncSession = Depends(get_db),current_user: Users = Depends(get_current_user)):
    patient  = await get_patient_user(db,current_user.id_user)
    if patient  is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    diagnostics = await get_diagnostics_by_patient(db,patient.id_pat)
    if not diagnostics:
        raise HTTPException(status_code=404, detail="Diagnostic not found")
    return diagnostics

@app.delete("/patient_s/{patient_id}/")
async def delete_patients(patient_id: int,db: AsyncSession = Depends(get_db)):
    deleted = await delete_patient(db,patient_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Patient not found")
    print("Le résultat de DELETE : ",deleted)
    return {
        "message":"Patient supprimé"
    }


@app.get('/nombre_test')
async def get_nombre_test(db: AsyncSession = Depends(get_db)):
    return await get_diagnostic_by_month(db)


@app.get('/distribution_age')
async def get_distribut_age(db: AsyncSession = Depends(get_db)):
    return await get_destribution_age(db)


@app.get('/get_number_genre')
async def get_number_genr(db: AsyncSession = Depends(get_db)):
    return await get_number_genre(db)