// maptc.js

const fs = require('fs').promises; // Importamos la versión con promesas
const path = require('path');

const FILE_TO_READ = 'package.json';
const FILE_TO_WRITE = 'info.txt';

/**
 * Realiza la lectura asíncrona de package.json usando promises, crea el objeto info
 * y lo guarda asíncronamente en info.txt, usando then/catch.
 */
function procesarArchivoConPromises() {
    const filePath = path.join(__dirname, FILE_TO_READ);
    let info = null; // Variable para almacenar el objeto info

    // 1. Leer el archivo package.json (promesa)
    fs.readFile(filePath, 'utf8')
        .then(contenidoStr => {
            // Procesamiento de datos
            const size = Buffer.byteLength(contenidoStr, 'utf8');
            const contenidoObj = JSON.parse(contenidoStr);

            // Declarar el objeto info
            info = {
                contenidoStr: contenidoStr,
                contenidoObj: contenidoObj,
                size: size
            };
            
            // 2. Mostrar por consola el objeto info
            console.log("--- OBJETO INFO (Modo Promises then/catch) ---");
            console.log(info);
            console.log("-----------------------------------------------");
            
            // 3. Serializar y devolver la promesa de escritura
            const infoStr = JSON.stringify(info, null, '\t');
            const writePath = path.join(__dirname, FILE_TO_WRITE);
            
            return fs.writeFile(writePath, infoStr, 'utf8');
        })
        .then(() => {
            // Esta parte se ejecuta si la escritura fue exitosa
            console.log(`✅ Archivo '${FILE_TO_WRITE}' creado y guardado exitosamente con then/catch.`);
        })
        .catch(error => {
            // 4. Manejo de errores (captura errores de lectura, parsing y escritura)
            console.error("❌ Ocurrió un error en el modo promises (then/catch):", error.message);
            if (error.code === 'ENOENT') {
                console.error(`Asegúrate de que el archivo '${FILE_TO_READ}' exista en el directorio.`);
            }
        });
}

procesarArchivoConPromises();