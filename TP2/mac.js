// mac.js

const fs = require('fs');
const path = require('path');

const FILE_TO_READ = 'package.json';
const FILE_TO_WRITE = 'info.txt';

/**
 * Realiza la lectura asíncrona de package.json usando callbacks, crea el objeto info
 * y lo guarda asíncronamente en info.txt.
 */
function procesarArchivoConCallbacks() {
    const filePath = path.join(__dirname, FILE_TO_READ);

    // 1. Leer el archivo package.json de forma asíncrona con callback
    fs.readFile(filePath, 'utf8', (readErr, contenidoStr) => {
        // 4. Manejo de errores de lectura
        if (readErr) {
            console.error("❌ Error de lectura (Callback):", readErr.message);
            return;
        }

        try {
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
            console.log("--- OBJETO INFO (Modo Callback) ---");
            console.log(info);
            console.log("-----------------------------------");

            // 3. Serializar el objeto info
            const infoStr = JSON.stringify(info, null, '\t');

            // Guardar el objeto info en info.txt de forma asíncrona con callback
            const writePath = path.join(__dirname, FILE_TO_WRITE);
            fs.writeFile(writePath, infoStr, 'utf8', (writeErr) => {
                // 4. Manejo de errores de escritura
                if (writeErr) {
                    console.error("❌ Error de escritura (Callback):", writeErr.message);
                    return;
                }
                
                console.log(`✅ Archivo '${FILE_TO_WRITE}' creado y guardado exitosamente con callbacks.`);
            });

        } catch (parseError) {
            // 4. Manejo de errores de parsing (JSON.parse)
            console.error("❌ Error al procesar el contenido (Callback):", parseError.message);
        }
    });
}

procesarArchivoConCallbacks();