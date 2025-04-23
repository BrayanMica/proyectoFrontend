import React from 'react';
import { Table, Button, Alert, Image } from 'react-bootstrap';

const ViewDoctors = ({ approvedDoctors, handleDeactivate, defaultAvatar }) => (
  <>
    <h3>Médicos Aprobados</h3>
    {approvedDoctors.length === 0 ? (
      <Alert variant="info">No hay médicos aprobados en el sistema</Alert>
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
          {approvedDoctors.map(doctor => (
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
                <Button variant="warning" size="sm" onClick={() => handleDeactivate('doctor', doctor.id)}>
                  Dar de Baja
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </>
);

export default ViewDoctors;