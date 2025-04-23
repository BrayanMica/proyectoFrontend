# 🏥 Proyecto SaludPlus

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat-square)
![Status](https://img.shields.io/badge/status-en%20desarrollo-green.svg?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-habilitado-blue.svg?style=flat-square&logo=docker)
![React](https://img.shields.io/badge/React-frontend-61DAFB?style=flat-square&logo=react)
![Python](https://img.shields.io/badge/Python-backend-3776AB?style=flat-square&logo=python)

<p align="center">
  <i>Sistema integral para la gestión de citas médicas y comunicación entre pacientes y médicos</i>
</p>

```
Universidad de San Carlos de Guatemala
Facultad de Ingeniería
Escuela de Ciencias y Sistemas
Análisis y Diseño de Sistemas 1
```

</div>

---

## 📋 Tabla de Contenidos

- [Descripción del Problema](#-descripción-del-problema)
- [Objetivos](#-objetivos)
- [Roles del Sistema](#-roles-del-sistema)
- [Arquitectura](#-arquitectura)
- [Metodología de Desarrollo](#-metodología-de-desarrollo)
- [Requerimientos Funcionales](#-requerimientos-funcionales)
  - [Módulo de Registro y Autenticación](#11-módulo-de-registro-y-autenticación)
  - [Módulo de Paciente](#12-módulo-de-paciente)
  - [Módulo de Médico](#13-módulo-de-médico)
  - [Módulo de Administrador](#14-módulo-de-administrador)
- [Requerimientos No Funcionales](#-requerimientos-no-funcionales)
  - [Seguridad](#21-seguridad)
  - [Usabilidad](#22-usabilidad)
  - [Rendimiento](#23-rendimiento)
  - [Mantenibilidad](#24-mantenibilidad)
  - [Arquitectura](#25-arquitectura)
  - [Compatibilidad](#26-compatibilidad)
  - [Documentación](#27-documentación)
  - [Metodología de Desarrollo](#28-metodología-de-desarrollo)
- [Historias de usuario](#-historias-de-usuario)
- [Diagrama de Casos de Uso](#-diagrama-de-casos-de-uso)
- [Diagrama de Clases](#-diagrama-de-clases)
- [Diagrama de Componentes](#-diagrama-de-componentes)
- [Diagrama de Despliegue](#-diagrama-de-despliegue)
- [Diagrama de Secuencias](#-diagrama-de-secuencias)
- [Diagrama ER](#-diagrama-er)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Elaborado por](#-elaborado-por)

---

## 📝 Descripción del Problema

<div style="padding: 15px; border-left: 4px solid #4CAF50; background-color: #f8f9fa;">
SaludPlus es una plataforma web destinada a facilitar la comunicación y gestión eficiente entre pacientes y médicos. Este sistema surge como respuesta a la necesidad de una reconocida cadena de clínicas médicas del país para modernizar la forma en que los pacientes acceden a servicios médicos y los profesionales de la salud gestionan sus consultas.

La plataforma permite a los usuarios, ya sean pacientes que buscan atención médica o médicos que ofrecen sus servicios, acceder a una variedad de funcionalidades personalizadas según su rol. El sistema simplifica procesos como la reserva y gestión de citas médicas, la visualización de historiales clínicos, y la comunicación entre profesionales de la salud y sus pacientes.
</div>

---

## 🎯 Objetivos

### Objetivo General

> Desarrollar una plataforma web denominada SaludPlus que permita la comunicación y gestión eficiente entre pacientes y médicos, la cual servirá para la reserva de citas médicas y la atención de la misma, el cual será desarrollado utilizando metodologías ágiles como SCRUM y la posterior implementación de pruebas unitarias para comprobar el funcionamiento adecuado de la plataforma web.

### Objetivos Específicos

- ✅ Aplicar buenas prácticas en el uso de Git mediante el uso correcto de comandos, versionamiento semántico y configuración de repositorios privados para mejorar la colaboración y el mantenimiento del código.
- ✅ Implementar prácticas de Scrum para aumentar la transparencia y visibilidad del progreso del proyecto, identificando y abordando los problemas de manera oportuna.
- ✅ Utilizar un tablero Kanban para realizar una distribución adecuada de la carga de trabajo entre los integrantes del equipo y en paralelo tener una ayuda visual sobre el avance del proyecto.
- ✅ Llevar a cabo una correcta documentación de los procesos realizados para realizar el proyecto.
- ✅ Realizar pruebas unitarias de forma correcta para garantizar que el software funciona correctamente.

---

## 👥 Roles del Sistema

El sistema contempla tres roles principales con funcionalidades específicas:

<table>
  <tr>
    <th align="center">👨‍⚕️ Médico</th>
    <th align="center">🧑‍🤝‍🧑 Paciente</th>
    <th align="center">👨‍💼 Administrador</th>
  </tr>
  <tr>
    <td>
      <ul>
        <li>Publicar perfil profesional</li>
        <li>Gestionar citas con pacientes</li>
        <li>Acceder al historial de citas</li>
        <li>Cancelar citas de pacientes</li>
        <li>Enviar correos de notificación</li>
        <li>Establecer horarios de atención</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Registrarse en la plataforma</li>
        <li>Visualizar información de médicos</li>
        <li>Consultar horarios disponibles</li>
        <li>Filtrar médicos por especialidad</li>
        <li>Programar citas médicas</li>
        <li>Gestionar citas activas</li>
        <li>Acceder a historial de citas</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Aceptar registro de usuarios</li>
        <li>Ver todos los usuarios del sistema</li>
        <li>Dar de baja a usuarios</li>
        <li>Generar reportes de actividad</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🏗️ Arquitectura

<div style="padding: 15px; border: 1px solid #ddd; border-radius: 5px; background-color: #f8f9fa;">
La plataforma utiliza una arquitectura moderna basada en contenedores Docker tanto para el frontend como para el backend, facilitando el desarrollo, la portabilidad y el despliegue del sistema. 

```
┌─────────────────────────────────────┐
│             Cliente Web             │
└───────────────────┬─────────────────┘
                    ▼
┌─────────────────────────────────────┐
│        Docker Compose Network       │
├───────────────────┬─────────────────┤
│    ┌─────────┐    │    ┌─────────┐  │
│    │ Frontend│    │    │ Backend │  │
│    │ (React) │◄───┼───►│(Python) │  │
│    └─────────┘    │    └────┬────┘  │
└───────────────────┼─────────┼───────┘
                    ▼         ▼
             ┌─────────────────────┐
             │    Base de Datos    │
             │        (PosgreSQL)        │
             └─────────────────────┘
```

La comunicación entre capas se realiza mediante APIs bien definidas, y la información se almacena en una base de datos relacional PosgreSQL.
</div>

---

## 🔄 Metodología de Desarrollo

<div style="padding: 15px; border-left: 4px solid #2196F3; background-color: #f8f9fa;">
El proyecto se desarrolla siguiendo la metodología ágil SCRUM, con:

- 🔄 Sprints de 14 días
- 📅 Reuniones diarias (Daily Scrum)
- 🔍 Revisiones periódicas del progreso
- 🔀 Estrategia de branching GitFlow
- 💬 Conventional Commit para mensajes
- 📊 Tablero Kanban para gestión del flujo
</div>

---

## 📋 Requerimientos Funcionales

Los requerimientos funcionales describen las capacidades y servicios específicos que el sistema debe proporcionar, detallando comportamientos, entradas, procesos y salidas esperadas.

### 1.1. Módulo de Registro y Autenticación

<details>
<summary><b>RF-01: Registro de Pacientes</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir a los pacientes registrarse proporcionando sus datos personales.<br>
<b>Detalle</b>:
<ul>
  <li>Capturar nombre, apellido, DPI, género, dirección, teléfono, fecha de nacimiento, fotografía (opcional), correo electrónico y contraseña.</li>
  <li>La contraseña debe almacenarse encriptada.</li>
  <li>El sistema debe validar que el correo electrónico no esté registrado previamente.</li>
  <li>El DPI debe ser único en el sistema.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-02: Registro de Médicos</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir a los médicos registrarse proporcionando sus datos personales y profesionales.<br>
<b>Detalle</b>:
<ul>
  <li>Capturar nombre, apellido, DPI, fecha de nacimiento, género, dirección, teléfono, fotografía (obligatoria), número de colegiado, especialidad, dirección de clínica, correo electrónico y contraseña.</li>
  <li>La contraseña debe almacenarse encriptada.</li>
  <li>El número de colegiado debe ser único en el sistema.</li>
  <li>La fotografía es obligatoria para los médicos.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-03: Autenticación de Pacientes y Médicos</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir a pacientes y médicos iniciar sesión mediante sus credenciales.<br>
<b>Detalle</b>:
<ul>
  <li>Solicitar correo electrónico y contraseña.</li>
  <li>Verificar que el usuario haya sido aprobado por un administrador.</li>
  <li>Mostrar mensajes de error específicos en caso de autenticación fallida.</li>
  <li>Proporcionar enlace para registro si el usuario no está registrado.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-04: Autenticación del Administrador</b></summary>
<p>
<b>Descripción</b>: El sistema debe implementar un mecanismo de autenticación de dos factores para el administrador.<br>
<b>Detalle</b>:
<ul>
  <li>Primera autenticación mediante usuario y contraseña predeterminados.</li>
  <li>Segunda autenticación mediante archivo auth2.ayd1 que contiene una contraseña encriptada.</li>
  <li>Las contraseñas del primer y segundo factor deben ser diferentes.</li>
</ul>
</p>
</details>

### 1.2. Módulo de Paciente

<details>
<summary><b>RF-05: Visualización de Médicos</b></summary>
<p>
<b>Descripción</b>: El sistema debe mostrar al paciente los médicos registrados en la plataforma.<br>
<b>Detalle</b>:
<ul>
  <li>Mostrar nombre completo, especialidad, dirección de la clínica y foto del médico.</li>
  <li>No mostrar médicos con los que el paciente ya tiene una cita activa.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-06: Búsqueda de Médicos por Especialidad</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir al paciente buscar médicos según su especialidad.<br>
<b>Detalle</b>:
<ul>
  <li>Permitir la búsqueda mediante texto o selección en un combobox.</li>
  <li>Mostrar resultados con la misma información que en la página principal.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-07: Visualización de Horarios del Médico</b></summary>
<p>
<b>Descripción</b>: El sistema debe mostrar al paciente los horarios disponibles del médico seleccionado.<br>
<b>Detalle</b>:
<ul>
  <li>Mostrar días de atención y horarios.</li>
  <li>Permitir filtrar por fecha para ver horarios disponibles y ocupados.</li>
  <li>Indicar claramente si el médico no atiende en la fecha seleccionada.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-08: Programación de Citas</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir al paciente programar citas con médicos.<br>
<b>Detalle</b>:
<ul>
  <li>Capturar fecha, hora y motivo de la cita.</li>
  <li>Validar que la fecha seleccionada esté dentro de los días de atención del médico.</li>
  <li>Validar que el horario seleccionado esté disponible.</li>
  <li>Notificar al usuario si alguna validación falla.</li>
  <li>Impedir que un paciente tenga más de una cita activa con el mismo médico.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-09: Visualización de Citas Activas</b></summary>
<p>
<b>Descripción</b>: El sistema debe mostrar al paciente las citas que ha programado y aún no han sido atendidas.<br>
<b>Detalle</b>:
<ul>
  <li>Mostrar fecha, hora, nombre del médico, dirección de la clínica y motivo de la cita.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-10: Cancelación de Citas</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir al paciente cancelar citas programadas.<br>
<b>Detalle</b>:
<ul>
  <li>Solicitar confirmación antes de cancelar la cita.</li>
  <li>Remover la cita cancelada de la lista de citas activas.</li>
  <li>Registrar la cancelación para el historial.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-11: Visualización de Historial de Citas</b></summary>
<p>
<b>Descripción</b>: El sistema debe mostrar al paciente el historial de citas atendidas o canceladas.<br>
<b>Detalle</b>:
<ul>
  <li>Mostrar fecha, nombre del médico, dirección de la clínica, motivo, tratamiento (si fue atendida) y estado de la cita.</li>
  <li>Diferenciar entre citas atendidas y canceladas (por paciente o médico).</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-12: Actualización de Perfil del Paciente</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir al paciente actualizar su información personal.<br>
<b>Detalle</b>:
<ul>
  <li>Permitir modificar todos los campos excepto el correo electrónico.</li>
  <li>Validar datos antes de guardar los cambios.</li>
</ul>
</p>
</details>

### 1.3. Módulo de Médico

<details>
<summary><b>RF-13: Gestión de Citas Pendientes</b></summary>
<p>
<b>Descripción</b>: El sistema debe mostrar al médico las citas pendientes por atender.<br>
<b>Detalle</b>:
<ul>
  <li>Ordenar citas por fecha más reciente.</li>
  <li>Mostrar fecha, hora, nombre completo del paciente y motivo de la cita.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-14: Atención de Pacientes</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir al médico registrar la atención de un paciente.<br>
<b>Detalle</b>:
<ul>
  <li>Proporcionar formulario para registrar el tratamiento recomendado.</li>
  <li>Marcar la cita como "Atendida" una vez completado el proceso.</li>
  <li>Remover la cita de la lista de citas pendientes.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-15: Cancelación de Citas</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir al médico cancelar citas programadas.<br>
<b>Detalle</b>:
<ul>
  <li>Remover la cita cancelada de la lista de citas pendientes.</li>
  <li>Enviar correo al paciente notificando la cancelación.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-16: Envío de Notificaciones por Correo</b></summary>
<p>
<b>Descripción</b>: El sistema debe enviar notificaciones por correo electrónico cuando un médico cancela una cita.<br>
<b>Detalle</b>:
<ul>
  <li>Incluir fecha, hora, motivo de la cita cancelada, nombre del médico y mensaje de disculpa.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-17: Establecimiento de Horarios</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir al médico establecer sus horarios de atención.<br>
<b>Detalle</b>:
<ul>
  <li>Permitir seleccionar días de atención.</li>
  <li>Permitir definir horario de inicio y fin de atención.</li>
  <li>Aplicar el mismo horario para todos los días seleccionados.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-18: Actualización de Horarios</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir al médico modificar sus horarios de atención.<br>
<b>Detalle</b>:
<ul>
  <li>Permitir cambiar días de atención y horarios.</li>
  <li>Validar que los cambios no afecten citas ya programadas.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-19: Visualización de Historial de Citas</b></summary>
<p>
<b>Descripción</b>: El sistema debe mostrar al médico el historial de citas atendidas o canceladas.<br>
<b>Detalle</b>:
<ul>
  <li>Mostrar fecha, hora, nombre del paciente y estado de la cita.</li>
  <li>Diferenciar entre citas atendidas y canceladas (por paciente o médico).</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-20: Actualización de Perfil del Médico</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir al médico actualizar su información personal y profesional.<br>
<b>Detalle</b>:
<ul>
  <li>Permitir modificar todos los campos excepto el correo electrónico.</li>
  <li>Validar datos antes de guardar los cambios.</li>
</ul>
</p>
</details>

### 1.4. Módulo de Administrador

<details>
<summary><b>RF-21: Gestión de Solicitudes de Pacientes</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir al administrador aprobar o rechazar solicitudes de registro de pacientes.<br>
<b>Detalle</b>:
<ul>
  <li>Mostrar lista de pacientes pendientes de aprobación.</li>
  <li>Incluir fotografía (o imagen por defecto), nombre completo, DPI, género, fecha de nacimiento y correo electrónico.</li>
  <li>Proporcionar opciones para aceptar o rechazar cada solicitud.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-22: Gestión de Solicitudes de Médicos</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir al administrador aprobar o rechazar solicitudes de registro de médicos.<br>
<b>Detalle</b>:
<ul>
  <li>Mostrar lista de médicos pendientes de aprobación.</li>
  <li>Incluir fotografía, nombre completo, DPI, género, especialidad, número de colegiado y correo electrónico.</li>
  <li>Proporcionar opciones para aceptar o rechazar cada solicitud.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-23: Visualización de Pacientes Registrados</b></summary>
<p>
<b>Descripción</b>: El sistema debe mostrar al administrador la lista de pacientes aprobados.<br>
<b>Detalle</b>:
<ul>
  <li>Mostrar información completa de los pacientes.</li>
  <li>Proporcionar opción para dar de baja a un paciente.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-24: Visualización de Médicos Registrados</b></summary>
<p>
<b>Descripción</b>: El sistema debe mostrar al administrador la lista de médicos aprobados.<br>
<b>Detalle</b>:
<ul>
  <li>Mostrar información completa de los médicos.</li>
  <li>Proporcionar opción para dar de baja a un médico.</li>
</ul>
</p>
</details>

<details>
<summary><b>RF-25: Generación de Reportes</b></summary>
<p>
<b>Descripción</b>: El sistema debe permitir al administrador generar reportes sobre el uso de la plataforma.<br>
<b>Detalle</b>:
<ul>
  <li>Permitir generar al menos dos tipos de reportes (ej. médicos con más pacientes atendidos, especialidades más demandadas).</li>
  <li>Presentar información de manera clara y detallada.</li>
</ul>
</p>
</details>

---

## 🛡️ Requerimientos No Funcionales

Los requerimientos no funcionales especifican criterios que pueden utilizarse para juzgar la operación de un sistema en lugar de comportamientos específicos, enfocándose en atributos de calidad, restricciones y características.

### 2.1. Seguridad

<details>
<summary><b>RNF-01: Encriptación de Contraseñas</b></summary>
<p>
<b>Descripción</b>: El sistema debe almacenar todas las contraseñas de usuario de forma encriptada.<br>
<b>Detalle</b>:
<ul>
  <li>Implementar algoritmos de encriptación seguros.</li>
  <li>No almacenar contraseñas en texto plano en ningún momento.</li>
</ul>
</p>
</details>

<details>
<summary><b>RNF-02: Validación de Contraseñas</b></summary>
<p>
<b>Descripción</b>: El sistema debe validar la fortaleza de las contraseñas de usuario.<br>
<b>Detalle</b>:
<ul>
  <li>Exigir mínimo 8 caracteres.</li>
  <li>Requerir al menos una letra minúscula, una letra mayúscula y un número.</li>
</ul>
</p>
</details>

<details>
<summary><b>RNF-03: Autenticación de Dos Factores</b></summary>
<p>
<b>Descripción</b>: El sistema debe implementar autenticación de dos factores para el administrador.<br>
<b>Detalle</b>:
<ul>
  <li>Utilizar credenciales básicas más archivo de autenticación.</li>
  <li>Mantener diferentes contraseñas para cada factor.</li>
</ul>
</p>
</details>

<details>
<summary><b>RNF-04: Control de Acceso</b></summary>
<p>
<b>Descripción</b>: El sistema debe controlar el acceso a funcionalidades según el rol del usuario.<br>
<b>Detalle</b>:
<ul>
  <li>Restringir acceso a módulos específicos según el tipo de usuario.</li>
  <li>Validar permisos antes de permitir operaciones sensibles.</li>
</ul>
</p>
</details>

### 2.2. Usabilidad

<details>
<summary><b>RNF-05: Interfaz Intuitiva</b></summary>
<p>
<b>Descripción</b>: El sistema debe proporcionar una interfaz clara e intuitiva para todos los tipos de usuarios.<br>
<b>Detalle</b>:
<ul>
  <li>Organizar elementos de manera lógica.</li>
  <li>Utilizar diseño responsivo para adaptarse a diferentes dispositivos.</li>
  <li>Proporcionar indicaciones visuales para acciones disponibles.</li>
</ul>
</p>
</details>

<details>
<summary><b>RNF-06: Mensajes de Error</b></summary>
<p>
<b>Descripción</b>: El sistema debe proporcionar mensajes de error claros y específicos.<br>
<b>Detalle</b>:
<ul>
  <li>Informar al usuario sobre el problema específico.</li>
  <li>Ofrecer orientación para resolver el error cuando sea posible.</li>
</ul>
</p>
</details>

<details>
<summary><b>RNF-07: Ayuda Contextual</b></summary>
<p>
<b>Descripción</b>: El sistema debe proporcionar información de ayuda relevante al contexto.<br>
<b>Detalle</b>:
<ul>
  <li>Incluir tooltips o mensajes informativos para funciones complejas.</li>
  <li>Proporcionar guías de uso accesibles desde la interfaz.</li>
</ul>
</p>
</details>

### 2.3. Rendimiento

<details>
<summary><b>RNF-08: Tiempo de Respuesta</b></summary>
<p>
<b>Descripción</b>: El sistema debe responder en un tiempo razonable a las acciones del usuario.<br>
<b>Detalle</b>:
<ul>
  <li>Procesar solicitudes de autenticación en menos de 2 segundos.</li>
  <li>Cargar listas y reportes en menos de 3 segundos.</li>
  <li>Proporcionar indicadores visuales durante procesos prolongados.</li>
</ul>
</p>
</details>

<details>
<summary><b>RNF-09: Concurrencia</b></summary>
<p>
<b>Descripción</b>: El sistema debe soportar múltiples usuarios concurrentes.<br>
<b>Detalle</b>:
<ul>
  <li>Mantener rendimiento aceptable con al menos 50 usuarios simultáneos.</li>
  <li>Implementar mecanismos para gestionar picos de demanda.</li>
</ul>
</p>
</details>

<details>
<summary><b>RNF-10: Disponibilidad</b></summary>
<p>
<b>Descripción</b>: El sistema debe estar disponible la mayor parte del tiempo.<br>
<b>Detalle</b>:
<ul>
  <li>Garantizar disponibilidad del 99% durante horarios laborales.</li>
  <li>Implementar estrategias para minimizar tiempo de inactividad por mantenimiento.</li>
</ul>
</p>
</details>

### 2.4. Mantenibilidad

<details>
<summary><b>RNF-11: Estructura del Código</b></summary>
<p>
<b>Descripción</b>: El código debe seguir buenas prácticas de programación.<br>
<b>Detalle</b>:
<ul>
  <li>Implementar patrones de diseño apropiados.</li>
  <li>Seguir convenciones de nomenclatura coherentes.</li>
  <li>Documentar funciones y componentes principales.</li>
</ul>
</p>
</details>

<details>
<summary><b>RNF-12: Control de Versiones</b></summary>
<p>
<b>Descripción</b>: El desarrollo debe utilizar control de versiones adecuado.<br>
<b>Detalle</b>:
<ul>
  <li>Implementar estrategia GitFlow para ramas.</li>
  <li>Utilizar Conventional Commit para mensajes de commit.</li>
  <li>Aplicar versionamiento semántico.</li>
</ul>
</p>
</details>

<details>
<summary><b>RNF-13: Pruebas Unitarias</b></summary>
<p>
<b>Descripción</b>: El sistema debe incluir pruebas unitarias para funcionalidades clave.<br>
<b>Detalle</b>:
<ul>
  <li>Implementar al menos 5 pruebas unitarias para diferentes funcionalidades.</li>
  <li>Asegurar que las pruebas sean automatizables.</li>
</ul>
</p>
</details>

### 2.5. Arquitectura

<details>
<summary><b>RNF-14: Contenedorización</b></summary>
<p>
<b>Descripción</b>: El sistema debe utilizar Docker para facilitar el despliegue y la portabilidad.<br>
<b>Detalle</b>:
<ul>
  <li>Implementar contenedores tanto para el backend como para el frontend.</li>
  <li>Configurar correctamente la comunicación entre contenedores.</li>
</ul>
</p>
</details>

<details>
<summary><b>RNF-15: Separación Frontend-Backend</b></summary>
<p>
<b>Descripción</b>: El sistema debe mantener una clara separación entre frontend y backend.<br>
<b>Detalle</b>:
<ul>
  <li>Implementar APIs para la comunicación entre capas.</li>
  <li>Permitir desarrollo y mantenimiento independiente de cada componente.</li>
</ul>
</p>
</details>

### 2.6. Compatibilidad

<details>
<summary><b>RNF-16: Compatibilidad con Navegadores</b></summary>
<p>
<b>Descripción</b>: El sistema debe funcionar correctamente en los principales navegadores web.<br>
<b>Detalle</b>:
<ul>
  <li>Garantizar compatibilidad con Chrome, Firefox, Safari y Edge en sus versiones recientes.</li>
  <li>Adaptar la interfaz a diferentes tamaños de pantalla.</li>
</ul>
</p>
</details>

<details>
<summary><b>RNF-17: Compatibilidad con Dispositivos</b></summary>
<p>
<b>Descripción</b>: El sistema debe ser accesible desde diferentes dispositivos.<br>
<b>Detalle</b>:
<ul>
  <li>Optimizar la interfaz para computadoras de escritorio, tablets y smartphones.</li>
  <li>Ajustar funcionalidades según las capacidades del dispositivo.</li>
</ul>
</p>
</details>

### 2.7. Documentación

<details>
<summary><b>RNF-18: Documentación Técnica</b></summary>
<p>
<b>Descripción</b>: El sistema debe contar con documentación técnica completa.<br>
<b>Detalle</b>:
<ul>
  <li>Incluir diagramas UML (casos de uso, clases, secuencias, componentes, despliegue).</li>
  <li>Documentar la arquitectura y decisiones de diseño.</li>
  <li>Incluir manual técnico con detalles de implementación.</li>
</ul>
</p>
</details>

<details>
<summary><b>RNF-19: Manual de Usuario</b></summary>
<p>
<b>Descripción</b>: El sistema debe proporcionar un manual de usuario detallado.<br>
<b>Detalle</b>:
<ul>
  <li>Incluir guías paso a paso para las principales funcionalidades.</li>
  <li>Proporcionar capturas de pantalla ilustrativas.</li>
  <li>Organizar información por tipo de usuario.</li>
</ul>
</p>
</details>

### 2.8. Metodología de Desarrollo

<details>
<summary><b>RNF-20: Implementación de SCRUM</b></summary>
<p>
<b>Descripción</b>: El desarrollo debe seguir la metodología SCRUM.<br>
<b>Detalle</b>:
<ul>
  <li>Realizar al menos 2 sprints de 14 días cada uno.</li>
  <li>Documentar Sprint Planning, Daily Scrum y Sprint Retrospective.</li>
  <li>Mantener actualizadas las historias de usuario y el tablero Kanban.</li>
</ul>
</p>
</details>


---

## 📚 Historias de Usuario
Las historias de usuario describen las funcionalidades del sistema desde la perspectiva del usuario final, permitiendo una comprensión clara de las necesidades y expectativas de cada tipo de usuario.

3.1. Módulo de Registro y Autenticación
<details>
<summary><b>HU-01: Registro de pacientes</b></summary>
<p>
<b>Como</b> paciente,<br>
<b>Quiero</b> registrarme en la plataforma proporcionando mis datos personales,<br>
<b>Para</b> poder acceder a los servicios de consulta médica que ofrece la plataforma.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>El formulario de registro debe solicitar: nombre, apellido, DPI, género, dirección, teléfono, fecha de nacimiento, fotografía (opcional), correo electrónico y contraseña.</li>
  <li>La contraseña debe tener un mínimo de 8 caracteres y debe incluir al menos una letra minúscula, una letra mayúscula y un número.</li>
  <li>El sistema debe almacenar la contraseña de forma encriptada.</li>
  <li>El sistema debe validar que el correo electrónico y el DPI no estén registrados previamente.</li>
  <li>Debe mostrarse un mensaje de confirmación cuando el registro sea exitoso.</li>
  <li>Debe indicarse que el registro está pendiente de aprobación por parte del administrador.</li>
</ul>
<b>Prioridad:</b> Alta
</p>
</details>
<details>
<summary><b>HU-02: Registro de médicos</b></summary>
<p>
<b>Como</b> médico,<br>
<b>Quiero</b> registrarme en la plataforma proporcionando mis datos personales y profesionales,<br>
<b>Para</b> poder ofrecer mis servicios médicos a los pacientes.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>El formulario de registro debe solicitar: nombre, apellido, DPI, fecha de nacimiento, género, dirección, teléfono, fotografía (obligatoria), número de colegiado, especialidad, dirección de clínica, correo electrónico y contraseña.</li>
  <li>La contraseña debe tener un mínimo de 8 caracteres y debe incluir al menos una letra minúscula, una letra mayúscula y un número.</li>
  <li>El sistema debe almacenar la contraseña de forma encriptada.</li>
  <li>El sistema debe validar que el correo electrónico, DPI y número de colegiado no estén registrados previamente.</li>
  <li>La fotografía debe ser obligatoria para completar el registro.</li>
  <li>Debe mostrarse un mensaje de confirmación cuando el registro sea exitoso.</li>
  <li>Debe indicarse que el registro está pendiente de aprobación por parte del administrador.</li>
</ul>
<b>Prioridad:</b> Alta
</p>
</details>
<details>
<summary><b>HU-03: Autenticación de pacientes y médicos</b></summary>
<p>
<b>Como</b> paciente o médico registrado,<br>
<b>Quiero</b> iniciar sesión en el sistema con mis credenciales,<br>
<b>Para</b> acceder a las funcionalidades correspondientes a mi rol.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>El formulario de inicio de sesión debe solicitar correo electrónico y contraseña.</li>
  <li>El sistema debe verificar que el usuario haya sido aprobado por el administrador antes de permitir el inicio de sesión.</li>
  <li>Si el usuario no ha sido aprobado, debe mostrarse un mensaje indicando que su registro está pendiente de aprobación.</li>
  <li>Si las credenciales son incorrectas, debe mostrarse un mensaje de error específico.</li>
  <li>Debe proporcionarse un enlace para registrarse en caso de que el usuario no tenga una cuenta.</li>
  <li>Una vez autenticado, el sistema debe redirigir al usuario a la página principal correspondiente a su rol.</li>
</ul>
<b>Prioridad:</b> Alta
</p>
</details>
<details>
<summary><b>HU-04: Autenticación del administrador</b></summary>
<p>
<b>Como</b> administrador del sistema,<br>
<b>Quiero</b> iniciar sesión utilizando un mecanismo de autenticación de dos factores,<br>
<b>Para</b> garantizar la seguridad de las funciones administrativas.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>El primer factor de autenticación debe solicitar un usuario y contraseña predeterminados.</li>
  <li>Tras la primera autenticación, el sistema debe permitir cargar un archivo llamado auth2.ayd1 para la segunda autenticación.</li>
  <li>El sistema debe validar la contraseña encriptada contenida en el archivo auth2.ayd1.</li>
  <li>Las contraseñas del primer y segundo factor deben ser diferentes.</li>
  <li>Una vez completada la autenticación de dos factores, el sistema debe redirigir al administrador a la página principal de administración.</li>
  <li>Si alguno de los factores falla, debe mostrarse un mensaje de error específico.</li>
</ul>
<b>Prioridad:</b> Alta
</p>
</details>
3.2. Módulo de Paciente
<details>
<summary><b>HU-05: Visualización de médicos</b></summary>
<p>
<b>Como</b> paciente,<br>
<b>Quiero</b> visualizar los médicos registrados en la plataforma,<br>
<b>Para</b> conocer los profesionales disponibles para consulta.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>La página principal debe mostrar la lista de médicos registrados, excepto aquellos con los que el paciente ya tiene una cita activa.</li>
  <li>Para cada médico, se debe mostrar: nombre completo, especialidad, dirección de la clínica y fotografía.</li>
  <li>La lista debe actualizarse automáticamente cuando se registren nuevos médicos o cuando cambie el estado de las citas.</li>
</ul>
<b>Prioridad:</b> Alta
</p>
</details>
<details>
<summary><b>HU-06: Búsqueda de médicos por especialidad</b></summary>
<p>
<b>Como</b> paciente,<br>
<b>Quiero</b> buscar médicos según su especialidad,<br>
<b>Para</b> encontrar el profesional adecuado para mi condición médica.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Debe existir un campo de búsqueda donde se pueda escribir la especialidad médica.</li>
  <li>Debe proporcionar un botón para iniciar la búsqueda.</li>
  <li>Como alternativa, debe existir un combobox con las especialidades disponibles para facilitar la selección.</li>
  <li>Los resultados de la búsqueda deben mostrar los mismos datos que la página principal: nombre completo, especialidad, dirección de la clínica y fotografía.</li>
  <li>Si no hay médicos para la especialidad buscada, debe mostrarse un mensaje indicándolo.</li>
</ul>
<b>Prioridad:</b> Media
</p>
</details>
<details>
<summary><b>HU-07: Visualización de horarios del médico</b></summary>
<p>
<b>Como</b> paciente,<br>
<b>Quiero</b> ver los horarios disponibles de un médico seleccionado,<br>
<b>Para</b> programar una cita en un horario conveniente.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Al seleccionar un médico, se debe mostrar información sobre los días y horarios que atiende.</li>
  <li>Debe existir un filtro por fecha para visualizar los horarios disponibles y ocupados en un día específico.</li>
  <li>Si el médico no atiende en la fecha seleccionada, debe mostrarse un mensaje indicándolo.</li>
  <li>Los horarios ocupados y disponibles deben diferenciarse visualmente.</li>
</ul>
<b>Prioridad:</b> Alta
</p>
</details>
<details>
<summary><b>HU-08: Programación de citas</b></summary>
<p>
<b>Como</b> paciente,<br>
<b>Quiero</b> programar una cita con un médico seleccionado,<br>
<b>Para</b> recibir atención médica en un horario específico.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>El formulario debe permitir seleccionar fecha, hora y registrar el motivo de la cita.</li>
  <li>El sistema debe validar que la fecha seleccionada esté dentro de los días de atención del médico.</li>
  <li>El sistema debe validar que el horario seleccionado esté disponible.</li>
  <li>Si una validación falla, debe mostrarse un mensaje específico indicando el motivo.</li>
  <li>El sistema debe impedir que un paciente tenga más de una cita activa con el mismo médico.</li>
  <li>Al programar la cita exitosamente, debe mostrarse un mensaje de confirmación y añadirse a la lista de citas activas.</li>
</ul>
<b>Prioridad:</b> Alta
</p>
</details>
<details>
<summary><b>HU-09: Visualización de citas activas</b></summary>
<p>
<b>Como</b> paciente,<br>
<b>Quiero</b> visualizar las citas que he programado y que aún no han sido atendidas,<br>
<b>Para</b> llevar un control de mis próximas consultas médicas.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Debe mostrarse una lista con todas las citas activas del paciente.</li>
  <li>Para cada cita, debe mostrarse: fecha, hora, nombre del médico, dirección de la clínica y motivo de la cita.</li>
  <li>Las citas deben ordenarse por fecha y hora (las más próximas primero).</li>
  <li>Debe existir una opción para cancelar cada cita desde esta vista.</li>
</ul>
<b>Prioridad:</b> Alta
</p>
</details>
<details>
<summary><b>HU-10: Cancelación de citas</b></summary>
<p>
<b>Como</b> paciente,<br>
<b>Quiero</b> cancelar una cita programada,<br>
<b>Para</b> liberar el horario en caso de no poder asistir.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Al seleccionar la opción de cancelar una cita, debe mostrarse un mensaje de confirmación.</li>
  <li>Tras confirmar la cancelación, la cita debe removerse de la lista de citas activas.</li>
  <li>La cita cancelada debe registrarse en el historial con el estado "Cancelado por el paciente".</li>
  <li>El horario cancelado debe volver a estar disponible para otros pacientes.</li>
</ul>
<b>Prioridad:</b> Media
</p>
</details>
<details>
<summary><b>HU-11: Visualización de historial de citas</b></summary>
<p>
<b>Como</b> paciente,<br>
<b>Quiero</b> visualizar el historial de citas atendidas o canceladas,<br>
<b>Para</b> llevar un control de los chequeos médicos que he realizado.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Debe mostrarse una lista con todas las citas pasadas del paciente.</li>
  <li>Para cada cita, debe mostrarse: fecha, nombre del médico, dirección de la clínica, motivo, tratamiento (si fue atendida) y estado (atendida o cancelada).</li>
  <li>Debe diferenciarse visualmente entre citas atendidas y canceladas.</li>
  <li>Si una cita fue cancelada, debe indicarse si fue cancelada por el paciente o por el médico.</li>
  <li>Las citas deben ordenarse por fecha (las más recientes primero).</li>
</ul>
<b>Prioridad:</b> Media
</p>
</details>
<details>
<summary><b>HU-12: Actualización de perfil del paciente</b></summary>
<p>
<b>Como</b> paciente,<br>
<b>Quiero</b> actualizar mi información personal,<br>
<b>Para</b> mantener mis datos actualizados en el sistema.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Debe mostrarse un formulario con todos los campos del perfil del paciente.</li>
  <li>Todos los campos deben ser editables, excepto el correo electrónico.</li>
  <li>Al guardar los cambios, el sistema debe validar que los datos sean correctos.</li>
  <li>Debe mostrarse un mensaje de confirmación cuando la actualización sea exitosa.</li>
</ul>
<b>Prioridad:</b> Baja
</p>
</details>

3.3. Módulo de Médico
<details>
<summary><b>HU-13: Gestión de citas pendientes</b></summary>
<p>
<b>Como</b> médico,<br>
<b>Quiero</b> visualizar las citas pendientes por atender,<br>
<b>Para</b> organizar mi agenda y preparar las consultas.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Al iniciar sesión, debe mostrarse la lista de citas pendientes ordenadas por fecha más reciente.</li>
  <li>Para cada cita, debe mostrarse: fecha, hora, nombre completo del paciente y motivo de la cita.</li>
  <li>Debe existir una opción para marcar la cita como atendida.</li>
  <li>Debe existir una opción para cancelar la cita.</li>
</ul>
<b>Prioridad:</b> Alta
</p>
</details>
<details>
<summary><b>HU-14: Atención de pacientes</b></summary>
<p>
<b>Como</b> médico,<br>
<b>Quiero</b> registrar la atención a un paciente y su tratamiento recomendado,<br>
<b>Para</b> completar el proceso de consulta médica.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Al seleccionar la opción de atender a un paciente, debe mostrarse un formulario para registrar el tratamiento.</li>
  <li>El formulario debe permitir ingresar detalles del tratamiento recomendado.</li>
  <li>Al confirmar, la cita debe marcarse como "Atendida" y desaparecer de la lista de citas pendientes.</li>
  <li>La cita atendida debe registrarse en el historial con su tratamiento correspondiente.</li>
</ul>
<b>Prioridad:</b> Alta
</p>
</details>
<details>
<summary><b>HU-15: Cancelación de citas por el médico</b></summary>
<p>
<b>Como</b> médico,<br>
<b>Quiero</b> cancelar una cita programada,<br>
<b>Para</b> ajustar mi agenda en caso de imprevistos.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Al seleccionar la opción de cancelar una cita, debe mostrarse un mensaje de confirmación.</li>
  <li>Tras confirmar la cancelación, la cita debe removerse de la lista de citas pendientes.</li>
  <li>El sistema debe enviar una notificación por correo al paciente informando de la cancelación.</li>
  <li>La cita cancelada debe registrarse en el historial con el estado "Cancelado por el médico".</li>
</ul>
<b>Prioridad:</b> Media
</p>
</details>
<details>
<summary><b>HU-16: Envío de notificaciones por correo</b></summary>
<p>
<b>Como</b> médico,<br>
<b>Quiero</b> que el sistema envíe automáticamente una notificación por correo cuando cancelo una cita,<br>
<b>Para</b> informar al paciente sobre la cancelación sin acciones adicionales.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Al cancelar una cita, el sistema debe enviar automáticamente un correo al paciente.</li>
  <li>El correo debe incluir: fecha de la cita cancelada, hora, motivo de la cita, nombre del médico y un mensaje de disculpa.</li>
  <li>El correo debe enviarse desde una dirección institucional verificada.</li>
  <li>El sistema debe mostrar confirmación de que el correo fue enviado correctamente.</li>
</ul>
<b>Prioridad:</b> Media
</p>
</details>
<details>
<summary><b>HU-17: Establecimiento de horarios</b></summary>
<p>
<b>Como</b> médico,<br>
<b>Quiero</b> establecer mis horarios de atención,<br>
<b>Para</b> definir mi disponibilidad de consultas.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Debe existir un formulario para seleccionar los días de la semana que atenderá el médico.</li>
  <li>El formulario debe permitir establecer un horario de inicio y fin de atención.</li>
  <li>El mismo horario establecido debe aplicarse a todos los días seleccionados.</li>
  <li>Debe mostrarse un mensaje de confirmación cuando los horarios se establezcan correctamente.</li>
</ul>
<b>Prioridad:</b> Alta
</p>
</details>
<details>
<summary><b>HU-18: Actualización de horarios</b></summary>
<p>
<b>Como</b> médico,<br>
<b>Quiero</b> modificar mis horarios de atención,<br>
<b>Para</b> ajustar mi disponibilidad según mis necesidades.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>El sistema debe mostrar los horarios actuales del médico.</li>
  <li>Debe permitir cambiar los días de atención y horarios.</li>
  <li>El sistema debe validar que los cambios no afecten citas ya programadas.</li>
  <li>Si hay conflictos con citas existentes, debe mostrarse una advertencia específica.</li>
  <li>Debe mostrarse un mensaje de confirmación cuando los horarios se actualicen correctamente.</li>
</ul>
<b>Prioridad:</b> Media
</p>
</details>
<details>
<summary><b>HU-19: Visualización de historial de citas</b></summary>
<p>
<b>Como</b> médico,<br>
<b>Quiero</b> visualizar el historial de citas que he atendido o cancelado,<br>
<b>Para</b> llevar un control de los pacientes que he tratado.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Debe mostrarse una lista con todas las citas pasadas del médico.</li>
  <li>Para cada cita, debe mostrarse: fecha, hora, nombre del paciente y estado (atendida, cancelada por el paciente o médico).</li>
  <li>Debe diferenciarse visualmente entre citas atendidas y canceladas.</li>
  <li>Las citas deben ordenarse por fecha (las más recientes primero).</li>
</ul>
<b>Prioridad:</b> Media
</p>
</details>
<details>
<summary><b>HU-20: Actualización de perfil del médico</b></summary>
<p>
<b>Como</b> médico,<br>
<b>Quiero</b> actualizar mi información personal y profesional,<br>
<b>Para</b> mantener mis datos actualizados en el sistema.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Debe mostrarse un formulario con todos los campos del perfil del médico.</li>
  <li>Todos los campos deben ser editables, excepto el correo electrónico.</li>
  <li>Al guardar los cambios, el sistema debe validar que los datos sean correctos.</li>
  <li>Debe mostrarse un mensaje de confirmación cuando la actualización sea exitosa.</li>
</ul>
<b>Prioridad:</b> Baja
</p>
</details>

3.4. Módulo de Administrador
<details>
<summary><b>HU-21: Gestión de solicitudes de pacientes</b></summary>
<p>
<b>Como</b> administrador,<br>
<b>Quiero</b> revisar y aprobar o rechazar las solicitudes de registro de pacientes,<br>
<b>Para</b> controlar el acceso de usuarios al sistema.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Debe mostrarse una lista de pacientes pendientes de aprobación.</li>
  <li>Para cada paciente, debe mostrarse: fotografía (o imagen por defecto), nombre completo, DPI, género, fecha de nacimiento y correo electrónico.</li>
  <li>Deben existir botones para aceptar o rechazar cada solicitud.</li>
  <li>Al aprobar una solicitud, el paciente debe poder iniciar sesión en el sistema.</li>
  <li>Al rechazar una solicitud, debe eliminarse el registro del paciente o marcarse como rechazado.</li>
  <li>Debe mostrarse un mensaje de confirmación tras cada acción.</li>
</ul>
<b>Prioridad:</b> Alta
</p>
</details>
<details>
<summary><b>HU-22: Gestión de solicitudes de médicos</b></summary>
<p>
<b>Como</b> administrador,<br>
<b>Quiero</b> revisar y aprobar o rechazar las solicitudes de registro de médicos,<br>
<b>Para</b> controlar el acceso de profesionales al sistema.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Debe mostrarse una lista de médicos pendientes de aprobación.</li>
  <li>Para cada médico, debe mostrarse: fotografía, nombre completo, DPI, género, especialidad, número de colegiado y correo electrónico.</li>
  <li>Deben existir botones para aceptar o rechazar cada solicitud.</li>
  <li>Al aprobar una solicitud, el médico debe poder iniciar sesión en el sistema.</li>
  <li>Al rechazar una solicitud, debe eliminarse el registro del médico o marcarse como rechazado.</li>
  <li>Debe mostrarse un mensaje de confirmación tras cada acción.</li>
</ul>
<b>Prioridad:</b> Alta
</p>
</details>
<details>
<summary><b>HU-23: Visualización de pacientes registrados</b></summary>
<p>
<b>Como</b> administrador,<br>
<b>Quiero</b> visualizar la lista de pacientes aprobados en el sistema,<br>
<b>Para</b> gestionar los usuarios activos.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Debe mostrarse una lista con todos los pacientes aprobados en el sistema.</li>
  <li>Para cada paciente, debe mostrarse la información completa de su perfil.</li>
  <li>Debe existir una opción para dar de baja a cualquier paciente.</li>
  <li>Al dar de baja a un paciente, debe solicitarse confirmación.</li>
  <li>Una vez dado de baja, el paciente no debe poder iniciar sesión en el sistema.</li>
</ul>
<b>Prioridad:</b> Media
</p>
</details>
<details>
<summary><b>HU-24: Visualización de médicos registrados</b></summary>
<p>
<b>Como</b> administrador,<br>
<b>Quiero</b> visualizar la lista de médicos aprobados en el sistema,<br>
<b>Para</b> gestionar los profesionales activos.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Debe mostrarse una lista con todos los médicos aprobados en el sistema.</li>
  <li>Para cada médico, debe mostrarse la información completa de su perfil.</li>
  <li>Debe existir una opción para dar de baja a cualquier médico.</li>
  <li>Al dar de baja a un médico, debe solicitarse confirmación.</li>
  <li>Una vez dado de baja, el médico no debe poder iniciar sesión en el sistema.</li>
</ul>
<b>Prioridad:</b> Media
</p>
</details>
<details>
<summary><b>HU-25: Generación de reportes</b></summary>
<p>
<b>Como</b> administrador,<br>
<b>Quiero</b> generar reportes sobre el uso de la plataforma,<br>
<b>Para</b> analizar la actividad y tomar decisiones basadas en datos.<br>
<b>Criterios de aceptación</b>:
<ul>
  <li>Debe existir una sección específica para la generación de reportes.</li>
  <li>Debe permitir generar al menos dos tipos diferentes de reportes (ej. médicos que más pacientes han atendido, especialidades más demandadas).</li>
  <li>Los reportes deben presentarse de manera clara y detallada.</li>
  <li>Debe existir una opción para exportar o imprimir los reportes generados.</li>
</ul>
<b>Prioridad:</b> Baja
</p>
</details>

---

## 👥 Diagrama de Casos de Uso
![Diagrama de Casos de Uso](./Diagramas/Diagrama%20de%20casos%20de%20uso%20proyecto%201%20ADYS1.drawio.png)

## 🧩 Diagrama de Clases
![Diagrama de Clases](./Diagramas/Diagrama%20de%20clases.png)

## 🔌 Diagrama de Componentes
![Diagrama de Componentes](./Diagramas/Diagrama%20de%20Componentes.png)

## 🚀 Diagrama de Despliegue
![Diagrama de Despliegue](./Diagramas/Diagrama%20de%20Despliegue.png)

## ⏱️ Diagrama de Secuencias
![Diagrama de Secuencias](./Diagramas/Diagrama%20de%20secuencias.png)

## 🗃️ Diagrama ER
![Diagrama ER](./Diagramas/Diagrama%20ER.png)

---

## 🔧 Tecnologías Utilizadas

<div style="display: flex; justify-content: space-around; flex-wrap: wrap; margin: 20px 0;">
  <div style="text-align: center; padding: 10px; width: 150px;">
    <h3>Frontend</h3>
    <p>React</p>
  </div>
  <div style="text-align: center; padding: 10px; width: 150px;">
    <h3>Backend</h3>
    <p>Python</p>
  </div>
  <div style="text-align: center; padding: 10px; width: 150px;">
    <h3>Base de Datos</h3>
    <p>PostgreSQL</p>
  </div>
  <div style="text-align: center; padding: 10px; width: 150px;">
    <h3>Contenedorización</h3>
    <p>Docker</p>
  </div>
  <div style="text-align: center; padding: 10px; width: 150px;">
    <h3>Control de Versiones</h3>
    <p>Git (GitFlow)</p>
  </div>
  <div style="text-align: center; padding: 10px; width: 150px;">
    <h3>Gestión de Proyectos</h3>
    <p>Trello (Kanban)</p>
  </div>
</div>

---

##  METODOLOGIA SCRUM
### SPRINT 1

### 📝 Sprint Planning (02/03/2025)
[SPRINT Planning](https://drive.google.com/file/d/1EOyKxIE2sH2WZ7e3ARFvdM4UZoTAXkQW/view?usp=sharing)

![Sprint Planning](./img/sprint%201%20-%20inicio.png)

### 📝 Daily 1 - Día 1 (03/03/2025)

#### Alberto Hernández:
- **¿Qué hice ayer?**  
  Ayer realizamos la reunión de Sprint Planning donde definimos las tareas a realizar y me asignaron el diseño de la autenticación, API y base de datos.
- **¿Qué voy a hacer hoy?**  
  Comenzaré a diseñar el diagrama entidad-relación para la base de datos y definiré los primeros modelos para los usuarios.
- **¿Hay algún impedimento?**  
  No, por el momento todo está claro.

#### Dilan Suy:
- **¿Qué hice ayer?**  
  Participé en la reunión de Sprint Planning donde se me asignó trabajar en el módulo del doctor junto con Carlos.
- **¿Qué voy a hacer hoy?**  
  Diseñaré los mockups de las vistas para gestión de citas y establecer horarios.
- **¿Hay algún impedimento?**  
  Necesito esperar la definición del API que hará Alberto para saber cómo conectar el frontend.

#### Carlos Cox:
- **¿Qué hice ayer?**  
  Estuve presente en la reunión de Sprint Planning donde se definieron las tareas.
- **¿Qué voy a hacer hoy?**  
  Comenzaré a diseñar los mockups para atender paciente y cancelar cita del paciente.
- **¿Hay algún impedimento?**  
  Ninguno por ahora.

#### Melvin Valencia:
- **¿Qué hice ayer?**  
  Participé en la reunión de planificación donde me asignaron el módulo de pacientes con Andrés.
- **¿Qué voy a hacer hoy?**  
  Empezaré a diseñar los mockups para la página principal y programar cita.
- **¿Hay algún impedimento?**  
  No por el momento.

#### Andrés Quezada:
- **¿Qué hice ayer?**  
  Asistí a la reunión de Sprint Planning donde me asignaron el módulo de pacientes.
- **¿Qué voy a hacer hoy?**  
  Diseñaré los mockups para la lista de citas activas y el historial de citas.
- **¿Hay algún impedimento?**  
  Ninguno hasta ahora.

#### Brayan Mica:
- **¿Qué hice ayer?**  
  Estuve en la reunión de Sprint Planning donde me asignaron la parte del administrador.
- **¿Qué voy a hacer hoy?**  
  Comenzaré a diseñar los mockups para aceptar pacientes y médicos.
- **¿Hay algún impedimento?**  
  Ninguno por ahora.

### 📝 Daily 2 - Día 2 (04/03/2025)

#### Alberto Hernández:
- **¿Qué hice ayer?**  
  Terminé el diseño inicial del diagrama entidad-relación y comencé a definir los modelos de usuarios.
- **¿Qué voy a hacer hoy?**  
  Continuaré con el diseño de la API para la autenticación y registro de usuarios.
- **¿Hay algún impedimento?**  
  No, todo va según lo planeado.

#### Dilan Suy:
- **¿Qué hice ayer?**  
  Completé los mockups para la gestión de citas y establecer horarios.
- **¿Qué voy a hacer hoy?**  
  Comenzaré a configurar el proyecto de frontend y a crear los componentes básicos.
- **¿Hay algún impedimento?**  
  Aún esperando la definición del API.

#### Carlos Cox:
- **¿Qué hice ayer?**  
  Terminé los mockups para atender paciente y cancelar cita.
- **¿Qué voy a hacer hoy?**  
  Ayudaré a Dilan con la configuración del frontend y empezaré a crear los componentes de navegación.
- **¿Hay algún impedimento?**  
  Ninguno.

#### Melvin Valencia:
- **¿Qué hice ayer?**  
  Finalicé los mockups para la página principal y programar cita.
- **¿Qué voy a hacer hoy?**  
  Comenzaré a configurar el proyecto de frontend para el módulo de pacientes.
- **¿Hay algún impedimento?**  
  Necesito coordinar con Andrés para evitar conflictos en el código.

#### Andrés Quezada:
- **¿Qué hice ayer?**  
  Terminé los mockups para la lista de citas activas y el historial de citas.
- **¿Qué voy a hacer hoy?**  
  Trabajaré en la estructura base de los componentes para las vistas del paciente.
- **¿Hay algún impedimento?**  
  No por ahora.

#### Brayan Mica:
- **¿Qué hice ayer?**  
  Completé los mockups para aceptar pacientes y médicos.
- **¿Qué voy a hacer hoy?**  
  Diseñaré mockups para las vistas de ver pacientes, ver médicos y generar reportes.
- **¿Hay algún impedimento?**  
  Ninguno.

### 📝 Daily 3 - Día 3 (05/03/2025)

#### Alberto Hernández:
- **¿Qué hice ayer?**  
  Avancé con el diseño de la API para la autenticación y registro.
- **¿Qué voy a hacer hoy?**  
  Implementaré el modelo de usuarios y los endpoints de registro y login.
- **¿Hay algún impedimento?**  
  No hay impedimentos.

#### Dilan Suy:
- **¿Qué hice ayer?**  
  Configuré el proyecto de frontend y creé algunos componentes básicos.
- **¿Qué voy a hacer hoy?**  
  Implementaré la estructura básica de la vista de gestión de citas.
- **¿Hay algún impedimento?**  
  Alberto me comentó que tendrá listas las primeras definiciones de API hoy, así que no hay impedimentos.

#### Carlos Cox:
- **¿Qué hice ayer?**  
  Ayudé con la configuración del frontend y creé componentes de navegación.
- **¿Qué voy a hacer hoy?**  
  Comenzaré a implementar la vista de atender paciente.
- **¿Hay algún impedimento?**  
  Ninguno.

#### Melvin Valencia:
- **¿Qué hice ayer?**  
  Configuré el proyecto de frontend para el módulo de pacientes.
- **¿Qué voy a hacer hoy?**  
  Implementaré la estructura básica de la página principal y la vista de programar cita.
- **¿Hay algún impedimento?**  
  No por ahora.

#### Andrés Quezada:
- **¿Qué hice ayer?**  
  Trabajé en la estructura base de los componentes para las vistas del paciente.
- **¿Qué voy a hacer hoy?**  
  Continuaré con la implementación de la lista de citas activas.
- **¿Hay algún impedimento?**  
  Sigo esperando la definición del API.

#### Brayan Mica:
- **¿Qué hice ayer?**  
  Completé los mockups para las vistas de ver pacientes, ver médicos y generar reportes.
- **¿Qué voy a hacer hoy?**  
  Comenzaré a implementar la vista de aceptar pacientes y médicos.
- **¿Hay algún impedimento?**  
  Ninguno por ahora.

### 📝 Daily 4 - Día 4 (10/03/2025)

#### Alberto Hernández:
- **¿Qué hice ayer?**  
  Implementé el modelo de usuarios y los endpoints de registro y login.
- **¿Qué voy a hacer hoy?**  
  Trabajaré en la implementación del encriptado de contraseñas y la autenticación con JWT.
- **¿Hay algún impedimento?**  
  No hay impedimentos.

#### Dilan Suy:
- **¿Qué hice ayer?**  
  Implementé la estructura básica de la vista de gestión de citas.
- **¿Qué voy a hacer hoy?**  
  Continuaré con la implementación de la vista para establecer horarios.
- **¿Hay algún impedimento?**  
  Ninguno, Alberto ya compartió la documentación de los endpoints.

#### Carlos Cox:
- **¿Qué hice ayer?**  
  Comencé a implementar la vista de atender paciente.
- **¿Qué voy a hacer hoy?**  
  Terminaré la vista de atender paciente y comenzaré con la de cancelar cita.
- **¿Hay algún impedimento?**  
  Ninguno.

#### Melvin Valencia:
- **¿Qué hice ayer?**  
  Implementé la estructura básica de la página principal y la vista de programar cita.
- **¿Qué voy a hacer hoy?**  
  Continuaré con el desarrollo de la vista para programar cita, añadiendo la validación de horarios.
- **¿Hay algún impedimento?**  
  No por ahora.

#### Andrés Quezada:
- **¿Qué hice ayer?**  
  Continué con la implementación de la lista de citas activas.
- **¿Qué voy a hacer hoy?**  
  Terminaré la implementación de la lista de citas activas y comenzaré con el historial de citas.
- **¿Hay algún impedimento?**  
  No, Alberto ya compartió la documentación del API.

#### Brayan Mica:
- **¿Qué hice ayer?**  
  Comencé a implementar la vista de aceptar pacientes y médicos.
- **¿Qué voy a hacer hoy?**  
  Continuaré con la implementación de las vistas de aceptar pacientes y médicos.
- **¿Hay algún impedimento?**  
  No hay impedimentos.

### 📝 Daily 5 - Día 5 (11/03/2025)

#### Alberto Hernández:
- **¿Qué hice ayer?**  
  Implementé el encriptado de contraseñas y la autenticación con JWT.
- **¿Qué voy a hacer hoy?**  
  Desarrollaré los endpoints para el módulo de pacientes.
- **¿Hay algún impedimento?**  
  No hay impedimentos.

#### Dilan Suy:
- **¿Qué hice ayer?**  
  Continué con la implementación de la vista para establecer horarios.
- **¿Qué voy a hacer hoy?**  
  Terminaré la vista de establecer horarios y comenzaré a integrarla con el API.
- **¿Hay algún impedimento?**  
  Necesito que Alberto termine los endpoints relacionados con los horarios.

#### Carlos Cox:
- **¿Qué hice ayer?**  
  Terminé la vista de atender paciente y comencé con la de cancelar cita.
- **¿Qué voy a hacer hoy?**  
  Terminaré la implementación de la vista de cancelar cita.
- **¿Hay algún impedimento?**  
  Ninguno.

#### Melvin Valencia:
- **¿Qué hice ayer?**  
  Continué con el desarrollo de la vista para programar cita, añadiendo la validación de horarios.
- **¿Qué voy a hacer hoy?**  
  Terminaré la vista de programar cita y comenzaré a integrarla con el API.
- **¿Hay algún impedimento?**  
  Estoy esperando que Alberto termine los endpoints de programación de citas.

#### Andrés Quezada:
- **¿Qué hice ayer?**  
  Terminé la implementación de la lista de citas activas y comencé con el historial de citas.
- **¿Qué voy a hacer hoy?**  
  Continuaré con la implementación del historial de citas y la funcionalidad de cancelar cita.
- **¿Hay algún impedimento?**  
  Ninguno por ahora.

#### Brayan Mica:
- **¿Qué hice ayer?**  
  Continué con la implementación de las vistas de aceptar pacientes y médicos.
- **¿Qué voy a hacer hoy?**  
  Terminaré las vistas de aceptar pacientes y médicos, y comenzaré con las de ver pacientes y médicos.
- **¿Hay algún impedimento?**  
  Necesito que Alberto implemente los endpoints para aceptar/rechazar usuarios.

### 📝 Daily 6 - Día 6 (12/03/2025)

#### Alberto Hernández:
- **¿Qué hice ayer?**  
  Desarrollé los endpoints para el módulo de pacientes.
- **¿Qué voy a hacer hoy?**  
  Implementaré los endpoints para el módulo de médicos y la programación de citas.
- **¿Hay algún impedimento?**  
  No hay impedimentos.

#### Dilan Suy:
- **¿Qué hice ayer?**  
  Terminé la vista de establecer horarios y comencé a integrarla con el API.
- **¿Qué voy a hacer hoy?**  
  Trabajaré en la integración de la vista de gestión de citas con el API.
- **¿Hay algún impedimento?**  
  Alberto me confirmó que terminará hoy los endpoints necesarios.

#### Carlos Cox:
- **¿Qué hice ayer?**  
  Terminé la implementación de la vista de cancelar cita.
- **¿Qué voy a hacer hoy?**  
  Comenzaré a trabajar en la implementación de la vista del historial de citas del médico.
- **¿Hay algún impedimento?**  
  Ninguno.

#### Melvin Valencia:
- **¿Qué hice ayer?**  
  Terminé la vista de programar cita y comencé a integrarla con el API.
- **¿Qué voy a hacer hoy?**  
  Continuaré con la integración de la programación de citas y trabajaré en la vista principal de pacientes.
- **¿Hay algún impedimento?**  
  No por ahora.

#### Andrés Quezada:
- **¿Qué hice ayer?**  
  Continué con la implementación del historial de citas y la funcionalidad de cancelar cita.
- **¿Qué voy a hacer hoy?**  
  Terminaré la implementación del historial de citas y comenzaré a integrar las vistas con el API.
- **¿Hay algún impedimento?**  
  Ninguno.

#### Brayan Mica:
- **¿Qué hice ayer?**  
  Terminé las vistas de aceptar pacientes y médicos, y comencé con las de ver pacientes y médicos.
- **¿Qué voy a hacer hoy?**  
  Continuaré con la implementación de las vistas de ver pacientes y médicos.
- **¿Hay algún impedimento?**  
  Estoy esperando que Alberto termine los endpoints para los listados de usuarios.

#### 📝 Sprint Retrospective (16/03/2025)

[SPRINT Retrospective](https://drive.google.com/file/d/11cJIk_I3MUi1tXFhYEtkzN2XfM53690y/view?usp=sharing)

![Sprint Planning](./img/sprint%201%20final.png)


### SPRINT 2 (16/03/2025)

[SPRINT Planning](https://drive.google.com/file/d/1DuH-bjc7UkMLgu7G-Zc4HXbcCw8KHO6B/view?usp=sharing)

![Sprint Planning](./img/sprint%202%20inicio.png)

### 📝 Daily 1 (17/03/2025)

#### Alberto Hernández:
- **¿Qué hice ayer?**  
  Implementé los endpoints para el módulo de médicos y la programación de citas.  
- **¿Qué voy a hacer hoy?**  
  Desarrollaré los endpoints para la gestión de citas y para el módulo de administrador.  
- **¿Hay algún impedimento?**  
  No hay impedimentos.  

#### Dilan Suy:
- **¿Qué hice ayer?**  
  Trabajé en la integración de la vista de gestión de citas con el API.  
- **¿Qué voy a hacer hoy?**  
  Terminaré la integración de la gestión de citas y probaré su funcionamiento.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Carlos Cox:
- **¿Qué hice ayer?**  
  Comencé a trabajar en la implementación de la vista del historial de citas del médico.  
- **¿Qué voy a hacer hoy?**  
  Terminaré la vista del historial de citas y comenzaré a integrarla con el API.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Melvin Valencia:
- **¿Qué hice ayer?**  
  Continué con la integración de la programación de citas y trabajé en la vista principal de pacientes.  
- **¿Qué voy a hacer hoy?**  
  Terminaré la integración de la vista principal y de programar cita.  
- **¿Hay algún impedimento?**  
  No por ahora.  

#### Andrés Quezada:
- **¿Qué hice ayer?**  
  Terminé la implementación del historial de citas y comencé a integrar las vistas con el API.  
- **¿Qué voy a hacer hoy?**  
  Continuaré con la integración de la lista de citas activas y la funcionalidad de cancelar cita.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Brayan Mica:
- **¿Qué hice ayer?**  
  Continué con la implementación de las vistas de ver pacientes y médicos.  
- **¿Qué voy a hacer hoy?**  
  Terminaré las vistas de ver pacientes y médicos, y comenzaré con las de generar reportes.  
- **¿Hay algún impedimento?**  
  No, Alberto me confirmó que hoy implementará los endpoints necesarios.  

---

### 📝 Daily 2 (18/03/2025)

#### Alberto Hernández:
- **¿Qué hice ayer?**  
  Desarrollé los endpoints para la gestión de citas y para el módulo de administrador.  
- **¿Qué voy a hacer hoy?**  
  Implementaré los endpoints para la generación de reportes y comenzaré con las pruebas unitarias.  
- **¿Hay algún impedimento?**  
  No hay impedimentos.  

#### Dilan Suy:
- **¿Qué hice ayer?**  
  Terminé la integración de la gestión de citas y probé su funcionamiento.  
- **¿Qué voy a hacer hoy?**  
  Trabajaré en corregir algunos errores encontrados y mejorar la interfaz de usuario.  
- **¿Hay algún impedimento?**  
  Encontré algunos problemas en la integración que necesito resolver.  

#### Carlos Cox:
- **¿Qué hice ayer?**  
  Terminé la vista del historial de citas y comencé a integrarla con el API.  
- **¿Qué voy a hacer hoy?**  
  Finalizaré la integración del historial de citas y comenzaré a probar todas las funcionalidades.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Melvin Valencia:
- **¿Qué hice ayer?**  
  Terminé la integración de la vista principal y de programar cita.  
- **¿Qué voy a hacer hoy?**  
  Realizaré pruebas de las funcionalidades y corregiré los errores encontrados.  
- **¿Hay algún impedimento?**  
  No por ahora.  

#### Andrés Quezada:
- **¿Qué hice ayer?**  
  Continué con la integración de la lista de citas activas y la funcionalidad de cancelar cita.  
- **¿Qué voy a hacer hoy?**  
  Terminaré la integración del historial de citas y probaré todas las funcionalidades del módulo de pacientes.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Brayan Mica:
- **¿Qué hice ayer?**  
  Terminé las vistas de ver pacientes y médicos, y comencé con las de generar reportes.  
- **¿Qué voy a hacer hoy?**  
  Continuaré con la implementación de los reportes y comenzaré la integración con el API.  
- **¿Hay algún impedimento?**  
  Estoy esperando que Alberto termine los endpoints para los reportes.  

---

### 📝 Daily 3 (19/03/2025)

#### Alberto Hernández:
- **¿Qué hice ayer?**  
  Implementé los endpoints para la generación de reportes y comencé con las pruebas unitarias.  
- **¿Qué voy a hacer hoy?**  
  Continuaré con las pruebas unitarias y comenzaré a preparar el despliegue con Docker.  
- **¿Hay algún impedimento?**  
  No hay impedimentos.  

#### Dilan Suy:
- **¿Qué hice ayer?**  
  Trabajé en corregir algunos errores encontrados y mejoré la interfaz de usuario.  
- **¿Qué voy a hacer hoy?**  
  Finalizaré las correcciones y comenzaré a preparar la documentación de las funcionalidades implementadas.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Carlos Cox:
- **¿Qué hice ayer?**  
  Finalicé la integración del historial de citas y comencé a probar todas las funcionalidades.  
- **¿Qué voy a hacer hoy?**  
  Continuaré con las pruebas y corregiré los errores encontrados.  
- **¿Hay algún impedimento?**  
  Encontré un error en la cancelación de citas que necesito resolver.  

#### Melvin Valencia:
- **¿Qué hice ayer?**  
  Realicé pruebas de las funcionalidades y corregí los errores encontrados.  
- **¿Qué voy a hacer hoy?**  
  Terminaré las correcciones y trabajaré en mejorar la experiencia de usuario.  
- **¿Hay algún impedimento?**  
  No por ahora.  

#### Andrés Quezada:
- **¿Qué hice ayer?**  
  Terminé la integración del historial de citas y probé todas las funcionalidades del módulo de pacientes.  
- **¿Qué voy a hacer hoy?**  
  Trabajaré en corregir los errores encontrados y mejorar la interfaz de usuario.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Brayan Mica:
- **¿Qué hice ayer?**  
  Continué con la implementación de los reportes y comencé la integración con el API.  
- **¿Qué voy a hacer hoy?**  
  Terminaré la implementación de los reportes y su integración con el API.  
- **¿Hay algún impedimento?**  
  No, Alberto ya implementó los endpoints necesarios.  

---

![Sprint Planning](./img/sprint%202%20durante.png)

### 📝 Daily 4 (24/03/2025)

#### Alberto Hernández:
- **¿Qué hice ayer?**  
  Continué con las pruebas unitarias y comencé a preparar el despliegue con Docker.  
- **¿Qué voy a hacer hoy?**  
  Finalizaré las configuraciones de Docker y continuaré con las pruebas unitarias.  
- **¿Hay algún impedimento?**  
  No hay impedimentos.  

#### Dilan Suy:
- **¿Qué hice ayer?**  
  Finalicé las correcciones y comencé a preparar la documentación de las funcionalidades implementadas.  
- **¿Qué voy a hacer hoy?**  
  Continuaré con la documentación y ayudaré a Carlos con las pruebas del módulo de médicos.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Carlos Cox:
- **¿Qué hice ayer?**  
  Continué con las pruebas y corregí los errores encontrados.  
- **¿Qué voy a hacer hoy?**  
  Finalizaré las correcciones y comenzaré a preparar la documentación de las funcionalidades implementadas.  
- **¿Hay algún impedimento?**  
  Ninguno, ya resolví el error que encontré.  

#### Melvin Valencia:
- **¿Qué hice ayer?**  
  Terminé las correcciones y trabajé en mejorar la experiencia de usuario.  
- **¿Qué voy a hacer hoy?**  
  Comenzaré a preparar la documentación de las funcionalidades del módulo de pacientes.  
- **¿Hay algún impedimento?**  
  No por ahora.  

#### Andrés Quezada:
- **¿Qué hice ayer?**  
  Trabajé en corregir los errores encontrados y mejorar la interfaz de usuario.  
- **¿Qué voy a hacer hoy?**  
  Finalizaré las correcciones y ayudaré a Melvin con la documentación.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Brayan Mica:
- **¿Qué hice ayer?**  
  Terminé la implementación de los reportes y su integración con el API.  
- **¿Qué voy a hacer hoy?**  
  Realizaré pruebas de las funcionalidades y comenzaré a preparar la documentación.  
- **¿Hay algún impedimento?**  
  Ninguno.  

---

### 📝 Daily 5 (25/03/2025)

#### Alberto Hernández:
- **¿Qué hice ayer?**  
  Finalicé las configuraciones de Docker y continué con las pruebas unitarias.  
- **¿Qué voy a hacer hoy?**  
  Terminaré las pruebas unitarias y ayudaré a resolver cualquier problema de integración que pueda surgir.  
- **¿Hay algún impedimento?**  
  No hay impedimentos.  

#### Dilan Suy:
- **¿Qué hice ayer?**  
  Continué con la documentación y ayudé a Carlos con las pruebas del módulo de médicos.  
- **¿Qué voy a hacer hoy?**  
  Finalizaré la documentación y realizaré pruebas integrales del sistema.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Carlos Cox:
- **¿Qué hice ayer?**  
  Finalicé las correcciones y comencé a preparar la documentación de las funcionalidades implementadas.  
- **¿Qué voy a hacer hoy?**  
  Terminaré la documentación y realizaré pruebas finales de todas las funcionalidades.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Melvin Valencia:
- **¿Qué hice ayer?**  
  Comencé a preparar la documentación de las funcionalidades del módulo de pacientes.  
- **¿Qué voy a hacer hoy?**  
  Terminaré la documentación y realizaré pruebas finales de todas las funcionalidades.  
- **¿Hay algún impedimento?**  
  No por ahora.  

#### Andrés Quezada:
- **¿Qué hice ayer?**  
  Finalicé las correcciones y ayudé a Melvin con la documentación.  
- **¿Qué voy a hacer hoy?**  
  Realizaré pruebas integrales del sistema y ayudaré a resolver cualquier problema que pueda surgir.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Brayan Mica:
- **¿Qué hice ayer?**  
  Realicé pruebas de las funcionalidades y comencé a preparar la documentación.  
- **¿Qué voy a hacer hoy?**  
  Finalizaré la documentación y las pruebas del módulo de administrador.  
- **¿Hay algún impedimento?**  
  Ninguno.  

---

### 📝 Daily 6 (26/03/2025)

#### Alberto Hernández:
- **¿Qué hice ayer?**  
  Terminé las pruebas unitarias y ayudé a resolver problemas de integración.  
- **¿Qué voy a hacer hoy?**  
  Realizaré las últimas pruebas del sistema y prepararé todo para la entrega final.  
- **¿Hay algún impedimento?**  
  No hay impedimentos.  

#### Dilan Suy:
- **¿Qué hice ayer?**  
  Finalicé la documentación y realicé pruebas integrales del sistema.  
- **¿Qué voy a hacer hoy?**  
  Realizaré ajustes finales a la interfaz de usuario y prepararé la demostración para la entrega.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Carlos Cox:
- **¿Qué hice ayer?**  
  Terminé la documentación y realicé pruebas finales de todas las funcionalidades.  
- **¿Qué voy a hacer hoy?**  
  Ayudaré con los últimos ajustes y prepararé la demostración del módulo de médicos.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Melvin Valencia:
- **¿Qué hice ayer?**  
  Terminé la documentación y realicé pruebas finales de todas las funcionalidades.  
- **¿Qué voy a hacer hoy?**  
  Realizaré ajustes finales a la interfaz de usuario y prepararé la demostración del módulo de pacientes.  
- **¿Hay algún impedimento?**  
  No por ahora.  

#### Andrés Quezada:
- **¿Qué hice ayer?**  
  Realicé pruebas integrales del sistema y ayudé a resolver problemas.  
- **¿Qué voy a hacer hoy?**  
  Ayudaré con los últimos ajustes y prepararé la demostración de las funcionalidades que implementé.  
- **¿Hay algún impedimento?**  
  Ninguno.  

#### Brayan Mica:
- **¿Qué hice ayer?**  
  Finalicé la documentación y las pruebas del módulo de administrador.  
- **¿Qué voy a hacer hoy?**  
  Realizaré ajustes finales y prepararé la demostración del módulo de administrador.  
- **¿Hay algún impedimento?**  
  Ninguno.  

### 📝 Sprint Retrospective (16/03/2025)

[SPRINT Retrospective](https://drive.google.com/file/d/1MlXHcu5KlO_egzNPi8rBQrXBN_-BjFnG/view?usp=sharing)

![Sprint Planning](./img/sprint%202%20final.png)
---
## 🎓 Elaborado por

<div align="center">
  <p><strong>Grupo 9</strong><br>
  <p>© 2025. Todos los derechos reservados.</p>
</div>