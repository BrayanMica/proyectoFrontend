import React, { useState } from "react"
import "./DoctorApp.css"

const DoctorApp = () => {
  const [section, setSection] = useState("home")

  const user = {
    name: "Juan Pérez",
    email: "juanperez@email.com",
    nextAppointment: {
      doctor: "Dra. Ana Morales",
      date: "25 Mar 2025"
    }
  }

  return (
    <div className="dashboard">
      
    </div>
  )
}

export default DoctorApp
