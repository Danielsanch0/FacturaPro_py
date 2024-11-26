import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Egresos.css';
import './Register.css';
import { FaSignOutAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Register = () => {
    const navigate = useNavigate();

    // Estado para la factura (campo para agregar nueva factura)
    const [factura, setFactura] = useState({
        numero: '',
        monto: '',
        tipoGasto: '',
        medioPago: '',
        estadoPago: '',
        fecha: ''
    });

    // Estado para la lista de facturas
    const [facturasList, setFacturasList] = useState([
        { numero: '001', monto: '1000', tipoGasto: 'Equipo', medioPago: 'Efectivo', estadoPago: 'Pago Realizado', fecha: '2024-11-01' },
        { numero: '002', monto: '150', tipoGasto: 'Mantenimiento', medioPago: 'Tarjeta', estadoPago: 'Pendiente por Pagar', fecha: '2024-11-02' },
        { numero: '003', monto: '300', tipoGasto: 'Equipo', medioPago: 'Transferencia', estadoPago: 'Pago Realizado', fecha: '2024-11-03' },
        { numero: '004', monto: '500', tipoGasto: 'Mantenimiento', medioPago: 'Tarjeta', estadoPago: 'Pago Realizado', fecha: '2024-11-04' },
        { numero: '005', monto: '1200', tipoGasto: 'Equipo', medioPago: 'Efectivo', estadoPago: 'Pendiente por Pagar', fecha: '2024-11-05' },
        { numero: '006', monto: '700', tipoGasto: 'Mantenimiento', medioPago: 'Transferencia', estadoPago: 'Pago Realizado', fecha: '2024-11-06' }
    ]);

    // Maneja los cambios en los campos del formulario de factura
    const handleChange = (e) => {
        setFactura({ ...factura, [e.target.name]: e.target.value });
    };

    // Maneja el envío del formulario de nueva factura
    const handleSubmit = (e) => {
        e.preventDefault();

        // Agregar la nueva factura a la lista
        const nuevaListaDeFacturas = [...facturasList, factura];
        setFacturasList(nuevaListaDeFacturas);

        // Guardar la nueva lista de facturas en localStorage
        localStorage.setItem('gastos', JSON.stringify(nuevaListaDeFacturas));

        // Limpiar los campos del formulario
        setFactura({
            numero: '',
            monto: '',
            tipoGasto: '',
            medioPago: '',
            estadoPago: '',
            fecha: ''
        });

        // Notificación de éxito
        Swal.fire({
            icon: 'success',
            title: 'Factura agregada con éxito',
            showConfirmButton: false,
            timer: 1500
        });
    };

    // Maneja el cierre de sesión
    const handleLogout = () => {
        navigate('/Login');
    };

    return (
        <section className="factura-pro">
            <aside className="sidebar">
                <div className="admin-icon">
                    <img src="public/img/loginPro.jpeg" alt="Profile Icon" className="login" />
                </div>
                
                <nav>
                    <div className='menu'>
                        <ul>
                            <li>
                                <Link to="/RegistroFac">Facturas</Link>
                            </li>
                            <li>
                                <Link to="/Register">Gastos</Link>
                            </li>
                            <li>
                                <Link to="/Egresos">Reportes</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>

            <main className="main-content">
                <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt size={20} />
                </button>

                <h1>Agregar Gasto</h1>

                <div className="input-container">
                    <form onSubmit={handleSubmit} className="horizontal-form">
                        <label>
                            Número de Factura:
                            <input
                                type="text"
                                name="numero"
                                value={factura.numero}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Monto:
                            <input
                                type="number"
                                name="monto"
                                value={factura.monto}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Tipo de Gasto:
                            <select
                                name="tipoGasto"
                                value={factura.tipoGasto}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione un tipo de gasto</option>
                                <option value="Nomina">Nómina</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Impuestos">Impuestos</option>
                                <option value="Insumos">Insumos</option>
                            </select>
                        </label>
                        <label>
                            Medio de Pago:
                            <select
                                name="medioPago"
                                value={factura.medioPago}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione un medio de pago</option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Tarjeta">Tarjeta</option>
                            </select>
                        </label>
                        <label>
                            Estado de Pago:
                            <select
                                name="estadoPago"
                                value={factura.estadoPago}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione el estado de pago</option>
                                <option value="Pago Realizado">Pago Realizado</option>
                                <option value="Pendiente por Pagar">Pendiente por Pagar</option>
                            </select>
                        </label>
                        <label>
                            Fecha:
                            <input
                                type="date"
                                name="fecha"
                                value={factura.fecha}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <div className="button-group">
                            <button type="submit" className="register-btn">Agregar Factura</button>
                            <button 
                                type="button" 
                                className="cancel-btn" 
                                onClick={() => setFactura({
                                    numero: '',
                                    monto: '',
                                    tipoGasto: '',
                                    medioPago: '',
                                    estadoPago: '',
                                    fecha: ''
                                })}
                            >
                                Limpiar
                            </button>
                        </div>
                    </form>
                </div>

                <div className="results-container">
                    <h2>Lista de Gastos</h2>
                    <div className="factura-grid">
                        {facturasList.map((factura, index) => (
                            <div key={index} className="factura-item">
                                <div><strong>Factura Nº:</strong> {factura.numero}</div>
                                <div><strong>Monto:</strong> {factura.monto}</div>
                                <div><strong>Tipo de Gasto:</strong> {factura.tipoGasto}</div>
                                <div><strong>Medio de Pago:</strong> {factura.medioPago}</div>
                                <div><strong>Estado de Pago:</strong> {factura.estadoPago}</div>
                                <div><strong>Fecha:</strong> {factura.fecha}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </section>
    );
};

export default Register;