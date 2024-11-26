import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './RegistroUsuario.css';

function RegistrarUsuario() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Alerta de éxito
    Swal.fire({
      title: 'Registro exitoso',
      text: 'Usuario registrado correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      // Redirigir a la página de login
      navigate('/login');
    });
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <img src="public/img/loginPro.jpeg" alt="Logo" className="logo" />
        <h2>Registrar De Usuario</h2>
        
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <label htmlFor="correo">Correo</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />

        <label htmlFor="contrasena">Contraseña</label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          value={formData.contrasena}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegistrarUsuario;

