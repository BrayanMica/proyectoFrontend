import React from 'react';
import { Form, Card, Table, Button } from 'react-bootstrap';

const GenerateReports = ({ reportType, setReportType, reportData }) => (
  <>
    <h3>Reportes</h3>
    <Form.Group className="mb-4">
      <Form.Label>Seleccione el tipo de reporte:</Form.Label>
      <Form.Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
        <option value="doctorsWithMostPatients">Médicos que más pacientes han atendido</option>
        <option value="specialtiesWithMostAppointments">Especialidades con más citas generadas</option>
      </Form.Select>
    </Form.Group>

    <Card>
      <Card.Header as="h5">
        {reportType === 'doctorsWithMostPatients'
          ? 'Médicos con Mayor Número de Pacientes'
          : 'Especialidades con Mayor Número de Citas'}
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              {reportType === 'doctorsWithMostPatients' ? (
                <>
                  <th>Médico</th>
                  <th>Especialidad</th>
                  <th>Cantidad de Pacientes</th>
                </>
              ) : (
                <>
                  <th>Especialidad</th>
                  <th>Cantidad de Citas</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, index) => (
              <tr key={index}>
                {reportType === 'doctorsWithMostPatients' ? (
                  <>
                    <td>{item.doctor}</td>
                    <td>{item.specialty}</td>
                    <td>{item.patients}</td>
                  </>
                ) : (
                  <>
                    <td>{item.specialty}</td>
                    <td>{item.appointments}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" className="mt-3">
          Exportar a PDF
        </Button>
      </Card.Body>
    </Card>
  </>
);

export default GenerateReports;