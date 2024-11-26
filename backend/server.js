import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { guardarRegistro, obtenerRegistros } from './controllers/registroController.js';  // Asegúrate de incluir la extensión '.js'

const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/miapp')
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.log('Error al conectar a MongoDB:', error));


// Punto final para guardar datos enviados desde RegistroFac
app.post('/api/registrofac', guardarRegistro);

// Punto final para obtener y enviar datos guardados a Register
app.get('/api/register', obtenerRegistros);

// Configuración del puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
