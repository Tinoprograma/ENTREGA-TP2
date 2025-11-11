const dataStore = require('./data_model');

const bookController = {
    // GET /libros
    getAllBooks: (req, res) => {
        res.status(200).json(dataStore.getAll());
    },

    // GET /libros/:id
    getBookById: (req, res) => {
        const id = parseInt(req.params.id);
        const book = dataStore.getById(id);
        
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: `Libro con ID ${id} no encontrado` });
        }
    },

    // POST /libros
    createBook: (req, res) => {
        // Nota: se usa 'anio' en el modelo, pero se acepta 'año' o 'anio' en el body por la consistencia del formulario anterior
        const { titulo, autor } = req.body;
        // Permite 'año' o 'anio' del body, usando 'anio' como nombre de propiedad interna
        const anio = req.body.anio || req.body.año; 
        
        // Validación de campos requeridos
        if (!titulo || !autor || !anio) {
            return res.status(400).json({ 
                message: "Faltan campos requeridos: 'titulo', 'autor' y 'anio/año'." 
            });
        }

        const newBook = dataStore.add({ titulo, autor, anio });
        res.status(201).json(newBook);
    },

    // PUT /libros/:id
    updateBook: (req, res) => {
        const id = parseInt(req.params.id);
        const updatedFields = req.body;
        
        if (Object.keys(updatedFields).length === 0) {
             return res.status(400).json({ message: "Cuerpo de la solicitud vacío. No hay campos para actualizar." });
        }
        
        // Si el body trae 'año', lo renombramos a 'anio' para el modelo de datos
        if (updatedFields.año && !updatedFields.anio) {
            updatedFields.anio = updatedFields.año;
            delete updatedFields.año;
        }

        const updatedBook = dataStore.update(id, updatedFields);
        
        if (updatedBook) {
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({ message: `Libro con ID ${id} no encontrado para actualizar` });
        }
    },

    // DELETE /libros/:id
    deleteBook: (req, res) => {
        const id = parseInt(req.params.id);
        const success = dataStore.remove(id);
        
        if (success) {
            // 204 No Content indica borrado exitoso
            res.status(204).send(); 
        } else {
            res.status(404).json({ message: `Libro con ID ${id} no encontrado para borrar` });
        }
    }
};

module.exports = bookController;