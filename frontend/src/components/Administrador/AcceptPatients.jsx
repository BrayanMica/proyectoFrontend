import React from 'react';
import { Alert, Image } from 'react-bootstrap';
import { FaUserCheck, FaUserTimes } from 'react-icons/fa';
import './css/AcceptPatients.css';

const AcceptPatients = ({ pendingPatients, handleAccept, handleReject, defaultAvatar }) => (
  <div className="accept-patients-container">
    <h3>Pacientes Pendientes de Aprobación</h3>
    {pendingPatients.length === 0 ? (
      <Alert variant="info">No hay pacientes pendientes de aprobación</Alert>
    ) : (
      <div className="table-responsive">
        <table className="accept-patients-table">
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
            {pendingPatients.map(patient => (
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
                <td data-label="Acciones" className="action-buttons-cell">
                  <div className="action-buttons">
                    <button className="btn accept-btn" onClick={() => handleAccept(patient.id)}>
                      <FaUserCheck /> Aceptar
                    </button>
                    <button className="btn reject-btn" onClick={() => handleReject(patient.id)}>
                      <FaUserTimes /> Rechazar
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

export default AcceptPatients;