const express = require('express');
const bookController = require('./book_controller');
const router = express.Router();

// Definición de las rutas CRUD para el recurso /libros

// GET /libros - Obtiene todos los libros
router.get('/', bookController.getAllBooks);

// GET /libros/:id - Obtiene un libro por ID
router.get('/:id', bookController.getBookById);

// POST /libros - Crea un nuevo libro
router.post('/', bookController.createBook);

// PUT /libros/:id - Actualiza un libro por ID
router.put('/:id', bookController.updateBook);

// DELETE /libros/:id - Borra un libro por ID
router.delete('/:id', bookController.deleteBook);

module.exports = router;