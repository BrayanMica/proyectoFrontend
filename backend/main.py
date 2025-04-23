from fastapi import FastAPI, Depends, HTTPException, Query, Path
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os
from typing import List, Optional, Dict
import uvicorn
from datetime import date

from db_handler import DBHandler
from models import (
    PatientProfileCreate, DoctorProfileCreate, AppointmentCreate,
    DoctorScheduleCreate, TreatmentUpdate, SuccessResponse, ErrorResponse,
    PatientProfile, DoctorProfile, Appointment, DoctorSchedule, TimeSlot,
    DoctorBrief, MostActiveDoctorReport, DemandedSpecialtyReport, Specialty
)
from jwt_auth import JWTHandler, JWTBearer

# Create FastAPI app
app = FastAPI(
    title="SaludPlus API",
    description="API for SaludPlus healthcare platform",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up JWT security
JWT_SECRET = os.getenv('JWT_SECRET')
SUPABASE_URL = os.getenv('SUPABASE_URL')
print(f'this is {JWT_SECRET}')
print(f'this is {SUPABASE_URL}')
jwt_handler = JWTHandler(JWT_SECRET, SUPABASE_URL)
security = JWTBearer()

# Auth dependencies
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict:
    return jwt_handler.verify_jwt(credentials.credentials)

async def get_current_user_id(current_user: Dict = Depends(get_current_user)) -> str:
    return current_user.get('sub')

async def get_admin_user_id(current_user: Dict = Depends(get_current_user)) -> str:
    # Check if the user has admin role in their claims
    is_admin = current_user.get('user_role') == 'admin'
    if not is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user.get('sub')

# Database handler dependency
async def get_db():
    db = DBHandler()
    try:
        yield db
    finally:
        await db.close()

# Routes
@app.get("/")
async def root():
    return {"message": "Welcome to SaludPlus API"}

# Patient Routes
@app.post("/patients/profile", response_model=PatientProfile)
async def create_patient_profile(
    profile: PatientProfileCreate,
    user_id: str = Depends(get_current_user_id),
    db: DBHandler = Depends(get_db)
):
    """Create a new patient profile for the current user"""
    try:
        result = await db.create_patient_profile(user_id, profile.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/patients/profile", response_model=PatientProfile)
async def get_patient_profile(
    user_id: str = Depends(get_current_user_id),
    db: DBHandler = Depends(get_db)
):
    """Get the patient profile for the current user"""
    profile = await db.get_patient_profile(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Patient profile not found")
    return profile

@app.get("/patients/appointments", response_model=List[Appointment])
async def get_patient_appointments(
    user_id: str = Depends(get_current_user_id),
    db: DBHandler = Depends(get_db)
):
    """Get all appointments for the current patient"""
    appointments = await db.get_patient_appointments(user_id)
    return appointments

@app.post("/patients/appointments", response_model=Appointment)
async def create_appointment(
    appointment: AppointmentCreate,
    user_id: str = Depends(get_current_user_id),
    db: DBHandler = Depends(get_db)
):
    """Create a new appointment for the current patient"""
    try:
        result = await db.create_appointment(user_id, appointment.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/patients/appointments/{appointment_id}/cancel", response_model=SuccessResponse)
async def cancel_patient_appointment(
    appointment_id: str = Path(..., description="The ID of the appointment to cancel"),
    user_id: str = Depends(get_current_user_id),
    db: DBHandler = Depends(get_db)
):
    """Cancel an appointment as a patient"""
    try:
        result = await db.cancel_appointment_by_patient(appointment_id)
        return {"success": True, "message": "Appointment cancelled successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Doctor Routes
@app.post("/doctors/profile", response_model=DoctorProfile)
async def create_doctor_profile(
    profile: DoctorProfileCreate,
    user_id: str = Depends(get_current_user_id),
    db: DBHandler = Depends(get_db)
):
    """Create a new doctor profile for the current user"""
    try:
        result = await db.create_doctor_profile(user_id, profile.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/doctors/profile", response_model=DoctorProfile)
async def get_doctor_profile(
    user_id: str = Depends(get_current_user_id),
    db: DBHandler = Depends(get_db)
):
    """Get the doctor profile for the current user"""
    profile = await db.get_doctor_profile(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Doctor profile not found")
    return profile

@app.get("/doctors/appointments", response_model=List[Appointment])
async def get_doctor_appointments(
    user_id: str = Depends(get_current_user_id),
    db: DBHandler = Depends(get_db)
):
    """Get all appointments for the current doctor"""
    appointments = await db.get_doctor_appointments(user_id)
    return appointments

@app.post("/doctors/schedules", response_model=DoctorSchedule)
async def create_doctor_schedule(
    schedule: DoctorScheduleCreate,
    user_id: str = Depends(get_current_user_id),
    db: DBHandler = Depends(get_db)
):
    """Create a new schedule for the current doctor"""
    try:
        result = await db.create_doctor_schedule(user_id, schedule.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/doctors/schedules", response_model=List[DoctorSchedule])
async def get_doctor_schedules(
    user_id: str = Depends(get_current_user_id),
    db: DBHandler = Depends(get_db)
):
    """Get all schedules for the current doctor"""
    schedules = await db.get_doctor_schedules(user_id)
    return schedules

@app.post("/doctors/appointments/{appointment_id}/attend", response_model=SuccessResponse)
async def attend_patient_appointment(
    treatment: TreatmentUpdate,
    appointment_id: str = Path(..., description="The ID of the appointment to attend"),
    user_id: str = Depends(get_current_user_id),
    db: DBHandler = Depends(get_db)
):
    """Mark an appointment as attended with treatment notes"""
    try:
        result = await db.attend_patient(appointment_id, treatment.treatment_text)
        return {"success": True, "message": "Patient attended successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/doctors/appointments/{appointment_id}/cancel", response_model=SuccessResponse)
async def cancel_doctor_appointment(
    appointment_id: str = Path(..., description="The ID of the appointment to cancel"),
    user_id: str = Depends(get_current_user_id),
    db: DBHandler = Depends(get_db)
):
    """Cancel an appointment as a doctor"""
    try:
        result = await db.cancel_appointment_by_doctor(appointment_id)
        return {"success": True, "message": "Appointment cancelled successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Common Routes
@app.get("/specialties", response_model=List[Specialty])
async def get_specialties(
    db: DBHandler = Depends(get_db)
):
    """Get all specialties"""
    specialties = await db.get_specialties()
    return specialties

@app.get("/doctors/by-specialty/{specialty_name}", response_model=List[DoctorBrief])
async def get_doctors_by_specialty(
    specialty_name: str = Path(..., description="The name of the specialty to filter by"),
    db: DBHandler = Depends(get_db)
):
    """Get all doctors by specialty"""
    doctors = await db.get_doctors_by_specialty(specialty_name)
    return doctors

@app.get("/doctors/{doctor_id}/available-slots", response_model=List[TimeSlot])
async def get_available_time_slots(
    doctor_id: str = Path(..., description="The ID of the doctor"),
    date_str: str = Query(..., description="The date to check (YYYY-MM-DD)"),
    db: DBHandler = Depends(get_db)
):
    """Get available time slots for a doctor on a specific date"""
    slots = await db.get_available_time_slots(doctor_id, date_str)
    return slots

# Admin Routes
@app.get("/admin/pending-doctors", response_model=List[DoctorProfile])
async def get_pending_doctors(
    user_id: str = Depends(get_admin_user_id),
    db: DBHandler = Depends(get_db)
):
    """Get all doctors pending approval (admin only)"""
    doctors = await db.get_pending_doctors()
    return doctors

@app.get("/admin/pending-patients", response_model=List[PatientProfile])
async def get_pending_patients(
    user_id: str = Depends(get_admin_user_id),
    db: DBHandler = Depends(get_db)
):
    """Get all patients pending approval (admin only)"""
    patients = await db.get_pending_patients()
    return patients

@app.post("/admin/doctors/{doctor_id}/approve", response_model=SuccessResponse)
async def approve_doctor(
    doctor_id: str = Path(..., description="The ID of the doctor to approve"),
    user_id: str = Depends(get_admin_user_id),
    db: DBHandler = Depends(get_db)
):
    """Approve a doctor (admin only)"""
    try:
        result = await db.approve_doctor(doctor_id)
        return {"success": True, "message": "Doctor approved successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/admin/patients/{patient_id}/approve", response_model=SuccessResponse)
async def approve_patient(
    patient_id: str = Path(..., description="The ID of the patient to approve"),
    user_id: str = Depends(get_admin_user_id),
    db: DBHandler = Depends(get_db)
):
    """Approve a patient (admin only)"""
    try:
        result = await db.approve_patient(patient_id)
        return {"success": True, "message": "Patient approved successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/admin/reports/most-active-doctors", response_model=List[MostActiveDoctorReport])
async def get_most_active_doctors_report(
    limit: int = Query(10, description="Number of doctors to return"),
    user_id: str = Depends(get_admin_user_id),
    db: DBHandler = Depends(get_db)
):
    """Get most active doctors report (admin only)"""
    report = await db.get_most_active_doctors(limit)
    return report

@app.get("/admin/reports/most-demanded-specialties", response_model=List[DemandedSpecialtyReport])
async def get_most_demanded_specialties_report(
    limit: int = Query(10, description="Number of specialties to return"),
    user_id: str = Depends(get_admin_user_id),
    db: DBHandler = Depends(get_db)
):
    """Get most demanded specialties report (admin only)"""
    report = await db.get_most_demanded_specialties(limit)
    return report

# JWT Debug endpoint (for testing only, remove in production)
@app.get("/debug/token")
async def debug_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Debug endpoint to inspect token details (remove in production)"""
    return await jwt_handler.debug_token(credentials.credentials)



if __name__ == "__main__":
    # For local development
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)