from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import date, time
from enum import Enum

# Enums
class GenderType(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class AppointmentStatus(str, Enum):
    PENDING = "pending"
    ATTENDED = "attended"
    CANCELLED_BY_PATIENT = "cancelled_by_patient" 
    CANCELLED_BY_DOCTOR = "cancelled_by_doctor"

class DayOfWeek(str, Enum):
    MONDAY = "monday"
    TUESDAY = "tuesday"
    WEDNESDAY = "wednesday"
    THURSDAY = "thursday"
    FRIDAY = "friday"
    SATURDAY = "saturday"
    SUNDAY = "sunday"

class ApprovalStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

# Request Models
class PatientProfileCreate(BaseModel):
    first_name: str
    last_name: str
    dpi: str
    gender: GenderType
    address: str
    phone: str
    birth_date: date
    photo_url: Optional[str] = None

class DoctorProfileCreate(BaseModel):
    first_name: str
    last_name: str
    dpi: str
    gender: GenderType
    birth_date: date
    address: str
    phone: str
    photo_url: str
    license_number: str
    specialty_id: str
    clinic_address: str

class DoctorScheduleCreate(BaseModel):
    day: DayOfWeek
    start_time: time
    end_time: time

class AppointmentCreate(BaseModel):
    doctor_id: str
    appointment_date: date
    appointment_time: time
    reason: str

class TreatmentUpdate(BaseModel):
    treatment_text: str

# Response Models
class SuccessResponse(BaseModel):
    success: bool
    message: Optional[str] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str

class PatientProfile(BaseModel):
    id: str
    first_name: str
    last_name: str
    dpi: str
    gender: GenderType
    address: str
    phone: str
    birth_date: date
    photo_url: Optional[str] = None
    approval_status: ApprovalStatus
    created_at: str
    updated_at: str

class Specialty(BaseModel):
    id: str
    name: str

class DoctorProfile(BaseModel):
    id: str
    first_name: str
    last_name: str
    dpi: str
    gender: GenderType
    birth_date: date
    address: str
    phone: str
    photo_url: str
    license_number: str
    specialty_id: str
    clinic_address: str
    approval_status: ApprovalStatus
    created_at: str
    updated_at: str
    specialty: Optional[Specialty] = None

class DoctorSchedule(BaseModel):
    id: str
    doctor_id: str
    day: DayOfWeek
    start_time: str
    end_time: str

class TimeSlot(BaseModel):
    available_slot: str

class Appointment(BaseModel):
    id: str
    patient_id: str
    doctor_id: str
    appointment_date: date
    appointment_time: str
    reason: str
    treatment: Optional[str] = None
    status: AppointmentStatus
    created_at: str
    updated_at: str

class DoctorBrief(BaseModel):
    id: str
    first_name: str
    last_name: str
    specialty: str
    clinic_address: str
    photo_url: str

class MostActiveDoctorReport(BaseModel):
    doctor_id: str
    doctor_name: str
    specialty: str
    attended_count: int

class DemandedSpecialtyReport(BaseModel):
    specialty: str
    appointment_count: int