import React, { useState, useEffect } from 'react';
import './css/DashboardAdmin.css';
// Importar los componentes necesarios
import AcceptPatients from './AcceptPatients';
import AcceptDoctors from './AcceptDoctors';
import ViewPatients from './ViewPatients';
import ViewDoctors from './ViewDoctors';
import GenerateReports from './GenerateReports';

// Importar los servicios de API
import {
  getUserProfile,
  getPendingPatients,
  getPendingDoctors,
  getApprovedPatients,
  getApprovedDoctors,
  updateUserStatus,
  getReportData
} from './api/userServices';

// This is the General Overlay 2 component shown after login
const Dashboard = ({ session, supabase, onSignOut }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSide, setActiveSide] = useState("overview");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDeactivate, setUserToDeactivate] = useState(null);
  
  // Datos para los componentes
  const [pendingPatients, setPendingPatients] = useState([]);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [approvedPatients, setApprovedPatients] = useState([]);
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [reportType, setReportType] = useState("doctorsWithMostPatients");
  const [reportData, setReportData] = useState([]);
  const defaultAvatar = "https://via.placeholder.com/50";

  // Cargar datos al iniciar el componente
  useEffect(() => {
    const initialize = async () => {
      try {
        // Intentar cargar el perfil del usuario (si existe la tabla)
        const userProfile = await getUserProfile(supabase, session.user.id);
        
        // Si no hay perfil, usar datos básicos de la sesión
        setUserDetails(userProfile || {
          id: session.user.id,
          email: session.user.email,
          role: 'admin'
        });
        
        // Cargar los datos necesarios para los componentes
        await loadAllData();
      } catch (error) {
        console.error('Error initializing data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [session, supabase]);

  // Función para cargar todos los datos
  const loadAllData = async () => {
    try {
      setLoading(true);
      console.log('Cargando todos los datos...');
      
      // Cargar pacientes pendientes
      const pendingPatientsData = await getPendingPatients(supabase);
      setPendingPatients(pendingPatientsData);
      console.log(`Pacientes pendientes cargados: ${pendingPatientsData.length}`);
      
      // Cargar médicos pendientes
      const pendingDoctorsData = await getPendingDoctors(supabase);
      setPendingDoctors(pendingDoctorsData);
      console.log(`Médicos pendientes cargados: ${pendingDoctorsData.length}`);
      
      // Cargar pacientes aprobados
      const approvedPatientsData = await getApprovedPatients(supabase);
      setApprovedPatients(approvedPatientsData);
      console.log(`Pacientes aprobados cargados: ${approvedPatientsData.length}`);
      
      // Cargar médicos aprobados
      const approvedDoctorsData = await getApprovedDoctors(supabase);
      setApprovedDoctors(approvedDoctorsData);
      console.log(`Médicos aprobados cargados: ${approvedDoctorsData.length}`);
      
      // Ya no cargamos datos de reportes aquí, se cargarán directamente en el componente
      console.log('Todos los datos cargados correctamente');
    } catch (error) {
      console.error('Error loading data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Manejar aceptación de usuarios
  const handleAccept = async (userType, userId) => {
    try {
      console.log(`Aceptando usuario: ${userType} con ID: ${userId}`);
      const success = await updateUserStatus(supabase, userId, 'approved', userType);
      
      if (success) {
        console.log('Usuario aceptado exitosamente');
        await loadAllData(); // Recargar datos si la actualización fue exitosa
      } else {
        console.error('Error al aceptar usuario');
        alert('Hubo un error al aceptar al usuario. Por favor intente nuevamente.');
      }
    } catch (error) {
      console.error('Error en handleAccept:', error);
      alert('Error al procesar la solicitud.');
    }
  };

  // Manejar rechazo de usuarios
  const handleReject = async (userType, userId) => {
    try {
      console.log(`Rechazando usuario: ${userType} con ID: ${userId}`);
      const success = await updateUserStatus(supabase, userId, 'rejected', userType);
      
      if (success) {
        console.log('Usuario rechazado exitosamente');
        await loadAllData(); // Recargar datos si la actualización fue exitosa
      } else {
        console.error('Error al rechazar usuario');
        alert('Hubo un error al rechazar al usuario. Por favor intente nuevamente.');
      }
    } catch (error) {
      console.error('Error en handleReject:', error);
      alert('Error al procesar la solicitud.');
    }
  };

  // Nueva función para solicitar confirmación
  const confirmDeactivate = (userType, userId) => {
    setUserToDeactivate({ type: userType, id: userId });
    setShowConfirmation(true);
    
    // También puedes usar una alerta estándar del navegador si prefieres
    const confirm = window.confirm(`¿Está seguro que desea dar de baja a este ${userType === 'patient' ? 'paciente' : 'médico'}?`);
    if (confirm) {
      handleDeactivateConfirmed();
    }
  };

  // Manejar desactivación después de confirmación
  const handleDeactivateConfirmed = async () => {
    if (!userToDeactivate) return;
    
    try {
      console.log(`Desactivando usuario: ${userToDeactivate.type} con ID: ${userToDeactivate.id}`);
      // Cambiado 'inactive' por 'rejected'
      const success = await updateUserStatus(supabase, userToDeactivate.id, 'rejected', userToDeactivate.type);
      
      if (success) {
        await loadAllData(); // Recargar datos si la actualización fue exitosa
        alert(`El ${userToDeactivate.type === 'patient' ? 'paciente' : 'médico'} ha sido dado de baja exitosamente.`);
      } else {
        alert('Hubo un error al dar de baja al usuario. Por favor intente nuevamente.');
      }
    } catch (error) {
      console.error('Error en handleDeactivateConfirmed:', error);
      alert('Error al procesar la solicitud.');
    } finally {
      setShowConfirmation(false);
      setUserToDeactivate(null);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo-container">
          <div className="logo">SaludPlus</div>
        </div>
        <div className="user-actions">
          <div className="user-info">
            <span className="user-email">{session.user.email}</span>
            <span className="user-role">{userDetails?.role || 'Usuario'}</span>
          </div>
          <button className="signout-btn" onClick={onSignOut}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <h3>Panel de Control</h3>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li><a href="#" className={`sidebar-link ${activeSide === "aceptar_paciente" ? "active" : ""}`} onClick={(event) => {
                event.preventDefault();
                setActiveSide("aceptar_paciente");
              }}><span className="icon home-icon"></span>Aceptar paciente</a></li>
              <li><a href="#" className={`sidebar-link ${activeSide === "aceptar_medicos" ? "active" : ""}`} onClick={(event) => {
                event.preventDefault();
                setActiveSide("aceptar_medicos");
              }}><span className="icon home-icon"></span>Aceptar médico</a></li>
              <li><a href="#" className={`sidebar-link ${activeSide === "ver_pacientes" ? "active" : ""}`} onClick={(event) => {
                event.preventDefault();
                setActiveSide("ver_pacientes");
              }}><span className="icon home-icon"></span>Ver pacientes</a></li>
              <li><a href="#" className={`sidebar-link ${activeSide === "ver_medicos" ? "active" : ""}`} onClick={(event) => {
                event.preventDefault();
                setActiveSide("ver_medicos");
              }}><span className="icon home-icon"></span>Ver médicos</a></li>
              <li><a href="#" className={`sidebar-link ${activeSide === "reportes" ? "active" : ""}`} onClick={(event) => {
                event.preventDefault();
                setActiveSide("reportes");
              }}><span className="icon home-icon"></span>Generar reportes</a></li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando información...</p>
            </div>
          ) : (() => {
            switch (activeSide) {
              case "aceptar_paciente":
                return <AcceptPatients 
                  pendingPatients={pendingPatients} 
                  handleAccept={(userId) => handleAccept('patient', userId)} 
                  handleReject={(userId) => handleReject('patient', userId)}
                  defaultAvatar={defaultAvatar}
                />;
              case "aceptar_medicos":
                return <AcceptDoctors 
                  pendingDoctors={pendingDoctors} 
                  handleAccept={(userId) => handleAccept('doctor', userId)} 
                  handleReject={(userId) => handleReject('doctor', userId)}
                  defaultAvatar={defaultAvatar}
                />;
              case "ver_pacientes":
                return <ViewPatients 
                  approvedPatients={approvedPatients} 
                  handleDeactivate={(userId) => confirmDeactivate('patient', userId)}
                  defaultAvatar={defaultAvatar}
                />;
              case "ver_medicos":
                return <ViewDoctors 
                  approvedDoctors={approvedDoctors} 
                  handleDeactivate={(userId) => confirmDeactivate('doctor', userId)}
                  defaultAvatar={defaultAvatar}
                />;
              case "reportes":
                return <GenerateReports 
                  supabase={supabase}  // Pasar la instancia de Supabase para datos reales
                  reportType={reportType}
                  setReportType={setReportType}
                  reportData={reportData}
                />;
              default:
                return (
                  <div className="welcome-container">
                    <h2>Bienvenido al Panel de Administración</h2>
                    <p>Seleccione una opción del menú lateral para administrar el sistema.</p>
                  </div>
                );
            }
          })()}
        </main>
      </div>

      <footer className="dashboard-footer">
        <p>&copy; 2025 SaludPlus</p>
      </footer>
    </div>
  );
};

export default Dashboard;