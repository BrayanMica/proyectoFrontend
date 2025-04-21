// PatientInicio.jsx
import React from "react"

const PatientInicio = ({ user }) => {
    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return "Buenos días"
        if (hour < 18) return "Buenas tardes"
        return "Buenas noches"
    }

    return (
        <section className="welcome-section card">
            <h2>{getGreeting()}</h2>
            <p>Esta es tu siguiente cita:</p>
            <div className="welcome-content">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                    alt="Doctor ilustración"
                />
                <div className="welcome-text">
                    <h3>Tu próxima cita:</h3>

                </div>
            </div>
        </section>
    )
}

export default PatientInicio