// ms.js

const fs = require('fs');
const path = require('path');

// Nombre del archivo a leer (package.json)
const FILE_TO_READ = 'package.json';
// Nombre del archivo donde guardar la información (info.txt)
const FILE_TO_WRITE = 'info.txt';

/**
 * Realiza la lectura síncrona de package.json, crea el objeto info
 * y lo guarda síncronamente en info.txt.
 */
function procesarArchivoSincrono() {
    try {
        // 1. Leer el archivo package.json de forma síncrona
        const filePath = path.join(__dirname, FILE_TO_READ);
        const contenidoStr = fs.readFileSync(filePath, 'utf8');
        
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
        console.log("--- OBJETO INFO (Modo Sincrónico) ---");
        console.log(info);
        console.log("---------------------------------------");

        // 3. Serializar el objeto info para guardarlo en un archivo
        // Usamos JSON.stringify con formato para una mejor representación
        const infoStr = JSON.stringify(info, null, '\t');

        // Guardar el objeto info en info.txt de forma síncrona
        const writePath = path.join(__dirname, FILE_TO_WRITE);
        fs.writeFileSync(writePath, infoStr, 'utf8');

        console.log(`✅ Archivo '${FILE_TO_WRITE}' creado y guardado exitosamente de forma síncrona.`);

    } catch (error) {
        // 4. Manejo de errores
        console.error("❌ Ocurrió un error en el modo síncrono:", error.message);
        if (error.code === 'ENOENT') {
            console.error(`Asegúrate de que el archivo '${FILE_TO_READ}' exista en el directorio.`);
        }
    }
}

procesarArchivoSincrono();