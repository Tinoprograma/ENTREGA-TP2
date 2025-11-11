const express = require('express');
const bookRoutes = require('./book_routes');
const app = express();
const PORT = 8080;

// =======================================================
// MIDDLEWARES
// =======================================================

// Middleware para parsear bodies JSON (ej: Postman)
app.use(express.json()); 

// Middleware para parsear bodies de formularios URL-encoded (necesario para PUT/DELETE en algunos clientes)
app.use(express.urlencoded({ extended: true })); 

// =======================================================
// RUTAS
// =======================================================

// Conecta las rutas de libros bajo el prefijo /libros
app.use('/libros', bookRoutes);

// Ruta de bienvenida simple (sin la interfaz pública)
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: "Bienvenido a la API REST de Libros. Usa el endpoint /libros para interactuar.",
        endpoints: [
            "GET /libros (Obtener todos)",
            "GET /libros/:id (Obtener por ID)",
            "POST /libros (Crear nuevo)",
            "PUT /libros/:id (Actualizar por ID)",
            "DELETE /libros/:id (Borrar por ID)"
        ]
    });
});

// =======================================================
// INICIO DEL SERVIDOR
// =======================================================

app.listen(PORT, () => {
    console.log(`\n====================================================================`);
    console.log(`🚀 Servidor Express para la API REST de Libros iniciado!`);
    console.log(`🔗 Escuchando en el puerto: ${PORT}`);
    console.log(`====================================================================`);
});