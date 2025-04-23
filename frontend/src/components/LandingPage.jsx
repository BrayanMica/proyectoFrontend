import React from 'react';
import './LandingPage.css';
import iggs from '../assets/iggs.png';

const LandingPage = ({ onLogin }) => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo-container">
          <div className="logo">SaludPlus</div>
        </div>
        <nav className="landing-nav">
          <ul>
            <li><a href="#features">Características</a></li>
            <li><a href="#about">Acerca de</a></li>
            <li><a href="#contact">Contacto</a></li>
            <li><button className="login-btn" onClick={onLogin}>Iniciar Sesión</button></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h1>SaludPlus</h1>
            <p>
              Plataforma integral para gestión y comunicación entre médicos y pacientes.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={onLogin}>Iniciar Sesión</button>
              <button className="secondary-btn" onClick={onLogin}>Registrarse</button>
            </div>
          </div>
          <div className="hero-image">
            <img src={iggs} alt="Profesionales médicos" />
          </div>
        </section>

        <section id="features" className="features-section">
          <h2>Características Principales</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon appointment-icon"></div>
              <h3>Gestión de Citas</h3>
              <p>Programa, modifica y cancela citas médicas con facilidad desde cualquier dispositivo.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon doctor-icon"></div>
              <h3>Perfiles Médicos</h3>
              <p>Accede a perfiles detallados de profesionales médicos, especialidades y horarios disponibles.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon patient-icon"></div>
              <h3>Portal del Paciente</h3>
              <p>Gestiona tu información médica, historial de citas y comunicación con tus médicos.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon admin-icon"></div>
              <h3>Administración</h3>
              <p>Sistema de gestión para administradores con reportes y control de usuarios.</p>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <h2>Acerca de SaludPlus</h2>
          <p>
            SaludPlus es una plataforma innovadora diseñada para optimizar la experiencia 
            de atención médica tanto para pacientes como para profesionales de la salud. 
            Nuestro sistema conecta pacientes con médicos de diversas especialidades, 
            facilitando la programación de citas, la comunicación directa y el seguimiento médico.
          </p>
        </section>

        <section id="contact" className="contact-section">
          <h2>Contacto</h2>
          <p>¿Tiene preguntas sobre nuestra plataforma? No dude en ponerse en contacto con nosotros.</p>
          <a href="mailto:info@saludplus.com" className="contact-email">info@saludplus.com</a>
        </section>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2025 SaludPlus - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default LandingPage;