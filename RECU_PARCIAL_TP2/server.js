import express from 'express';
import router from './src/routes/index.route.js';

const app = express();
const PORT = 8080;

// entender JSON en el body del POST
app.use(express.json());
// entender datos de formularios simples
app.use(express.urlencoded({ extended: true }));

// Asignamos las rutas
app.use('/', router);

// Inicio del servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor listo escuchando en el puerto ${server.address().port}`);
});

// Manejo de errores básicos del servidor
server.on('error', error => console.log(`Error en servidor: ${error}`));