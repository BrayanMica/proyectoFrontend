import React, { useState, useEffect } from 'react';
import { Form, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { FaFilePdf, FaChartBar, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import './css/GenerateReports.css';

// Importar el servicio para obtener datos reales
import { getReportData } from './api/userServices';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: { 
    padding: 30,
    backgroundColor: '#FFFFFF' 
  },
  title: { 
    fontSize: 22, 
    marginBottom: 15, 
    textAlign: 'center', 
    color: '#1A3B72',
    fontWeight: 'bold'
  },
  subtitle: { 
    fontSize: 14, 
    marginBottom: 25, 
    textAlign: 'center', 
    color: '#555555'
  },
  table: { 
    display: 'table', 
    width: '100%', 
    borderStyle: 'solid', 
    borderWidth: 1, 
    borderColor: '#E3E9F3',
    borderRadius: 4,
    marginBottom: 15
  },
  tableRow: { 
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E9F3',
    borderBottomStyle: 'solid',
    height: 35,
    alignItems: 'center'
  },
  tableColHeader: { 
    width: '33.33%', 
    backgroundColor: '#F1F5FD', 
    padding: 8, 
    fontWeight: 'bold',
    fontSize: 12,
    color: '#1A3B72'
  },
  tableColHeaderSpecialty: { 
    width: '50%', 
    backgroundColor: '#F1F5FD', 
    padding: 8, 
    fontWeight: 'bold',
    fontSize: 12,
    color: '#1A3B72'
  },
  tableCol: { 
    width: '33.33%', 
    padding: 8,
    fontSize: 10,
    color: '#495057'
  },
  tableColSpecialty: { 
    width: '50%', 
    padding: 8,
    fontSize: 10,
    color: '#495057'
  },
  footer: { 
    position: 'absolute', 
    bottom: 30, 
    left: 30, 
    right: 30, 
    textAlign: 'center', 
    fontSize: 10, 
    color: '#6C757D',
    borderTopWidth: 1,
    borderTopColor: '#E3E9F3',
    borderTopStyle: 'solid',
    paddingTop: 10
  },
  headerLogo: {
    position: 'absolute',
    top: 20,
    left: 30,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E7BFA'
  },
  headerDate: {
    position: 'absolute',
    top: 20,
    right: 30,
    fontSize: 10,
    color: '#6C757D'
  }
});

// Componente PDF para médicos con más pacientes
const DoctorsPDF = ({ data, title }) => {
  const today = new Date().toLocaleDateString();
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.headerLogo}>SaludPlus</Text>
        <Text style={styles.headerDate}>Fecha: {today}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Reporte generado el {today}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Médico</Text>
            <Text style={styles.tableColHeader}>Especialidad</Text>
            <Text style={styles.tableColHeader}>Cantidad de Pacientes</Text>
          </View>
          {data.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCol}>{item.doctor}</Text>
              <Text style={styles.tableCol}>{item.specialty}</Text>
              <Text style={styles.tableCol}>{item.patients}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.footer}>SaludPlus - Reporte de Actividad - Página 1 de 1</Text>
      </Page>
    </Document>
  );
};

// Componente PDF para especialidades con más citas
const SpecialtiesPDF = ({ data, title }) => {
  const today = new Date().toLocaleDateString();
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.headerLogo}>SaludPlus</Text>
        <Text style={styles.headerDate}>Fecha: {today}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Reporte generado el {today}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeaderSpecialty}>Especialidad</Text>
            <Text style={styles.tableColHeaderSpecialty}>Cantidad de Citas</Text>
          </View>
          {data.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableColSpecialty}>{item.specialty}</Text>
              <Text style={styles.tableColSpecialty}>{item.appointments}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.footer}>SaludPlus - Reporte de Actividad - Página 1 de 1</Text>
      </Page>
    </Document>
  );
};

