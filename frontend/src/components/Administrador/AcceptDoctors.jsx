import React from 'react';
import { Table, Button, Alert, Image } from 'react-bootstrap';
import { FaUserCheck, FaUserTimes } from 'react-icons/fa';

const AcceptDoctors = ({ pendingDoctors, handleAccept, handleReject, defaultAvatar }) => (
  <>
    <h3>Médicos Pendientes de Aprobación</h3>
    {pendingDoctors.length === 0 ? (
      <Alert variant="info">No hay médicos pendientes de aprobación</Alert>
    ) : (
      <Table striped bordered hover responsive>
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
          {pendingDoctors.map(doctor => (
            <tr key={doctor.id}>
              <td>
                <Image src={doctor.photo_url || defaultAvatar} roundedCircle width={50} height={50} />
              </td>
              <td>{`${doctor.first_name} ${doctor.last_name}`}</td>
              <td>{doctor.dpi}</td>
              <td>{doctor.gender}</td>
              <td>{doctor.specialty?.name || doctor.specialty_id}</td>
              <td>{doctor.license_number}</td>
              <td>{doctor.email}</td>
              <td>
                <Button variant="success" size="sm" className="me-2" onClick={() => handleAccept('doctor', doctor.id)}>
                  <FaUserCheck /> Aceptar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleReject('doctor', doctor.id)}>
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

export default AcceptDoctors;