import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (email === 'facturapro@gmail.com' && password === 'factura123') {
            // Mostrar mensaje de éxito y redirigir al usuario a la página de registro
            Swal.fire({
                title: 'Inicio de sesión exitoso',
                text: 'Bienvenido a Factura Pro',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                navigate('/register'); // Redirige a la página de registro
            });
        } else {
            // Mostrar mensaje de error si las credenciales no coinciden
            Swal.fire({
                title: 'Inicio de sesión fallido',
                text: 'Correo o contraseña incorrectos',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        }
    };

    return (
        <section className="login-container">
            <div className="login-box">
                <img className="logo" src="img/loginPro.jpeg" alt="logo" />
                <form>
                    <section>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </section>
                    <section>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </section>
                    <a href="/RegistrarUsuario">Crea tu Usuario</a>
                    <button type="button" onClick={handleLogin}>Iniciar Sesión</button>
                </form>
            </div>
        </section>
    );
};

export default Login;