// Componente modificado para usar los endpoints específicos y datos reales de Supabase
const GenerateReports = ({ supabase, reportType: initialReportType, setReportType: parentSetReportType, reportData: initialReportData }) => {
  // Usamos estado local pero sincronizamos con los props del padre si están disponibles
  const [reportType, setLocalReportType] = useState(initialReportType || 'doctorsWithMostPatients');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [isPdfReady, setIsPdfReady] = useState(false);
  
  // Función para actualizar el tipo de reporte y notificar al padre si es necesario
  const handleReportTypeChange = (type) => {
    setLocalReportType(type);
    if (parentSetReportType) {
      parentSetReportType(type);
    }
  };

  // Título del reporte según el tipo
  const getReportTitle = () => {
    return reportType === 'doctorsWithMostPatients'
      ? 'Médicos con Mayor Número de Pacientes'
      : 'Especialidades con Mayor Número de Citas';
  };
  
  // Nombre del archivo PDF según el tipo de reporte
  const getPdfFileName = () => {
    return reportType === 'doctorsWithMostPatients'
      ? 'medicos_con_mas_pacientes.pdf'
      : 'especialidades_con_mas_citas.pdf';
  };
  
  // Endpoint según el tipo de reporte
  const getEndpointName = () => {
    return reportType === 'doctorsWithMostPatients'
      ? '/admin/reports/most-active-doctors'
      : '/admin/reports/most-demanded-specialties';
  };

  // Cargar datos del reporte cuando cambia el tipo o el límite
  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      setError(null);
      setIsPdfReady(false);
      
      // Verificar si tenemos la instancia de Supabase
      if (!supabase) {
        setError('No se pudo establecer conexión con la base de datos. Por favor, intente más tarde.');
        setLoading(false);
        return;
      }
      
      try {
        const endpoint = getEndpointName();
        console.log(`Obteniendo datos para reporte desde: ${endpoint} con límite: ${limit}`);
        
        // Obtenemos los datos reales desde Supabase
        const data = await getReportData(supabase, reportType, limit);
        console.log('Datos obtenidos:', data);
        
        // Verificamos que tengamos datos válidos
        if (!data || data.length === 0) {
          setError('No se encontraron datos para este tipo de reporte. Por favor, intente con otro tipo o límite.');
          setReportData([]);
        } else {
          setReportData(data);
          setIsPdfReady(true);
        }
      } catch (err) {
        console.error('Error al obtener datos del reporte:', err);
        setError('Error al cargar los datos del reporte: ' + (err.message || 'Error desconocido'));
        setReportData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [reportType, limit, supabase]);

  return (
    <div className="reports-container">
      <h3>
        <FaChartBar className="me-2" style={{ verticalAlign: 'middle' }} />
        Reportes Estadísticos
      </h3>
      
      <div className="report-controls">
        <Form.Group className="mb-3">
          <Form.Label>Seleccione el tipo de reporte:</Form.Label>
          <Form.Select 
            value={reportType} 
            onChange={(e) => handleReportTypeChange(e.target.value)}
            disabled={loading}
          >
            <option value="doctorsWithMostPatients">Médicos que más pacientes han atendido</option>
            <option value="specialtiesWithMostAppointments">Especialidades con más citas generadas</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-0">
          <Form.Label>Número de resultados a mostrar:</Form.Label>
          <Form.Control 
            type="number" 
            min="1" 
            max="100" 
            value={limit} 
            onChange={(e) => setLimit(parseInt(e.target.value) || 10)}
            disabled={loading}
          />
        </Form.Group>
      </div>

      {error && (
        <Alert variant="danger" className="d-flex align-items-center">
          <FaExclamationTriangle className="me-2" />
          {error}
        </Alert>
      )}

      <Card className="card">
        <Card.Header as="h5" className="card-header d-flex justify-content-between align-items-center">
          {getReportTitle()}
          {isPdfReady && (
            <span className="badge bg-primary d-none d-md-inline-block">
              {reportData.length} {reportData.length === 1 ? 'registro' : 'registros'}
            </span>
          )}
        </Card.Header>
        <Card.Body className="card-body">
          {loading ? (
            <div className="spinner-container">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
              <p className="spinner-text">Cargando datos del reporte...</p>
            </div>
          ) : reportData.length === 0 ? (
            <Alert variant="info" className="d-flex align-items-center">
              <FaInfoCircle className="me-2" />
              No hay datos disponibles para este reporte.
            </Alert>
          ) : (
            <>
              <div className="table-container">
                <table className="table table-striped">
                  <thead className="table-header">
                    <tr>
                      {reportType === 'doctorsWithMostPatients' ? (
                        <>
                          <th>Médico</th>
                          <th>Especialidad</th>
                          <th className="text-center">Cantidad de Pacientes</th>
                        </>
                      ) : (
                        <>
                          <th>Especialidad</th>
                          <th className="text-center">Cantidad de Citas</th>
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
                            <td className="text-center fw-bold">{item.patients}</td>
                          </>
                        ) : (
                          <>
                            <td>{item.specialty}</td>
                            <td className="text-center fw-bold">{item.appointments}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="export-buttons">
                {isPdfReady ? (
                  reportType === 'doctorsWithMostPatients' ? (
                    <PDFDownloadLink 
                      document={<DoctorsPDF data={reportData} title={getReportTitle()} />} 
                      fileName={getPdfFileName()}
                      className="btn btn-primary pdf-link"
                    >
                      {({ loading, error }) => 
                        loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Preparando PDF...
                          </>
                        ) : error ? (
                          <>
                            <FaExclamationTriangle className="me-2" />
                            Error al generar PDF
                          </>
                        ) : (
                          <>
                            <FaFilePdf className="me-2" />
                            Exportar a PDF
                          </>
                        )
                      }
                    </PDFDownloadLink>
                  ) : (
                    <PDFDownloadLink 
                      document={<SpecialtiesPDF data={reportData} title={getReportTitle()} />} 
                      fileName={getPdfFileName()}
                      className="btn btn-primary pdf-link"
                    >
                      {({ loading, error }) => 
                        loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Preparando PDF...
                          </>
                        ) : error ? (
                          <>
                            <FaExclamationTriangle className="me-2" />
                            Error al generar PDF
                          </>
                        ) : (
                          <>
                            <FaFilePdf className="me-2" />
                            Exportar a PDF
                          </>
                        )
                      }
                    </PDFDownloadLink>
                  )
                ) : (
                  <Button variant="primary" disabled>
                    <FaFilePdf className="me-2" />
                    Exportar a PDF
                  </Button>
                )}
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default GenerateReports;