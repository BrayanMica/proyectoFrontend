import React, { useState } from "react"

const horariosBase = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00"
]

const MedicosDisponibles = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [horariosOcupados, setHorariosOcupados] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [fechaCita, setFechaCita] = useState("")
  const [horaCita, setHoraCita] = useState("")
  const [motivo, setMotivo] = useState("")
  const [error, setError] = useState("")
  const [toast, setToast] = useState("")
  const [citasAgendadas, setCitasAgendadas] = useState([])

  const handleVerHorarios = (doctor) => {
    setSelectedDoctor(doctor)
    setSelectedDate("")
    setHorariosOcupados([])
    setShowForm(false)
  }

  const handleDateChange = (e) => {
    const fecha = e.target.value
    setSelectedDate(fecha)

    const diaSemana = new Date(fecha).getDay()
    if (diaSemana === 0 || diaSemana === 6) {
      setHorariosOcupados(null)
    } else {
      const ocupadosDemo = fecha === "2025-04-10"
        ? ["09:00", "11:00"]
        : ["10:00", "14:00"]
      setHorariosOcupados(ocupadosDemo)
    }
  }

  const handleProgramarCita = () => {
    setError("")
    const dia = new Date(fechaCita).getDay()

    if (dia === 0 || dia === 5) {
      return setError("El médico no atiende los fines de semana.")
    }

    if (!horariosBase.includes(horaCita)) {
      return setError("Debe seleccionar una hora válida.")
    }

    const yaTieneCita = citasAgendadas.find(
      (cita) => cita.doctor === selectedDoctor
    )
    if (yaTieneCita) {
      return setError("Ya tienes una cita activa con este doctor.")
    }

    const yaOcupada = citasAgendadas.find(
      (cita) =>
        cita.doctor === selectedDoctor &&
        cita.fecha === fechaCita &&
        cita.hora === horaCita
    )
    if (yaOcupada) {
      return setError("La hora seleccionada ya está ocupada.")
    }

    const nuevaCita = {
      doctor: selectedDoctor,
      fecha: fechaCita,
      hora: horaCita,
      motivo
    }

    setCitasAgendadas([...citasAgendadas, nuevaCita])
    setFechaCita("")
    setHoraCita("")
    setMotivo("")
    setShowForm(false)
    setToast("Cita programada exitosamente.")
    setTimeout(() => setToast(""), 3000)
  }

  return (
    <>
      {/* TOAST NOTIFICACIÓN */}
      {toast && (
        <div className="toast-notificacion">
          <span>{toast}</span>
          <button className="toast-close-btn" onClick={() => setToast("")}>×</button>
        </div>
      )}

      <section className="medicos-section">
        {/* Lista de médicos */}
        <div className="card">
          <h2>Médicos Disponibles</h2>

          <div className="search-bar">
            <div className="search-input-wrapper">
              <input
                id="searchInput"
                type="text"
                placeholder="Ej. Cardiología"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                alt="Buscar"
              />
            </div>
          </div>

          <div className="doctor-list">
            <div className="doctor-card">
              <div className="doctor-info">
                <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="Médico" />
                <div className="doctor-text">
                  <h4>Dr. Ana Morales</h4>
                  <p className="direccion">Calle 123, Zona 10</p>
                  <p className="especialidad">Cardiología</p>
                </div>
              </div>
              <div className="card-buttons">
                <button onClick={() => handleVerHorarios("Ana Morales")}>Ver Horarios</button>
                <button onClick={() => {
                  setSelectedDoctor("Ana Morales")
                  setShowForm(true)
                }}>Programar Cita</button>
              </div>
            </div>

            <div className="doctor-card">
              <div className="doctor-info">
                <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="Médico" />
                <div className="doctor-text">
                  <h4>Dr. Luis Gómez</h4>
                  <p className="direccion">Avenida Reforma, Zona 9</p>
                  <p className="especialidad">Pediatría</p>
                </div>
              </div>
              <div className="card-buttons">
                <button onClick={() => handleVerHorarios("Luis Gómez")}>Ver Horarios</button>
                <button onClick={() => {
                  setSelectedDoctor("Luis Gómez")
                  setShowForm(true)
                }}>Programar Cita</button>
              </div>
            </div>
          </div>
        </div>

        {/* Horarios del médico */}
        {selectedDoctor && (
          <div className="horarios-card">
            <h3>Horarios del Dr. {selectedDoctor}</h3>
            <p><strong>Días de atención:</strong> Lunes a Viernes</p>
            <p><strong>Horario:</strong> 8:00 a.m. - 4:00 p.m.</p>
            <p><strong>Seleccione una fecha:</strong></p>
            <input type="date" value={selectedDate} onChange={handleDateChange} />
            <p><strong>Disponibilidad:</strong></p>

            {horariosOcupados === null ? (
              <p style={{ color: "red" }}>El médico no atiende este día</p>
            ) : selectedDate ? (
              <ul>
                {horariosBase.map((hora) => (
                  <li
                    key={hora}
                    style={{
                      backgroundColor: horariosOcupados.includes(hora)
                        ? "#ddd" : "#d4f7dc",
                      color: horariosOcupados.includes(hora)
                        ? "#333" : "#14532d",
                      borderRadius: "6px",
                      marginBottom: "5px",
                      padding: "0.4rem 0.6rem"
                    }}
                  >
                    {hora} - {horariosOcupados.includes(hora) ? "Ocupado" : "Disponible"}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontStyle: "italic" }}>Seleccione una fecha</p>
            )}
          </div>
        )}

        {/* Formulario de cita */}
        {selectedDoctor && showForm && (
          <div className="programar-cita-card">
            <h3>Programar cita con el Dr. {selectedDoctor}</h3>

            <label>Fecha:</label>
            <input type="date" value={fechaCita} onChange={(e) => setFechaCita(e.target.value)} />

            <label>Hora:</label>
            <select value={horaCita} onChange={(e) => setHoraCita(e.target.value)}>
              <option value="">Seleccionar hora</option>
              {horariosBase.map((hora) => (
                <option key={hora} value={hora}>{hora}</option>
              ))}
            </select>

            <label>Motivo de la cita:</label>
            <textarea
              rows="3"
              placeholder="Describa brevemente el motivo o sus síntomas"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={handleProgramarCita}>Confirmar Cita</button>
          </div>
        )}
      </section>
    </>
  )
}

export default MedicosDisponibles
