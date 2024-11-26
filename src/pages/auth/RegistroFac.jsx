import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './RegistroFac.css';
import { FaSignOutAlt } from 'react-icons/fa'; 

const RegistroFac = () => {
  const navigate = useNavigate(); 

  const [factura, setFactura] = useState({
    numero: '',
    monto: '',
    categoria: '',
    vendedor: '',
    ciudad: '',
    fecha: ''
  });

  // Inicializamos con 10 registros predeterminados
  const facturasIniciales = [
    { numero: '001', monto: '1000', categoria: 'Laptop', vendedor: 'Carlos', ciudad: 'Medellin', fecha: '2024-11-01' },
    { numero: '002', monto: '150', categoria: 'Celulares', vendedor: 'Ana', ciudad: 'Cali', fecha: '2024-11-02' },
    { numero: '003', monto: '300', categoria: 'Tablet', vendedor: 'Luis', ciudad: 'Bogota', fecha: '2024-11-03' },
    { numero: '004', monto: '800', categoria: 'Laptop', vendedor: 'Marta', ciudad: 'Cartagena', fecha: '2024-11-04' },
    { numero: '005', monto: '500', categoria: 'Audífonos', vendedor: 'Raúl', ciudad: 'Cali', fecha: '2024-11-05' },
    { numero: '006', monto: '250', categoria: 'DDS', vendedor: 'Sofia', ciudad: 'Medellin', fecha: '2024-11-06' },
    { numero: '007', monto: '100', categoria: 'Celulares', vendedor: 'José', ciudad: 'Bogota', fecha: '2024-11-07' },
    { numero: '008', monto: '1200', categoria: 'Laptop', vendedor: 'Elena', ciudad: 'Medellin', fecha: '2024-11-08' },
    { numero: '009', monto: '200', categoria: 'Audífonos', vendedor: 'Daniel', ciudad: 'Cali', fecha: '2024-11-09' },
    { numero: '010', monto: '50', categoria: 'Tablet', vendedor: 'Pedro', ciudad: 'Bogota', fecha: '2024-11-10' }
  ];

  const [facturasList, setFacturasList] = useState([]);

  // Cargar facturas desde localStorage al montar el componente
  useEffect(() => {
    const facturasGuardadas = localStorage.getItem('facturas');
    if (facturasGuardadas) {
      setFacturasList(JSON.parse(facturasGuardadas));
    } else {
      setFacturasList(facturasIniciales);
    }
  }, []);

  // Guardar facturas en localStorage cada vez que facturasList cambie
  useEffect(() => {
    localStorage.setItem('facturas', JSON.stringify(facturasList));
  }, [facturasList]);

  // Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    setFactura({ ...factura, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Guardamos el nuevo registro en la lista
    setFacturasList([...facturasList, factura]);
    // Limpiamos los campos del formulario
    setFactura({
      numero: '',
      monto: '',
      categoria: '',
      vendedor: '',
      ciudad: '',
      fecha: ''
    });
   
    Swal.fire({
      title: 'Éxito',
      text: 'Factura registrada con éxito',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  };

  const handleLogout = () => {
    navigate('/Login');
  };

  const handleDelete = (index) => {
    // Eliminamos el registro seleccionado
    const newList = facturasList.filter((_, i) => i !== index);
    setFacturasList(newList);
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

        <h1>Ingresar Facturas</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
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
            <label htmlFor="categoria">Categoría:</label>
            <select
              id="categoria"
              name="categoria"
              value={factura.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="DDS">DDS</option>
              <option value="Laptop">Laptop</option>
              <option value="Audífonos">Audífonos</option>
              <option value="Tablet">Tablet</option>
              <option value="Celulares">Celulares</option>
            </select>
            <label>
              Vendedor:
              <input
                type="text"
                name="vendedor"
                value={factura.vendedor}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Ciudad:
              <input
                type="text"
                name="ciudad"
                value={factura.ciudad}
                onChange={handleChange}
                required
              />
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
              <button type="submit" className="register-btn">Guardar</button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => setFactura({
                  numero: '',
                  monto: '',
                  categoria: '',
                  vendedor: '',
                  ciudad: '',
                  fecha: ''
                })}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        <div className="results-container">
          <h2>Lista de Facturas</h2>
          <div className="factura-grid">
            {facturasList.map((factura, index) => (
              <div key={index} className="factura-item">
                <div><strong>Factura Nº:</strong> {factura.numero}</div>
                <div><strong>Monto:</strong> {factura.monto}</div>
                <div><strong>Categoría:</strong> {factura.categoria}</div>
                <div><strong>Vendedor:</strong> {factura.vendedor}</div>
                <div><strong>Ciudad:</strong> {factura.ciudad}</div>
                <div><strong>Fecha:</strong> {factura.fecha}</div>
                <button onClick={() => handleDelete(index)} className="delete-btn">Eliminar</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default RegistroFac;
