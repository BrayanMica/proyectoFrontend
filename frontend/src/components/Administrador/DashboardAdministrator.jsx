import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Alert } from 'react-bootstrap';
import { FaUser, FaUserMd, FaChartBar } from 'react-icons/fa';
import AcceptDoctors from '../components/AcceptDoctors';
import AcceptPatients from '../components/AcceptPatients';
import ViewDoctors from '../components/ViewDoctors';
import ViewPatients from '../components/ViewPatients';
import GenerateReports from '../components/GenerateReports';
import RejectModal from '../components/RejectModal';
import apiService from '../services/apiService';

const Dashboard = () => {
  const defaultAvatar = "https://via.placeholder.com/50";

  const [key, setKey] = useState('pendingPatients');
  const [pendingPatients, setPendingPatients] = useState([]);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [approvedPatients, setApprovedPatients] = useState([]);
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [currentRejection, setCurrentRejection] = useState({ type: '', id: null });
  const [reportType, setReportType] = useState('doctorsWithMostPatients');
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para mostrar errores
  const handleApiError = (error) => {
    console.error('API Error:', error);
    setError('Ocurrió un error al comunicarse con el servidor.');
    setLoading(false);
  };

  // Cargar todos los datos
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Cargar datos en paralelo usando nuestro servicio de API
        const [
          pendingPatientsResult,
          pendingDoctorsResult,
          approvedPatientsResult,
          approvedDoctorsResult
        ] = await Promise.allSettled([
          apiService.getPendingPatients(),
          apiService.getPendingDoctors(),
          apiService.getApprovedPatients(),
          apiService.getApprovedDoctors()
        ]);

        // Procesar respuestas
        if (pendingPatientsResult.status === 'fulfilled') {
          setPendingPatients(pendingPatientsResult.value);
        }

        if (pendingDoctorsResult.status === 'fulfilled') {
          setPendingDoctors(pendingDoctorsResult.value);
        }

        if (approvedPatientsResult.status === 'fulfilled') {
          setApprovedPatients(approvedPatientsResult.value);
        }

        if (approvedDoctorsResult.status === 'fulfilled') {
          setApprovedDoctors(approvedDoctorsResult.value);
        }

        setLoading(false);
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchAllData();
  }, []);

  // Cargar datos de reportes
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        if (reportType === 'doctorsWithMostPatients') {
          const data = await apiService.getDoctorsWithMostPatientsReport();
          setReportData(data);
        } else if (reportType === 'specialtiesWithMostAppointments') {
          const data = await apiService.getSpecialtiesWithMostAppointmentsReport();
          setReportData(data);
        }
      } catch (error) {
        console.error('Error fetching report data:', error);
        // Usar datos de ejemplo para los reportes en caso de error
        if (reportType === 'doctorsWithMostPatients') {
          setReportData([
            { doctor: 'Dr. Miguel Soto', specialty: 'Neurología', patients: 2 },
            { doctor: 'Dra. Elena Castro', specialty: 'Dermatología', patients: 1 }
          ]);
        } else {
          setReportData([
            { specialty: 'Neurología', appointments: 3 },
            { specialty: 'Dermatología', appointments: 2 }
          ]);
        }
      }
    };

    fetchReportData();
  }, [reportType]);

  // Función para aceptar pacientes o médicos
  const handleAccept = async (type, id) => {
    try {
      if (type === 'patient') {
        await apiService.approvePatient(id);
        
        // Actualizar estado local después de aceptar
        const patientToAccept = pendingPatients.find(patient => patient.id === id);
        setPendingPatients(pendingPatients.filter(patient => patient.id !== id));
        setApprovedPatients([...approvedPatients, patientToAccept]);
      } else {
        await apiService.approveDoctor(id);
        
        // Actualizar estado local después de aceptar
        const doctorToAccept = pendingDoctors.find(doctor => doctor.id === id);
        setPendingDoctors(pendingDoctors.filter(doctor => doctor.id !== id));
        setApprovedDoctors([...approvedDoctors, doctorToAccept]);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  // Función para mostrar modal de rechazo
  const handleReject = (type, id) => {
    setCurrentRejection({ type, id });
    setShowRejectModal(true);
  };

  // Función para confirmar rechazo
  const confirmReject = async () => {
    const { type, id } = currentRejection;
    
    try {
      if (type === 'patient') {
        await apiService.rejectPatient(id, rejectReason);
        setPendingPatients(pendingPatients.filter(patient => patient.id !== id));
      } else {
        await apiService.rejectDoctor(id, rejectReason);
        setPendingDoctors(pendingDoctors.filter(doctor => doctor.id !== id));
      }
      
      setShowRejectModal(false);
      setRejectReason('');
    } catch (error) {
      handleApiError(error);
    }
  };

  // Función para dar de baja a usuarios
  const handleDeactivate = async (type, id) => {
    try {
      if (type === 'patient') {
        await apiService.deactivatePatient(id, 'Usuario dado de baja por el administrador');
        setApprovedPatients(approvedPatients.filter(patient => patient.id !== id));
      } else {
        await apiService.deactivateDoctor(id, 'Usuario dado de baja por el administrador');
        setApprovedDoctors(approvedDoctors.filter(doctor => doctor.id !== id));
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  // Si está cargando, mostrar mensaje
  if (loading) {
    return (
      <Container className="mt-4">
        <h1 className="mb-4">Panel de Administración</h1>
        <Alert variant="info">Cargando datos, por favor espere...</Alert>
      </Container>
    );
  }

  // Si hay error, mostrar mensaje
  if (error) {
    return (
      <Container className="mt-4">
        <h1 className="mb-4">Panel de Administración</h1>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Panel de Administración</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Tabs id="dashboard-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-4">
        <Tab eventKey="pendingPatients" title={<><FaUser /> Aceptar Pacientes</>}>
          <AcceptPatients
            pendingPatients={pendingPatients}
            handleAccept={handleAccept}
            handleReject={handleReject}
            defaultAvatar={defaultAvatar}
          />
        </Tab>
        <Tab eventKey="pendingDoctors" title={<><FaUserMd /> Aceptar Médicos</>}>
          <AcceptDoctors
            pendingDoctors={pendingDoctors}
            handleAccept={handleAccept}
            handleReject={handleReject}
            defaultAvatar={defaultAvatar}
          />
        </Tab>
        <Tab eventKey="approvedPatients" title={<><FaUser /> Ver Pacientes</>}>
          <ViewPatients
            approvedPatients={approvedPatients}
            handleDeactivate={handleDeactivate}
            defaultAvatar={defaultAvatar}
          />
        </Tab>
        <Tab eventKey="approvedDoctors" title={<><FaUserMd /> Ver Médicos</>}>
          <ViewDoctors
            approvedDoctors={approvedDoctors}
            handleDeactivate={handleDeactivate}
            defaultAvatar={defaultAvatar}
          />
        </Tab>
        <Tab eventKey="reports" title={<><FaChartBar /> Generar Reportes</>}>
          <GenerateReports
            reportType={reportType}
            setReportType={setReportType}
            reportData={reportData}
          />
        </Tab>
      </Tabs>
      <RejectModal
        show={showRejectModal}
        onHide={() => setShowRejectModal(false)}
        rejectReason={rejectReason}
        setRejectReason={setRejectReason}
        confirmReject={confirmReject}
      />
    </Container>
  );
};

export default Dashboard;