import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, CircularProgress } from '@mui/material';
import '../Dashboard.css';

const ViewProfile = ({ session }) => {
  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    dpi: '',
    gender: '',
    birth_date: '',
    address: '',
    phone: '',
    photo_url: '',
    license_number: '',
    specialty_id: '',
    clinic_address: '',
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false); // Estado para gestionar edición

  useEffect(() => {
    async function getUserProfile() {
      try {
        setLoading(true);

        // Solicitar datos del médico al backend
        const response = await fetch('https://backend-p1.fly.dev/doctors/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`, // Usamos el token JWT
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del perfil');
        }

        const data = await response.json();

        // Setear los datos del médico en el estado
        setUserDetails({
          first_name: data.first_name,
          last_name: data.last_name,
          dpi: data.dpi,
          gender: data.gender,
          birth_date: data.birth_date,
          address: data.address,
          phone: data.phone,
          photo_url: data.photo_url,
          license_number: data.license_number,
          specialty_id: data.specialty_id,
          clinic_address: data.clinic_address,
        });
      } catch (error) {
        console.error('Error al recuperar perfil:', error);
      } finally {
        setLoading(false);
      }
    }

    getUserProfile();
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      // Preparamos los datos del médico (que están en el estado `userDetails`)
      const doctorProfile = {
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        dpi: userDetails.dpi,
        gender: userDetails.gender,
        birth_date: userDetails.birth_date,
        address: userDetails.address,
        phone: userDetails.phone,
        photo_url: userDetails.photo_url,
        license_number: userDetails.license_number,
        specialty_id: userDetails.specialty_id,
        clinic_address: userDetails.clinic_address,
      };

      // Hacemos la solicitud POST para actualizar la información del perfil
      const response = await fetch('https://backend-p1.fly.dev/doctors/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,  // Usamos el token JWT
        },
        body: JSON.stringify(doctorProfile),  // Convertimos los datos del perfil a JSON
      });

      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }

      // Si la solicitud fue exitosa, podemos deshabilitar el modo de edición
      setEditing(false);  // Deshabilitamos la edición después de guardar

      const data = await response.json();
      console.log('Perfil actualizado:', data); // Muestra la respuesta del servidor
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  return (
    <div className="ver-perfil-container">
      <h1>Perfil del Médico</h1>

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
          <p>Cargando perfil...</p>
        </div>
      ) : (
        <div className="profile-form">
          <TextField
            label="Correo"
            value={session.user.email}
            fullWidth
            disabled
            margin="normal"
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nombre"
                name="first_name"
                value={userDetails.first_name}
                onChange={handleChange}
                fullWidth
                disabled={!editing}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Apellido"
                name="last_name"
                value={userDetails.last_name}
                onChange={handleChange}
                fullWidth
                disabled={!editing}
                margin="normal"
              />
            </Grid>
          </Grid>

          <TextField
            label="DPI"
            name="dpi"
            value={userDetails.dpi}
            onChange={handleChange}
            fullWidth
            disabled={!editing}
            margin="normal"
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Género"
                name="gender"
                value={userDetails.gender}
                onChange={handleChange}
                fullWidth
                disabled={!editing}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Fecha de nacimiento"
                name="birth_date"
                type="date"
                value={userDetails.birth_date}
                onChange={handleChange}
                fullWidth
                disabled={!editing}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          <TextField
            label="Dirección"
            name="address"
            value={userDetails.address}
            onChange={handleChange}
            fullWidth
            disabled={!editing}
            margin="normal"
          />

          <TextField
            label="Teléfono"
            name="phone"
            value={userDetails.phone}
            onChange={handleChange}
            fullWidth
            disabled={!editing}
            margin="normal"
          />

          <TextField
            label="Foto de perfil"
            name="photo_url"
            value={userDetails.photo_url}
            onChange={handleChange}
            fullWidth
            disabled={!editing}
            margin="normal"
          />

          <TextField
            label="Número de licencia"
            name="license_number"
            value={userDetails.license_number}
            onChange={handleChange}
            fullWidth
            disabled={!editing}
            margin="normal"
          />

          <TextField
            label="Especialidad"
            name="specialty_id"
            value={userDetails.specialty_id}
            onChange={handleChange}
            fullWidth
            disabled={!editing}
            margin="normal"
          />

          <TextField
            label="Dirección de la clínica"
            name="clinic_address"
            value={userDetails.clinic_address}
            onChange={handleChange}
            fullWidth
            disabled={!editing}
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={editing ? handleSave : () => setEditing(true)}
            fullWidth
            style={{ marginTop: '20px' }}
          >
            {editing ? 'Guardar Cambios' : 'Editar Perfil'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
