from enum import Enum
from typing import Annotated,Literal
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from datetime import date, datetime


class Genre(str, Enum):
    Male = "Male"
    Female = "Female"


# User
class UserBase(BaseModel):
    nom: str
    prenom: str
    email: EmailStr
    role: str

class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id_user: int
    date_inscription:datetime
    model_config = ConfigDict(from_attributes=True)

class UserUpdate(UserBase):
    password:str

# Admin
class AdminBase(BaseModel):
    id_user: int


class AdminCreate(AdminBase):
    pass


class AdminRead(AdminBase):
    id_adm: int
    model_config = ConfigDict(from_attributes=True)


class AdminUpdate(BaseModel):
    id_user: int | None = None


# Patient
class PatientBase(BaseModel):
    age: int | None = None
    sexe: Literal["Homme", "Femme"] | None = None
    telephone: str | None = None

class PatientCreate(PatientBase):
    id_user: int


class PatientRead(PatientBase):
    id_pat: int
    id_user: int
    model_config = ConfigDict(from_attributes=True)


class PatientUpdate(BaseModel):
    age: int | None = None
    sexe: Literal["Homme", "Femme"] | None = None
    telephone: str | None = None

# Diagnostic
class DiagnosticInput(BaseModel):
    genre: Genre
    age: Annotated[int, Field(gt=0, lt=120)]
    hypertension: bool
    heart_disease: bool
    smoking_history: str
    bmi: float
    HbA1c_level: float
    blood_glucose_level: float


class DiagnosticCreate(DiagnosticInput):
    pass


class DiagnosticRead(DiagnosticInput):
    id_diagnose: int
    id_pat:int
    prediction_result: bool
    prediction_probability: float
    diagnostic_date: datetime
    model_config = ConfigDict(from_attributes=True)

class DiagnosticWithPatientAndUser(BaseModel):
    diagnostic: DiagnosticRead
    patient: PatientRead
    user: UserRead

    class Config:
        from_attributes = True

class DiagnosticUpdate(BaseModel):
    genre: Genre | None = None
    age: int | None = None
    hypertension: bool | None = None
    heart_disease: bool | None = None
    smoking_history: str | None = None
    bmi: float | None = None
    HbA1c_level: float | None = None
    blood_glucose_level: float | None = None
    prediction_result: bool | None = None
    prediction_probability: float | None = None
    diagnostic_date: date | None = None


class Token(BaseModel):
    access_token: str
    token_type: str
    message:str


class RegisterResponse(BaseModel):
    message: str
    user: UserRead


class PredictRequest(BaseModel):
    gender: Literal["Male", "Female"]
    age: int = Field(gt=0,lt=120)
    hypertension: bool
    heart_disease: bool
    smoking_history: Literal["never", "No Info", "current", "former", "ever", "not current"]
    bmi: float
    HbA1c_level: float
    blood_glucose_level: float

class PredictResponse(BaseModel):
    prediction:int
    label:str
    proba:float
    confidence:float



class ChangePassword(BaseModel):
    password_current: str
