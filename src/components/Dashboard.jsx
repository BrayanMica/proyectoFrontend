import React, { useState, useEffect } from 'react';
import './Dashboard.css';


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
          <div className="logo">AeroGestión</div>
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
        setActiveSide("vuelos");
      }}><span className="icon flight-icon"></span>Gestión de Vuelos</a></li>
              <li><a href="#" className="sidebar-link"onClick={(event) => {
        event.preventDefault();
        setActiveSide("boletos");
      }}><span className="icon ticket-icon"></span>Gestión de Boletos</a></li>
              <li><a href="#" className="sidebar-link" onClick={(event) => {
        event.preventDefault();
        setActiveSide("usuarios");
      }}><span className="icon user-icon"></span>Control de Usuarios</a></li>
              <li><a href="#" className="sidebar-link"onClick={(event) => {
        event.preventDefault();
        setActiveSide("pagos");
      }}><span className="icon payment-icon"></span>Historial de Pagos</a></li>
              <li><a href="#" className="sidebar-link"onClick={(event) => {
        event.preventDefault();
        setActiveSide("Historial");
      }}><span className="icon settings-icon"></span>Configuración</a></li>
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
        return (<div className="welcome-section">
          <h1>Bienvenido a AeroGestión</h1>
          <p>Has iniciado sesión correctamente como {userDetails?.role || 'usuario'}.</p>
          <div className="dashboard-overview">
            <div className="overview-card">
              <h3>Vuelos Activos</h3>
              <div className="overview-value">42</div>
            </div>
            <div className="overview-card">
              <h3>Boletos Vendidos</h3>
              <div className="overview-value">1,248</div>
            </div>
            <div className="overview-card">
              <h3>Puertas Disponibles</h3>
              <div className="overview-value">8/24</div>
            </div>
            <div className="overview-card">
              <h3>Usuarios Registrados</h3>
              <div className="overview-value">3,864</div>
            </div>
          </div>
</div>);
      case "vuelos":
        return <h3>Puertas Disponibles</h3>;
      case "boletos":
        return <h3>Puertas Disponibles</h3>;
      case "usuarios":
        return <h3>Puertas Disponibles</h3>;
      case "pagos":
        return <h3>Puertas Disponibles</h3>;
      default:
        return <p>Selecciona una opción</p>;
    }
  })()}
</main>
      </div>

      <footer className="dashboard-footer">
        <p>&copy; 2025 AeroGestión - Sistema de Gestión Aeroportuaria</p>
      </footer>
    </div>
  );
};

export default Dashboard;