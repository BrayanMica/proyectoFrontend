// api/userServices.js
// Servicios de API para gestionar usuarios y reportes

/**
 * Obtiene los datos del perfil del usuario actual
 * @param {Object} supabase - Cliente de Supabase
 * @param {string} userId - ID del usuario actual
 * @returns {Promise<Object>} - Datos del perfil o null si hay error
 */
export const getUserProfile = async (supabase, userId) => {
  try {
    // Primero intentamos obtener el perfil de paciente
    const { data: patientData, error: patientError } = await supabase
      .from('patient_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!patientError && patientData) {
      return { ...patientData, role: 'patient' };
    }
    
    // Si no es paciente, intentamos obtener el perfil de médico
    const { data: doctorData, error: doctorError } = await supabase
      .from('doctor_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!doctorError && doctorData) {
      return { ...doctorData, role: 'doctor' };
    }
    
    // Si no es ninguno, puede ser un administrador o no tener perfil
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }
};

/**
 * Obtiene los pacientes pendientes de aprobación
 * @param {Object} supabase - Cliente de Supabase
 * @returns {Promise<Array>} - Lista de pacientes pendientes o array vacío
 */
export const getPendingPatients = async (supabase) => {
  try {
    const { data, error } = await supabase
      .from('patient_profiles')
      .select('*')
      .eq('approval_status', 'pending');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching pending patients:', error.message);
    return [];
  }
};

/**
 * Obtiene los médicos pendientes de aprobación
 * @param {Object} supabase - Cliente de Supabase
 * @returns {Promise<Array>} - Lista de médicos pendientes o array vacío
 */
export const getPendingDoctors = async (supabase) => {
  try {
    const { data, error } = await supabase
      .from('doctor_profiles')
      .select('*, specialty:specialties(*)')
      .eq('approval_status', 'pending');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching pending doctors:', error.message);
    return [];
  }
};

/**
 * Obtiene los pacientes aprobados
 * @param {Object} supabase - Cliente de Supabase
 * @returns {Promise<Array>} - Lista de pacientes aprobados o array vacío
 */
export const getApprovedPatients = async (supabase) => {
  try {
    const { data, error } = await supabase
      .from('patient_profiles')
      .select('*')
      .eq('approval_status', 'approved');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching approved patients:', error.message);
    return [];
  }
};

/**
 * Obtiene los médicos aprobados
 * @param {Object} supabase - Cliente de Supabase
 * @returns {Promise<Array>} - Lista de médicos aprobados o array vacío
 */
export const getApprovedDoctors = async (supabase) => {
  try {
    const { data, error } = await supabase
      .from('doctor_profiles')
      .select('*, specialty:specialties(*)')
      .eq('approval_status', 'approved');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching approved doctors:', error.message);
    return [];
  }
};

/**
 * Actualiza el estado de un usuario
 * @param {Object} supabase - Cliente de Supabase
 * @param {string} userId - ID del usuario a actualizar
 * @param {string} status - Nuevo estado ('approved', 'rejected', 'inactive')
 * @param {string} userType - Tipo de usuario ('patient' o 'doctor')
 * @returns {Promise<boolean>} - true si la operación fue exitosa, false de lo contrario
 */
export const updateUserStatus = async (supabase, userId, status, userType) => {
  try {
    console.log(`Actualizando estado de usuario: ID=${userId}, Tipo=${userType}, Nuevo estado=${status}`);
    
    // Validar que recibimos un ID válido
    if (!userId || typeof userId !== 'string') {
      console.error('Error: ID de usuario inválido', userId);
      return false;
    }
    
    const tableName = userType === 'patient' ? 'patient_profiles' : 'doctor_profiles';
    console.log(`Tabla a actualizar: ${tableName}`);
    
    const { data, error } = await supabase
      .from(tableName)
      .update({ approval_status: status })
      .eq('id', userId);

    if (error) {
      console.error('Error de Supabase:', error);
      throw error;
    }
    
    console.log('Actualización exitosa:', data);
    return true;
  } catch (error) {
    console.error(`Error updating user status to ${status}:`, error.message);
    return false;
  }
};

/**
 * Obtiene los datos de médicos con más pacientes atendidos
 * @param {Object} supabase - Cliente de Supabase 
 * @param {number} limit - Límite de resultados (opcional, por defecto 10)
 * @returns {Promise<Array>} - Lista de médicos con más pacientes atendidos
 */
export const getMostActiveDoctors = async (supabase, limit = 10) => {
  try {
    // Llamar a la función RPC en Supabase
    const { data, error } = await supabase
      .rpc('get_most_active_doctors', { limit_count: limit });
    
    if (error) {
      console.error('Error en RPC get_most_active_doctors:', error);
      throw error;
    }
    
    // Transformar los datos para que coincidan con el formato esperado por el componente
    return data.map(item => ({
      doctor: item.doctor_name,
      specialty: item.specialty,
      patients: item.attended_count
    })) || [];
  } catch (error) {
    console.error('Error fetching most active doctors:', error.message);
    return [];
  }
};

/**
 * Obtiene las especialidades más demandadas
 * @param {Object} supabase - Cliente de Supabase
 * @param {number} limit - Límite de resultados (opcional, por defecto 10)
 * @returns {Promise<Array>} - Lista de especialidades con más citas
 */
export const getMostDemandedSpecialties = async (supabase, limit = 10) => {
  try {
    // Llamar a la función RPC en Supabase
    const { data, error } = await supabase
      .rpc('get_most_demanded_specialties', { limit_count: limit });
    
    if (error) {
      console.error('Error en RPC get_most_demanded_specialties:', error);
      throw error;
    }
    
    // Transformar los datos para que coincidan con el formato esperado por el componente
    return data.map(item => ({
      specialty: item.specialty,
      appointments: item.appointment_count
    })) || [];
  } catch (error) {
    console.error('Error fetching most demanded specialties:', error.message);
    return [];
  }
};

/**
 * Obtiene datos para los reportes según el tipo seleccionado
 * @param {Object} supabase - Cliente de Supabase
 * @param {string} reportType - Tipo de reporte ('doctorsWithMostPatients' o 'specialtiesWithMostAppointments')
 * @param {number} limit - Límite de resultados (opcional)
 * @returns {Promise<Array>} - Datos para el reporte seleccionado
 */
export const getReportData = async (supabase, reportType, limit = 10) => {
  try {
    if (reportType === 'doctorsWithMostPatients') {
      return await getMostActiveDoctors(supabase, limit);
    } else if (reportType === 'specialtiesWithMostAppointments') {
      return await getMostDemandedSpecialties(supabase, limit);
    } else {
      console.error('Tipo de reporte no válido:', reportType);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener datos del reporte:', error);
    throw error; // Propagar el error para manejarlo en el componente
  }
};