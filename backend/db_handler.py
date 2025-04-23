import httpx
import os
from typing import Dict, Any, Optional, List
from datetime import date, time

class DBHandler:
    def __init__(self):
        self.url = os.getenv("SUPABASE_URL")
        self.key = os.getenv("SUPABASE_ANON_KEY")
        print(f'inside initialization {self.url}')
        print(f'inside initialization {self.key}')
        # Create HTTPX client with Supabase headers
        self.client = httpx.AsyncClient(
            base_url=f"{self.url}/rest/v1",
            headers={
                "apikey": self.key,
                "Authorization": f"Bearer {self.key}",
                "Content-Type": "application/json",
                "Prefer": "return=representation"
            }
        )
    
    async def close(self):
        await self.client.aclose()
    
    # User Profile Methods
    async def create_patient_profile(self, user_id: str, profile_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new patient profile"""
        try:
            profile_data["id"] = user_id
            response = await self.client.post(
                "/patient_profiles",
                json=profile_data
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error creating patient profile: {str(e)}")
            raise
    
    async def create_doctor_profile(self, user_id: str, profile_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new doctor profile"""
        try:
            profile_data["id"] = user_id
            response = await self.client.post(
                "/doctor_profiles",
                json=profile_data
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error creating doctor profile: {str(e)}")
            raise
    
    async def get_patient_profile(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get patient profile by user ID"""
        try:
            response = await self.client.get(
                "/patient_profiles",
                params={"id": f"eq.{user_id}", "select": "*"}
            )
            response.raise_for_status()
            profiles = response.json()
            return profiles[0] if profiles else None
        except httpx.HTTPError as e:
            print(f"Error getting patient profile: {str(e)}")
            raise
    
    async def get_doctor_profile(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get doctor profile by user ID"""
        try:
            response = await self.client.get(
                "/doctor_profiles",
                params={"id": f"eq.{user_id}", "select": "*"}
            )
            response.raise_for_status()
            profiles = response.json()
            return profiles[0] if profiles else None
        except httpx.HTTPError as e:
            print(f"Error getting doctor profile: {str(e)}")
            raise
    
    # Specialty Methods
    async def get_specialties(self) -> List[Dict[str, Any]]:
        """Get all specialties"""
        try:
            response = await self.client.get(
                "/specialties",
                params={"select": "*", "order": "name.asc"}
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error getting specialties: {str(e)}")
            raise
    
    # Doctor Schedule Methods
    async def create_doctor_schedule(self, doctor_id: str, schedule_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new doctor schedule"""
        try:
            schedule_data["doctor_id"] = doctor_id
            response = await self.client.post(
                "/doctor_schedules",
                json=schedule_data
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error creating doctor schedule: {str(e)}")
            raise
    
    async def get_doctor_schedules(self, doctor_id: str) -> List[Dict[str, Any]]:
        """Get all schedules for a doctor"""
        try:
            response = await self.client.get(
                "/doctor_schedules",
                params={"doctor_id": f"eq.{doctor_id}", "select": "*"}
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error getting doctor schedules: {str(e)}")
            raise
    
    # Appointment Methods
    async def create_appointment(self, patient_id: str, appointment_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new appointment"""
        try:
            appointment_data["patient_id"] = patient_id
            response = await self.client.post(
                "/appointments",
                json=appointment_data
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error creating appointment: {str(e)}")
            raise
    
    async def get_patient_appointments(self, patient_id: str) -> List[Dict[str, Any]]:
        """Get all appointments for a patient"""
        try:
            response = await self.client.get(
                "/appointments",
                params={
                    "patient_id": f"eq.{patient_id}", 
                    "select": "id,doctor_id,appointment_date,appointment_time,reason,treatment,status,doctor_profiles(first_name,last_name,specialty_id,specialties(name))"
                }
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error getting patient appointments: {str(e)}")
            raise
    
    async def get_doctor_appointments(self, doctor_id: str) -> List[Dict[str, Any]]:
        """Get all appointments for a doctor"""
        try:
            response = await self.client.get(
                "/appointments",
                params={
                    "doctor_id": f"eq.{doctor_id}", 
                    "select": "id,patient_id,appointment_date,appointment_time,reason,treatment,status,patient_profiles(first_name,last_name)"
                }
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error getting doctor appointments: {str(e)}")
            raise
    
    async def cancel_appointment_by_patient(self, appointment_id: str) -> Dict[str, Any]:
        """Cancel an appointment as a patient"""
        try:
            response = await self.client.post(
                "/rpc/cancel_appointment_by_patient",
                json={"appointment_id": appointment_id}
            )
            response.raise_for_status()
            return {"success": True, "appointment_id": appointment_id}
        except httpx.HTTPError as e:
            print(f"Error canceling appointment: {str(e)}")
            raise
    
    async def cancel_appointment_by_doctor(self, appointment_id: str) -> Dict[str, Any]:
        """Cancel an appointment as a doctor"""
        try:
            response = await self.client.post(
                "/rpc/cancel_appointment_by_doctor",
                json={"appointment_id": appointment_id}
            )
            response.raise_for_status()
            return {"success": True, "appointment_id": appointment_id}
        except httpx.HTTPError as e:
            print(f"Error canceling appointment: {str(e)}")
            raise
    
    async def attend_patient(self, appointment_id: str, treatment_text: str) -> Dict[str, Any]:
        """Mark appointment as attended with treatment notes"""
        try:
            response = await self.client.post(
                "/rpc/attend_patient",
                json={"appointment_id": appointment_id, "treatment_text": treatment_text}
            )
            response.raise_for_status()
            return {"success": True, "appointment_id": appointment_id}
        except httpx.HTTPError as e:
            print(f"Error attending patient: {str(e)}")
            raise
    
    # Approval Methods (Admin)
    async def approve_doctor(self, doctor_id: str) -> Dict[str, Any]:
        """Approve a doctor's profile"""
        try:
            response = await self.client.post(
                "/rpc/approve_doctor",
                json={"doctor_id": doctor_id}
            )
            response.raise_for_status()
            return {"success": True, "doctor_id": doctor_id}
        except httpx.HTTPError as e:
            print(f"Error approving doctor: {str(e)}")
            raise
    
    async def approve_patient(self, patient_id: str) -> Dict[str, Any]:
        """Approve a patient's profile"""
        try:
            response = await self.client.post(
                "/rpc/approve_patient",
                json={"patient_id": patient_id}
            )
            response.raise_for_status()
            return {"success": True, "patient_id": patient_id}
        except httpx.HTTPError as e:
            print(f"Error approving patient: {str(e)}")
            raise
    
    async def get_pending_doctors(self) -> List[Dict[str, Any]]:
        """Get all doctors pending approval"""
        try:
            response = await self.client.get(
                "/doctor_profiles",
                params={
                    "approval_status": "eq.pending",
                    "select": "*,specialties(name)"
                }
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error getting pending doctors: {str(e)}")
            raise
    
    async def get_pending_patients(self) -> List[Dict[str, Any]]:
        """Get all patients pending approval"""
        try:
            response = await self.client.get(
                "/patient_profiles",
                params={"approval_status": "eq.pending", "select": "*"}
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error getting pending patients: {str(e)}")
            raise
    
    # Report Methods
    async def get_most_active_doctors(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get most active doctors report"""
        try:
            response = await self.client.post(
                "/rpc/get_most_active_doctors",
                json={"limit_count": limit}
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error getting most active doctors: {str(e)}")
            raise
    
    async def get_most_demanded_specialties(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get most demanded specialties report"""
        try:
            response = await self.client.post(
                "/rpc/get_most_demanded_specialties",
                json={"limit_count": limit}
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error getting most demanded specialties: {str(e)}")
            raise
            
    async def get_available_time_slots(self, doctor_id: str, date_str: str) -> List[Dict[str, Any]]:
        """Get available time slots for a doctor on a specific date"""
        try:
            response = await self.client.post(
                "/rpc/get_available_time_slots",
                json={"doctor_id": doctor_id, "date_to_check": date_str}
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error getting available time slots: {str(e)}")
            raise
            
    async def get_doctors_by_specialty(self, specialty_name: str) -> List[Dict[str, Any]]:
        """Get doctors by specialty name"""
        try:
            response = await self.client.post(
                "/rpc/get_doctors_by_specialty",
                json={"specialty_name": specialty_name}
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error getting doctors by specialty: {str(e)}")
            raise