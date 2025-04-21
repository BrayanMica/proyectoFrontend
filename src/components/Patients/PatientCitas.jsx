// components/PatientCitas.jsx
import React from "react"
import MedicosDisponibles from "./Functions/MedicosDisponibles"
import CitasHistorial from "./Functions/CitasHistorial"

const PatientCitas = ({ section }) => {
  return (
    <>
      {section === "medicos" && <MedicosDisponibles />}
      {section === "citas" && <CitasHistorial />}
    </>
  )
}

export default PatientCitas