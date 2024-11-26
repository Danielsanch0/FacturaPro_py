import { jsPDF } from "jspdf";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import './Egresos.css';

const Egresos = () => {
  const [facturas, setFacturas] = useState([]);
  const [gastos, setGastos] = useState([]); // Estado para los gastos
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState(''); // Filtro para "Facturas" o "Gastos"

  // Cargar facturas y gastos desde localStorage al montar el componente
  useEffect(() => {
    const facturasGuardadas = localStorage.getItem('facturas');
    if (facturasGuardadas) {
      setFacturas(JSON.parse(facturasGuardadas));
    }

    const gastosGuardados = localStorage.getItem('gastos');
    if (gastosGuardados) {
      setGastos(JSON.parse(gastosGuardados));
    }
  }, []);

  // Filtra las facturas según los filtros establecidos
  const obtenerFacturasFiltradas = () => {
    return facturas.filter(factura =>
      (fechaFiltro === '' || factura.fecha === fechaFiltro)
    );
  };

  // Filtra los gastos según los filtros establecidos
  const obtenerGastosFiltrados = () => {
    return gastos.filter(gasto =>
      (fechaFiltro === '' || gasto.fecha === fechaFiltro)
    );
  };

  // Función para descargar el PDF
  const descargarPDF = () => {
    const facturasFiltradas = obtenerFacturasFiltradas();
    const gastosFiltrados = obtenerGastosFiltrados();

    const doc = new jsPDF();

    // Mostrar solo las facturas si el tipoFiltro es 'Facturas' o si no hay filtro seleccionado
    if (tipoFiltro === 'Facturas' || tipoFiltro === '') {
      facturasFiltradas.forEach((factura, index) => {
        doc.text(`Factura Registrada:`, 10, 10 + (index * 10));
        doc.text(`Número: ${factura.numero}`, 10, 20 + (index * 10));
        doc.text(`Monto: ${factura.monto}`, 10, 30 + (index * 10));
        doc.text(`Categoría: ${factura.categoria}`, 10, 40 + (index * 10));
        doc.text(`Vendedor: ${factura.vendedor}`, 10, 50 + (index * 10));
        doc.text(`Ciudad: ${factura.ciudad}`, 10, 60 + (index * 10));
        doc.text(`Fecha: ${factura.fecha}`, 10, 70 + (index * 10));
        if (index < facturasFiltradas.length - 1) doc.addPage();
      });
    }

    // Mostrar solo los gastos si el tipoFiltro es 'Gastos' o si no hay filtro seleccionado
    if (tipoFiltro === 'Gastos' || tipoFiltro === '') {
      gastosFiltrados.forEach((gasto, index) => {
        doc.text(`Gasto Registrado:`, 10, 10 + (index * 10));
        doc.text(`Número: ${gasto.numero}`, 10, 20 + (index * 10));
        doc.text(`Monto: ${gasto.monto}`, 10, 30 + (index * 10));
        doc.text(`Tipo de Gasto: ${gasto.tipoGasto}`, 10, 40 + (index * 10));
        doc.text(`Medio de Pago: ${gasto.medioPago}`, 10, 50 + (index * 10));
        doc.text(`Estado de Pago: ${gasto.estadoPago}`, 10, 60 + (index * 10));
        doc.text(`Fecha: ${gasto.fecha}`, 10, 70 + (index * 10));
        if (index < gastosFiltrados.length - 1) doc.addPage();
      });
    }

    doc.save('Ingresos_y_Egresos.pdf');
  };

  // Función para descargar las facturas y gastos en formato Excel
  const descargarExcel = () => {
    const facturasFiltradas = obtenerFacturasFiltradas();
    const gastosFiltrados = obtenerGastosFiltrados();

    const facturasYgastos = [...facturasFiltradas, ...gastosFiltrados];

    if (facturasYgastos.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(facturasYgastos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Facturas_y_Gastos");
    XLSX.writeFile(workbook, "Facturas_y_Gastos.xlsx");
  };

  // Manejar el cambio en el filtro de fecha
  const handleFechaChange = (e) => {
    setFechaFiltro(e.target.value);
  };

  // Manejar el cambio en el filtro de tipo (Factura o Gasto)
  const handleTipoFiltroChange = (e) => {
    setTipoFiltro(e.target.value);
  };

  // Función para manejar el logout
  const handleLogout = () => {
    window.location.href = '/Login'; // Redirige a la página de inicio de sesión
  };

  const facturasFiltradas = obtenerFacturasFiltradas();
  const gastosFiltrados = obtenerGastosFiltrados();

  return (
    <div className="container">
      <div className="sidebar">
        <div className="profile">
          <img src="/img/loginPro.jpeg" alt="Logo Factura Pro" />
        </div>
        
        <ul className="menu">
          <li><a href="/RegistroFac">Facturas</a></li>
          <li><a href="/Register">Gastos</a></li>
          <li><a href="/Egresos">Reportes</a></li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Salir</button>
      </div>

      <main className="main-content">
        <h1>Reporte sobre ingresos y egresos</h1>
        <div className="filtros">
          <label>
            Filtrar por fecha:
            <input type="date" value={fechaFiltro} onChange={handleFechaChange} />
          </label>
          <label>
            Filtrar por tipo:
            <select value={tipoFiltro} onChange={handleTipoFiltroChange}>
              <option value="">Todos</option>
              <option value="Facturas">Facturas</option>
              <option value="Gastos">Gastos</option>
            </select>
          </label>
        </div>

        <section className="report">
          <section className="section">
            <h2>Descargar Factura</h2>
            <div className="download-icons">
              <img src="/img/logoexcel.jpeg" alt="Descargar Excel" onClick={descargarExcel} />
              <img src="/img/logopdf.jpeg" alt="Descargar PDF" onClick={descargarPDF} />
            </div>
          </section>
        </section>

        {facturasFiltradas.length > 0 || gastosFiltrados.length > 0 ? (
          <>
            {tipoFiltro === 'Facturas' || tipoFiltro === '' ? (
              facturasFiltradas.map((factura, index) => (
                <div className="factura" key={index}>
                  <h2>Factura Registrada:</h2>
                  <p>Número: {factura.numero}</p>
                  <p>Monto: {factura.monto}</p>
                  <p>Categoría: {factura.categoria}</p>
                  <p>Vendedor: {factura.vendedor}</p>
                  <p>Ciudad: {factura.ciudad}</p>
                  <p>Fecha: {factura.fecha}</p>
                </div>
              ))
            ) : null}

            {tipoFiltro === 'Gastos' || tipoFiltro === '' ? (
              gastosFiltrados.map((gasto, index) => (
                <div className="gasto" key={index}>
                  <h2>Gasto Registrado:</h2>
                  <p>Número: {gasto.numero}</p>
                  <p>Monto: {gasto.monto}</p>
                  <p>Tipo de Gasto: {gasto.tipoGasto}</p>
                  <p>Medio de Pago: {gasto.medioPago}</p>
                  <p>Estado de Pago: {gasto.estadoPago}</p>
                  <p>Fecha: {gasto.fecha}</p>
                </div>
              ))
            ) : null}
          </>
        ) : (
          <p>No se encontraron facturas o gastos con los filtros seleccionados.</p>
        )}
      </main>
    </div>
  );
};

export default Egresos;

