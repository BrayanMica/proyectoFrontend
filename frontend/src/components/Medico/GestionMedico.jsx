import React, { useState, useEffect } from 'react';
import '../Dashboard.css';

const GestionMedico = ({ supabase, session }) => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCitasPendientes() {
      try {
        setLoading(true);

        // Consulta para obtener citas pendientes
        const { data, error } = await supabase
          .from('citas')
          .select('fecha, hora, nombre_completo, motivo')
          .eq('medico_id', session.user.id) // Asumiendo que tienes un campo medico_id
          .eq('estado', 'pendiente') // Asumiendo que las citas tienen un campo de estado
          .order('fecha', { ascending: false }); // Ordenar por fecha más reciente

        if (error) {
          console.error('Error obteniendo citas:', error);
        } else {
          setCitas(data);
        }
      } catch (error) {
        console.error('Error al recuperar citas:', error);
      } finally {
        setLoading(false);
      }
    }

    getCitasPendientes();
  }, [supabase, session]);

  return (
    <div className="gestion-medico-container">
      <h1>Citas Pendientes</h1>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando citas...</p>
        </div>
      ) : (
        <table className="citas-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita, index) => (
              <tr key={index}>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>{cita.nombre_completo}</td>
                <td>{cita.motivo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GestionMedico;
