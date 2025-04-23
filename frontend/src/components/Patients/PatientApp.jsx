import React, { useState } from "react"
import PatientNavbar from "./PatientNavbar"
import PatientInicio from "./PatientInicio"
import PatientCitas from "./PatientCitas"
import PatientPerfil from "./PatientPerfil"
import "./PatientApp.css"

const PatientApp = () => {
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
      <PatientNavbar section={section} setSection={setSection} user={user} />

      <main className="dashboard-content">
        {section === "home" && <PatientInicio user={user} />}
        {(section === "citas" || section === "medicos") && (
          <PatientCitas section={section} />
        )}
        {section === "perfil" && <PatientPerfil />}
      </main>
    </div>
  )
}

export default PatientApp
