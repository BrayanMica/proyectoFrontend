import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, CircularProgress, MenuItem, Select, InputLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import '../Dashboard.css';

const ScheduleView = ({ session }) => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');

  // Obtener horarios actuales del backend
  useEffect(() => {
    async function getHorarios() {
      try {
        setLoading(true);

        const response = await fetch('https://backend-p1.fly.dev/doctors/schedules', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,  // Usamos el token JWT
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener horarios');
        }

        const data = await response.json();
        setHorarios(data);
      } catch (error) {
        console.error('Error al recuperar horarios:', error);
      } finally {
        setLoading(false);
      }
    }

    getHorarios();
  }, [session]);

  const handleDayChange = (event) => {
    const { value } = event.target;
    setSelectedDays(value);
  };

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    if (name === 'start_time') setStartTime(value);
    if (name === 'end_time') setEndTime(value);
  };

  const handleSave = async () => {
    try {
      const doctorSchedules = selectedDays.map(day => ({
        day: day,
        start_time: startTime,
        end_time: endTime,
      }));

      // Hacemos la solicitud POST para establecer los horarios
      console.log('Horarios a guardar:', doctorSchedules);
      const response = await fetch('https://backend-p1.fly.dev/doctors/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(doctorSchedules),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los horarios');
      }

      const data = await response.json();
      console.log('Horarios establecidos:', data);
      setEditing(false); // Deshabilitar edición
    } catch (error) {
      console.error('Error al guardar horarios:', error);
    }
  };

  return (
    <div className="horarios-container">
      <h1>Establecer y Actualizar Horarios</h1>

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
          <p>Cargando horarios...</p>
        </div>
      ) : (
        <div className="schedule-form">
          <FormControl fullWidth margin="normal">
            <InputLabel>Días</InputLabel>
            <Select
              multiple
              value={selectedDays}
              onChange={handleDayChange}
              label="Días"
              disabled={!editing}
            >
              <MenuItem value="monday">Lunes</MenuItem>
              <MenuItem value="tuesday">Martes</MenuItem>
              <MenuItem value="wednesday">Miércoles</MenuItem>
              <MenuItem value="thursday">Jueves</MenuItem>
              <MenuItem value="friday">Viernes</MenuItem>
              <MenuItem value="saturday">Sábado</MenuItem>
              <MenuItem value="sunday">Domingo</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Hora de inicio"
                name="start_time"
                type="time"
                value={startTime}
                onChange={handleTimeChange}
                fullWidth
                disabled={!editing}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Hora de fin"
                name="end_time"
                type="time"
                value={endTime}
                onChange={handleTimeChange}
                fullWidth
                disabled={!editing}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editing}
                    onChange={() => setEditing(!editing)}
                    name="edit"
                  />
                }
                label="Editar horarios"
              />
            </Grid>
          </Grid>

          {editing ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              fullWidth
              style={{ marginTop: '20px' }}
            >
              Guardar Horarios
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditing(true)}
              fullWidth
              style={{ marginTop: '20px' }}
            >
              Establecer Horarios
            </Button>
          )}

          <div className="current-schedules">
            <h3>Horarios Actuales</h3>
            <Grid container spacing={2}>
              {horarios.map((schedule) => (
                <Grid item xs={12} sm={6} md={4} key={schedule.id}>
                  <div className="schedule-item">
                    <p>{schedule.day.charAt(0).toUpperCase() + schedule.day.slice(1)}</p>
                    <p>Desde: {schedule.start_time}</p>
                    <p>Hasta: {schedule.end_time}</p>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;
