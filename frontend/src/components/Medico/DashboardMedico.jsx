import React, { useState, useEffect } from 'react';
import '../Dashboard.css';
import GestionMedico from "../Medico/GestionMedico.jsx";
import ViewProfile from "../Medico/ViewProfile.jsx";
import ScheduleView from '../Medico/ScheduleView.jsx';
// This is the General Overlay 2 component shown after login
const Dashboard = ({ session, supabase, onSignOut }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSide, setActiveSide] = useState("overview");

  useEffect(() => {
    async function getUserDetails() {
      try {
        setLoading(true);
        
        // Get user profile from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
        } else {
          setUserDetails(data || { 
            id: session.user.id,
            email: session.user.email,
            role: 'passenger' // Default role for new users
          });
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    getUserDetails();
  }, [session, supabase]);

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
              <li><a href="#" className="sidebar-link" onClick={(event) => {
        event.preventDefault(); // 🔹 Evita la recarga de la página
        setActiveSide("overview");
      }}><span className="icon home-icon"></span>Inicio</a></li>
              <li><a href="#" className="sidebar-link" onClick={(event) => {
        event.preventDefault();
        setActiveSide("horarios");
      }}><span className="icon home-icon"></span>Horarios</a></li>
              <li><a href="#" className="sidebar-link"onClick={(event) => {
        event.preventDefault();
        setActiveSide("Historial");
      }}><span className="icon home-icon"></span>Historial</a></li>
              <li><a href="#" className="sidebar-link" onClick={(event) => {
        event.preventDefault();
        setActiveSide("actualizar_perfil");
      }}><span className="icon home-icon"></span>Ver perfil</a></li>
              <li><a href="#" className="sidebar-link"onClick={(event) => {
        event.preventDefault();
        setActiveSide("reportes");
      }}><span className="icon home-icon"></span>Generar reportes</a></li>
              <li><a href="#" className="sidebar-link"onClick={(event) => {
        event.preventDefault();
        setActiveSide("overview");
      }}></a></li>
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
      case "overview":
        return <GestionMedico supabase={supabase} session={session} />;
        case "horarios":
        return <ScheduleView  session={session} />;
      case "Historial":
        return <h1>Componente para ver Historial</h1>;
      case "actualizar_perfil":
          return <ViewProfile supabase={supabase} session={session} />;
      default:
        return <h1>Componente predeterminado que se muestra al inicio</h1>;
    }
  })()}
</main>
      </div>

      <footer className="dashboard-footer">
        <p>&copy; 2025 </p>
      </footer>
    </div>
  );
};

export default Dashboard;