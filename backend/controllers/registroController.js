// controllers/registroController.js

// Simulación de una base de datos en memoria (sólo para demostración)
let registros = [];

// Función para guardar datos enviados desde RegistroFac
export const guardarRegistro = (req, res) => {
    const data = req.body; // Obtener datos del cuerpo de la solicitud
    registros.push(data); // Agregar los datos a la "base de datos" en memoria
    res.status(201).json({ message: 'Registro guardado correctamente', data });
};

// Función para obtener todos los registros guardados
export const obtenerRegistros = (req, res) => {
    res.status(200).json(registros); // Devolver todos los registros guardados
};