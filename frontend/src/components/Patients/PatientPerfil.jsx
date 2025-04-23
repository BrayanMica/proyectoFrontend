// PatientPerfil.jsx
import React from "react"

const PatientPerfil = ({ user }) => {
    return (
        <section className="card profile-card">
            <h2>Ver y Actualizar Perfil</h2>
            <form className="profile-form">
                <input type="text" placeholder="Nombre" name="nombre" />
                <input type="text" placeholder="Apellido" name="apellido" />
                <input type="text" placeholder="DPI" name="dpi" />
                <select name="genero">
                    <option value="">Seleccione Género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
                <input type="text" placeholder="Dirección" name="direccion" />
                <input type="tel" placeholder="Teléfono" name="telefono" />
                <input type="date" placeholder="Fecha de nacimiento" name="fechaNacimiento" />

                <label className="upload-label">
                    Subir Fotografía (opcional)
                    <input type="file" accept="image/*" name="foto" />
                </label>

                <input
                    type="email"
                    value="{user.email}"
                    disabled
                    className="readonly"
                />

                <input
                    type="password"
                    placeholder="Contraseña nueva"
                    name="password"
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
                    title="Mínimo 8 caracteres, incluyendo una mayúscula, una minúscula y un número"
                    required
                />

                <button type="submit">Actualizar Perfil</button>
            </form>
        </section>
    )
}

export default PatientPerfil
