// components/CitasHistorial.jsx
import React from "react"

const CitasHistorial = () => {
    return (
        <div className="grid-container">
            <section className="card">
                <h2>Citas Activas</h2>
                <ul className="appointment-list">
                    <li>
                        <span>Dr. Ana Morales - 25 Mar 2025</span>
                        <button className="cancel-btn">Cancelar</button>
                    </li>
                </ul>
            </section>

            <section className="card">
                <h2>Historial de Citas</h2>
                <ul className="appointment-list">
                    <li>Dr. Luis Gómez - 12 Feb 2025</li>
                    <li>Dra. Paola Ruiz - 5 Ene 2025</li>
                </ul>
            </section>
        </div>
    )
}

export default CitasHistorial
