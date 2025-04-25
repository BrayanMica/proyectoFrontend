import React from 'react';
import { Alert, Image } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import './css/AcceptDoctors.css';

const AcceptDoctors = ({ pendingDoctors, handleAccept, handleReject, defaultAvatar }) => (
  <div className="accept-doctors-container">
    <h3>Médicos Pendientes de Aprobación</h3>
    {pendingDoctors?.length === 0 ? (
      <Alert variant="info">No hay médicos pendientes de aprobación</Alert>
    ) : (
      <div className="table-responsive">
        <table className="accept-doctors-table">
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
            {pendingDoctors?.map(doctor => (
              <tr key={doctor.id}>
                <td data-label="Foto">
                  <Image 
                    src={doctor.photo_url || defaultAvatar} 
                    roundedCircle 
                    className="avatar-img" 
                    width={50} 
                    height={50} 
                    alt={`${doctor.first_name} ${doctor.last_name}`}
                  />
                </td>
                <td data-label="Nombre Completo">{`${doctor.first_name} ${doctor.last_name}`}</td>
                <td data-label="DPI">{doctor.dpi}</td>
                <td data-label="Género">{doctor.gender}</td>
                <td data-label="Especialidad">{doctor.specialty?.name || doctor.specialty_id}</td>
                <td data-label="No. Colegiado">{doctor.license_number}</td>
                <td data-label="Correo Electrónico">{doctor.email}</td>
                <td data-label="Acciones" className="action-buttons-cell">
                  <div className="action-buttons">
                    <button 
                      className="btn accept-btn" 
                      onClick={() => handleAccept(doctor.id)}
                      aria-label="Aceptar médico"
                    >
                      <FaCheck /> Aceptar
                    </button>
                    <button 
                      className="btn reject-btn" 
                      onClick={() => handleReject(doctor.id)}
                      aria-label="Rechazar médico"
                    >
                      <FaTimes /> Rechazar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default AcceptDoctors;