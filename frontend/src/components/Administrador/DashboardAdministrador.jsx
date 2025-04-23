import React, { useState, useEffect } from 'react';
import '../Dashboard.css';


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
        setActiveSide("aceptar_paciente");
      }}><span className="icon home-icon"></span>Aceptar paciente</a></li>
              <li><a href="#" className="sidebar-link" onClick={(event) => {
        event.preventDefault();
        setActiveSide("aceptar_medicos");
      }}><span className="icon home-icon"></span>Aceptar medico</a></li>
              <li><a href="#" className="sidebar-link"onClick={(event) => {
        event.preventDefault();
        setActiveSide("ver_pacientes");
      }}><span className="icon home-icon"></span>Ver pacientes</a></li>
              <li><a href="#" className="sidebar-link" onClick={(event) => {
        event.preventDefault();
        setActiveSide("ver_medicos");
      }}><span className="icon home-icon"></span>Ver medicos</a></li>
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
      case "aceptar_paciente":
        return <h1>Componente para aceptar un paciente</h1>;
      case "aceptar_medicos":
        return <h1>Componente para acepar a un medico</h1>;
      case "ver_pacientes":
        return <h1>Componente para ver pacientes</h1>;
      case "ver_medicos":
        return <h1>Componente para ver medicos</h1>;
      case "reportes":
        return <h1>Componente para generar reportes</h1>;
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