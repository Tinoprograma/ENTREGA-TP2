// Persistencia en memoria
let libros = [
    { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", anio: 1967 },
    { id: 2, titulo: "1984", autor: "George Orwell", anio: 1949 },
    { id: 3, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", anio: 1605 }
];
let nextId = libros.length > 0 ? libros[libros.length - 1].id + 1 : 1;

/**
 * Lógica para interactuar con el array de libros (CRUD Básico).
 */
const dataStore = {
    // Obtiene todos los libros
    getAll: () => libros,
    
    // Obtiene un libro por su ID
    getById: (id) => libros.find(b => b.id === id),
    
    // Agrega un nuevo libro
    add: (book) => {
        // Asegura que 'anio' sea un número y asigna el siguiente ID
        const newBook = { id: nextId++, ...book, anio: parseInt(book.anio) };
        libros.push(newBook);
        return newBook;
    },
    
    // Actualiza campos de un libro por ID
    update: (id, updatedFields) => {
        const index = libros.findIndex(b => b.id === id);
        if (index === -1) return null;
        
        // Convertir 'anio' a número si está presente
        if (updatedFields.anio) {
            updatedFields.anio = parseInt(updatedFields.anio);
        }
        
        // Fusionar campos manteniendo el ID original
        libros[index] = { ...libros[index], ...updatedFields, id: id };
        return libros[index];
    },
    
    // Elimina un libro por ID
    remove: (id) => {
        const index = libros.findIndex(b => b.id === id);
        if (index === -1) return false;
        libros.splice(index, 1);
        return true;
    }
};

module.exports = dataStore;