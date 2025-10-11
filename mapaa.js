// mapaa.js

const fs = require('fs').promises; // Importamos la versión con promesas
const path = require('path');

const FILE_TO_READ = 'package.json';
const FILE_TO_WRITE = 'info.txt';

/**
 * Realiza la lectura asíncrona de package.json usando async/await, crea el objeto info
 * y lo guarda asíncronamente en info.txt.
 */
async function procesarArchivoConAsyncAwait() {
    try {
        const filePath = path.join(__dirname, FILE_TO_READ);

        // 1. Leer el archivo package.json usando await
        const contenidoStr = await fs.readFile(filePath, 'utf8');
        
        // Determinar el tamaño en bytes
        const size = Buffer.byteLength(contenidoStr, 'utf8');

        // Deserializar el contenido a objeto
        const contenidoObj = JSON.parse(contenidoStr);

        // Declarar el objeto info
        let info = {
            contenidoStr: contenidoStr,
            contenidoObj: contenidoObj,
            size: size
        };

        // 2. Mostrar por consola el objeto info
        console.log("--- OBJETO INFO (Modo Async/Await) ---");
        console.log(info);
        console.log("--------------------------------------");

        // 3. Serializar el objeto info
        const infoStr = JSON.stringify(info, null, '\t');

        // Guardar el objeto info en info.txt usando await
        const writePath = path.join(__dirname, FILE_TO_WRITE);
        await fs.writeFile(writePath, infoStr, 'utf8');

        console.log(`✅ Archivo '${FILE_TO_WRITE}' creado y guardado exitosamente con async/await.`);
        
    } catch (error) {
        // 4. Manejo de errores usando un bloque try/catch
        console.error("❌ Ocurrió un error en el modo async/await:", error.message);
        if (error.code === 'ENOENT') {
            console.error(`Asegúrate de que el archivo '${FILE_TO_READ}' exista en el directorio.`);
        }
    }
}

procesarArchivoConAsyncAwait();