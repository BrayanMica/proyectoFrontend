import React, { useState } from "react"

const PatientNavbar = ({ section, setSection, user }) => {
    const [showCitasMenu, setShowCitasMenu] = useState(false)

    return (
        <header className="dashboard-navbar">
            <div className="navbar-left">
                <h1>SaludPlus | Paciente</h1>
            </div>

            <nav className="navbar-center">
                <button
                    className={section === "home" ? "active" : ""}
                    onClick={() => setSection("home")}
                >
                    Inicio
                </button>

                <div className="dropdown">
                    <button
                        className={["medicos", "citas"].includes(section) ? "active" : ""}
                        onClick={() => setShowCitasMenu(!showCitasMenu)}
                    >
                        Citas ▾
                    </button>
                    {showCitasMenu && (
                        <ul className="dropdown-menu">
                            <li onClick={() => { setSection("medicos"); setShowCitasMenu(false) }}>
                                Médicos Disponibles
                            </li>
                            <li onClick={() => { setSection("citas"); setShowCitasMenu(false) }}>
                                Citas e Historial
                            </li>
                        </ul>
                    )}
                </div>

                <button
                    className={section === "perfil" ? "active" : ""}
                    onClick={() => setSection("perfil")}
                >
                    Perfil
                </button>
            </nav>

            <div className="navbar-right">
                <div className="user-info">
                    <span>{user.name}</span>
                    <span className="email">{user.email}</span>
                </div>
                <button className="logout-btn" title="Cerrar sesión">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
                        alt="Cerrar sesión"
                    />
                </button>
            </div>
        </header>
    )
}

export default PatientNavbar
