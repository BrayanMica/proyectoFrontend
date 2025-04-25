import React from 'react';
import { Alert, Image } from 'react-bootstrap';
import './css/ViewDoctors.css';

const ViewDoctors = ({ approvedDoctors, handleDeactivate, defaultAvatar }) => {
  // Función auxiliar para manejar el clic en el botón
  const onDeactivateClick = (doctorId) => {
    console.log('Solicitando dar de baja al médico con ID:', doctorId);
    handleDeactivate(doctorId);
  };

  return (
    <div className="view-doctors-container">
      <h3>Médicos Aprobados</h3>
      {approvedDoctors.length === 0 ? (
        <Alert variant="info">No hay médicos aprobados en el sistema</Alert>
      ) : (
        <div className="table-responsive">
          <table className="view-doctors-table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre Completo</th>
                <th>DPI</th>
                <th>Género</th>
                <th>Especialidad</th>
                <th>No. Colegiado</th>
                <th>Correo Electrónico</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {approvedDoctors.map(doctor => (
                <tr key={doctor.id}>
                  <td data-label="Foto">
                    <Image src={doctor.photo_url || defaultAvatar} roundedCircle className="doctor-avatar" width={50} height={50} />
                  </td>
                  <td data-label="Nombre Completo">
                    <div className="doctor-info">{`${doctor.first_name} ${doctor.last_name}`}</div>
                  </td>
                  <td data-label="DPI">{doctor.dpi}</td>
                  <td data-label="Género">{doctor.gender}</td>
                  <td data-label="Especialidad">{doctor.specialty?.name || doctor.specialty_id}</td>
                  <td data-label="No. Colegiado">{doctor.license_number}</td>
                  <td data-label="Correo Electrónico">{doctor.email}</td>
                  <td data-label="Acciones">
                    <button 
                      className="btn deactivate-btn" 
                      onClick={() => onDeactivateClick(doctor.id)}
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

export default ViewDoctors;