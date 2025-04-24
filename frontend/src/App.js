import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { jwtDecode } from 'jwt-decode'
import './App.css';

// Components
import LandingPage from './components/LandingPage';
import DashboardPacientes from './components//Patients/DashboardPacientes';
import DashboardMedico from './components/Medico/DashboardMedico';
import DashboardAdministrador from './components/Administrador/DashboardAdministrador';

// Create Supabase client
const supabase = createClient(
  'https://uvzwpfdmbafztjodvsyp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2endwZmRtYmFmenRqb2R2c3lwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzQ3Nzc5NywiZXhwIjoyMDU5MDUzNzk3fQ.kkulTcBqbZPBTGtKgZbiBdcT0dDL8TmXiXjgpigjj80'
);

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      // Set user role if session exists
      if (session) {
        const jwt = jwtDecode(session.access_token);
        setUserRole(jwt.user_role);
        console.log('User Role on initial load:', jwt.user_role);
      }
      
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      // Update user role when auth state changes
      if (session) {
        const jwt = jwtDecode(session.access_token);
        setUserRole(jwt.user_role);
        console.log('User Role on auth change:', jwt.user_role);
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // Toggle auth modal
  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  // Function to render the correct dashboard based on user role
  const renderDashboard = () => {

    console.log('Rendering dashboard for role:', session);
    switch (userRole) {
      case 'admin':
        return (
          <DashboardAdministrador 
            session={session} 
            supabase={supabase} 
            onSignOut={handleSignOut} 
          />
        );
      case 'doctor':
        return (
          <DashboardMedico 
            session={session} 
            supabase={supabase} 
            onSignOut={handleSignOut} 
          />
        );
      case '--':
        return (
          <DashboardPacientes 
            session={session} 
            supabase={supabase} 
            onSignOut={handleSignOut} 
          />
        );
      default:
        console.warn('Rol de usuario desconocido:', userRole);
        // Fallback to default dashboard or show error message
        return (
          <div className="error-container">
            <h2>Error de Acceso</h2>
            <p>No se ha podido determinar su rol en el sistema.</p>
            <button onClick={handleSignOut}>Cerrar Sesión</button>
          </div>
        );
    }
  };

  // General Overlay 1
  return (
    <div className="app-container">
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando...</p>
        </div>
      ) : session ? (
        // User is logged in - show the appropriate dashboard
        renderDashboard()
      ) : (
        // User is not logged in
        <>
          <LandingPage onLogin={toggleAuthModal} />
          
          {/* Auth Modal */}
          {showAuthModal && (
            <div className="auth-modal-overlay">
              <div className="auth-modal">
                <button className="close-modal-btn" onClick={toggleAuthModal}>×</button>
                <h2>Acceso al Sistema</h2>
                <Auth
                  supabaseClient={supabase}
                  appearance={{
                    theme: ThemeSupa,
                    variables: {
                      default: {
                        colors: {
                          brand: '#0056b3',
                          brandAccent: '#0070e0',
                        },
                      },
                    },
                    className: {
                      container: 'auth-container',
                      button: 'auth-button',
                      input: 'auth-input',
                    }
                  }}
                  localization={{
                    variables: {
                      sign_in: {
                        email_label: 'Correo electrónico',
                        password_label: 'Contraseña',
                        button_label: 'Iniciar sesión',
                      },
                      sign_up: {
                        email_label: 'Correo electrónico',
                        password_label: 'Contraseña',
                        button_label: 'Registrarse',
                      },
                    }
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;