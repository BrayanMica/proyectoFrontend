import React from 'react';
import { Table, Button, Alert, Image } from 'react-bootstrap';

const ViewPatients = ({ approvedPatients, handleDeactivate, defaultAvatar }) => (
  <>
    <h3>Pacientes Aprobados</h3>
    {approvedPatients.length === 0 ? (
      <Alert variant="info">No hay pacientes aprobados en el sistema</Alert>
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
          {approvedPatients.map(patient => (
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
                <Button variant="warning" size="sm" onClick={() => handleDeactivate('patient', patient.id)}>
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

export default ViewPatients;