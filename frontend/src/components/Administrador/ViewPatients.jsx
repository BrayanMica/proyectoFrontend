import React from 'react';
import { Alert, Image } from 'react-bootstrap';
import './css/ViewPatients.css';

const ViewPatients = ({ approvedPatients, handleDeactivate, defaultAvatar }) => {
  // Función auxiliar para manejar el clic en el botón
  const onDeactivateClick = (patientId) => {
    console.log('Solicitando dar de baja al paciente con ID:', patientId);
    handleDeactivate(patientId);
  };

  return (
    <div className="view-patients-container">
      <h3>Pacientes Aprobados</h3>
      {approvedPatients.length === 0 ? (
        <Alert variant="info">No hay pacientes aprobados en el sistema</Alert>
      ) : (
        <div className="table-responsive">
          <table className="view-patients-table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre Completo</th>
                <th>DPI</th>
                <th>Género</th>
                <th>Fecha de Nacimiento</th>
                <th>Correo Electrónico</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {approvedPatients.map(patient => (
                <tr key={patient.id}>
                  <td data-label="Foto">
                    <Image src={patient.photo_url || defaultAvatar} roundedCircle className="avatar-img" width={50} height={50} />
                  </td>
                  <td data-label="Nombre Completo">
                    <div className="patient-info">{`${patient.first_name} ${patient.last_name}`}</div>
                  </td>
                  <td data-label="DPI">{patient.dpi}</td>
                  <td data-label="Género">{patient.gender}</td>
                  <td data-label="Fecha de Nacimiento">{new Date(patient.birth_date).toLocaleDateString()}</td>
                  <td data-label="Correo Electrónico">{patient.email}</td>
                  <td data-label="Acciones">
                    <button 
                      className="deactivate-btn" 
                      onClick={() => onDeactivateClick(patient.id)}
                    >
                      Dar de Baja
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewPatients;