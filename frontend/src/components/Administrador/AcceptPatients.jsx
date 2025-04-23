import React from 'react';
import { Table, Button, Alert, Image } from 'react-bootstrap';
import { FaUserCheck, FaUserTimes } from 'react-icons/fa';

const AcceptPatients = ({ pendingPatients, handleAccept, handleReject, defaultAvatar }) => (
  <>
    <h3>Pacientes Pendientes de Aprobación</h3>
    {pendingPatients.length === 0 ? (
      <Alert variant="info">No hay pacientes pendientes de aprobación</Alert>
    ) : (
      <Table striped bordered hover responsive>
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
              <td>
                <Image src={patient.photo_url || defaultAvatar} roundedCircle width={50} height={50} />
              </td>
              <td>{`${patient.first_name} ${patient.last_name}`}</td>
              <td>{patient.dpi}</td>
              <td>{patient.gender}</td>
              <td>{new Date(patient.birth_date).toLocaleDateString()}</td>
              <td>{patient.email}</td>
              <td>
                <Button variant="success" size="sm" className="me-2" onClick={() => handleAccept('patient', patient.id)}>
                  <FaUserCheck /> Aceptar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleReject('patient', patient.id)}>
                  <FaUserTimes /> Rechazar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </>
);

export default AcceptPatients;