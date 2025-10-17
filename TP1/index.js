// index.js

const fs = require('fs');
const path = require('path');

// ====================================================================
// FUNCIÓN 1: leerArchivoComoString
// ====================================================================

/**
 * Recibe la ruta del archivo que se quiere leer, y devuelve un único string
 * con todo el contenido del mismo.
 * @param {string} ruta - Ruta absoluta o relativa del archivo.
 * @returns {string} - Contenido del archivo como un string.
 */
function leerArchivoComoString(ruta) {
  try {
    // Lectura síncrona del archivo y decodificación a UTF-8 (texto)
    const contenido = fs.readFileSync(ruta, { encoding: 'utf8' });
    return contenido;
  } catch (error) {
    // Manejo de errores de lectura (e.g., archivo no encontrado)
    console.error(`Error al leer el archivo en ${ruta}: ${error.message}`);
    throw error;
  }
}

// ====================================================================
// FUNCIÓN 2: escribirTextoEnArchivo
// ====================================================================

/**
 * Graba un texto en un archivo. Crea el archivo si no existe solo si el flag es true.
 * @param {string} ruta - Ruta donde se grabará el archivo.
 * @param {string} texto - Texto a escribir.
 * @param {boolean} flag - Si es true, crea el archivo si no existe. Si es false, lanza error si no existe.
 * @throws {Error} - Lanza "el archivo no existe" si flag es false y el archivo no existe.
 */
function escribirTextoEnArchivo(ruta, texto, flag) {
  const archivoExiste = fs.existsSync(ruta);

  if (!archivoExiste && !flag) {
    // Si el archivo no existe y flag es false, lanzar error
    throw new Error('el archivo no existe');
  }

  // Si existe (o no existe y flag es true, entonces lo crea), se procede a escribir.
  try {
    // Escritura síncrona. Si el archivo no existe, lo crea.
    fs.writeFileSync(ruta, texto, { encoding: 'utf8' });
    console.log(`✅ Escritura exitosa en ${ruta}`);
  } catch (error) {
    console.error(`Error al escribir en el archivo en ${ruta}: ${error.message}`);
    throw error;
  }
}

// ====================================================================
// FUNCIÓN 3: transformarStringEnArrayDeNumeros
// ====================================================================

/**
 * Transforma un string en un array de números, usando un separador.
 * Las partes no numéricas se ignoran.
 * @param {string} texto - String con los números separados.
 * @param {string} separador - Secuencia de caracteres para dividir el texto.
 * @returns {number[]} - Array con los números válidos encontrados.
 */
function transformarStringEnArrayDeNumeros(texto, separador) {
  if (!texto) return [];

  const partes = texto.split(separador);
  const resultado = [];

  for (const parte of partes) {
    // Usamos Number() o parseFloat() para intentar convertir a número.
    // trim() elimina espacios extra.
    const numero = Number(parte.trim());

    // isNaN() comprueba si el resultado no es un número (Not a Number).
    // isFinite() asegura que no es Infinity o -Infinity, y que es un número real.
    if (!isNaN(numero) && isFinite(numero)) {
      resultado.push(numero);
    }
    // Si no es numérico, simplemente se ignora (no se lanza error).
  }

  return resultado;
}

// ====================================================================
// FUNCIÓN 4: transformarArrayDeNumerosAUnSoloString
// ====================================================================

/**
 * Une todos los elementos de un array de números en un único string,
 * usando una secuencia separadora.
 * @param {number[]} array - Array de números.
 * @param {string} separador - Secuencia de caracteres para unir.
 * @returns {string} - String resultado.
 */
function transformarArrayDeNumerosAUnSoloString(array, separador) {
  // map(String) convierte cada número a su representación en string.
  // join(separador) une todos los strings con el separador.
  return array.map(String).join(separador);
}

// ====================================================================
// FUNCIÓN 5: combinarDosArrays
// ====================================================================

/**
 * Combina dos arrays numéricos ordenados y sin repetidos,
 * devolviendo un nuevo array ordenado y sin repetidos.
 * (Implementación con la "observación": sin usar sort())
 * @param {number[]} array1 - Primer array ordenado.
 * @param {number[]} array2 - Segundo array ordenado.
 * @returns {number[]} - Array combinado, ordenado y sin repetidos.
 */
function combinarDosArrays(array1, array2) {
  const resultado = [];
  let i = 0; // Índice para array1
  let j = 0; // Índice para array2

  // 1. Proceso de "Merge" (unión ordenada)
  while (i < array1.length || j < array2.length) {
    const valor1 = array1[i];
    const valor2 = array2[j];
    let valorSeleccionado;

    // Determinar qué valor es menor o si alguno de los arrays se acabó
    if (i < array1.length && (j >= array2.length || valor1 <= valor2)) {
      valorSeleccionado = valor1;
      i++;
    } else if (j < array2.length) {
      valorSeleccionado = valor2;
      j++;
    } else {
      // Caso de arrays vacíos, ya resuelto por el while
      break;
    }

    // 2. Proceso de "Eliminar Repetidos"
    // Solo agregar si el array está vacío o si el último elemento es diferente al seleccionado
    if (resultado.length === 0 || resultado[resultado.length - 1] !== valorSeleccionado) {
      resultado.push(valorSeleccionado);
    }
  }

  return resultado;
}

// ====================================================================
// FUNCIÓN 6: combinarNArrays
// ====================================================================

/**
 * Combina un array de N arrays numéricos ordenados y sin repetidos.
 * @param {number[][]} arrays - Array de arrays, donde cada array está ordenado.
 * @returns {number[]} - Array combinado, ordenado y sin repetidos.
 */
function combinarNArrays(arrays) {
  // Usamos la función combinarDosArrays de forma iterativa (o con reduce)
  // para fusionar todos los arrays uno a uno.
  
  // El valor inicial de 'reduce' debe ser un array vacío.
  return arrays.reduce((acumulador, arrayActual) => {
    // En cada iteración, combinamos el resultado acumulado con el array actual
    return combinarDosArrays(acumulador, arrayActual);
  }, []); // [] es el valor inicial (el array vacío a fusionar con el primero)
}


// ====================================================================
// PRUEBAS Y CÓDIGO DE EJECUCIÓN (npm test)
// ====================================================================

function ejecutarPruebas() {
  console.log('===================================================');
  console.log('            INICIO DE PRUEBAS FUNCIONALES          ');
  console.log('===================================================\n');

  // --- Rutas de Archivos de Prueba ---
  const RUTA_LECTURA = path.join(__dirname, 'data', 'archivo1.txt');
  const RUTA_ESCRITURA = path.join(__dirname, 'data', 'archivo2.txt');
  const RUTA_INEXISTENTE = path.join(__dirname, 'data', 'archivo_fantasma.txt');

  let textoLeido;
  let arrayNumeros;

  // ----------------------------------------------------
  // PRUEBA 1: leerArchivoComoString
  // ----------------------------------------------------
  console.log('--- 1. Pruebas de leerArchivoComoString ---');
  try {
    textoLeido = leerArchivoComoString(RUTA_LECTURA);
    console.log(`✅ Contenido de ${path.basename(RUTA_LECTURA)}: "${textoLeido.trim()}"`);
    console.log('----------------------------------------------------');
  } catch (e) {
    console.error(`❌ Fallo en leerArchivoComoString: ${e.message}`);
    return; // Detener si falla la lectura inicial
  }


  // ----------------------------------------------------
  // PRUEBA 2: transformarStringEnArrayDeNumeros
  // ----------------------------------------------------
  console.log('\n--- 2. Pruebas de transformarStringEnArrayDeNumeros ---');
  const textoEjemplo = '123 | 456 | 789 | 1bc | 10 |';
  const separadorEjemplo = ' | ';
  arrayNumeros = transformarStringEnArrayDeNumeros(textoEjemplo, separadorEjemplo);
  console.log(`Input: texto = '${textoEjemplo}', separador = '${separadorEjemplo}'`);
  console.log(`Output Esperado: [123, 456, 789, 10]`);
  console.log(`Output Obtenido: [${arrayNumeros.join(', ')}]`);
  console.log('✅ Transformación exitosa.');
  console.log('----------------------------------------------------');


  // ----------------------------------------------------
  // PRUEBA 3: escribirTextoEnArchivo (Flag: true)
  // ----------------------------------------------------
  console.log('\n--- 3. Pruebas de escribirTextoEnArchivo (Flag: true) ---');
  const textoA_Escribir = transformarArrayDeNumerosAUnSoloString(arrayNumeros, ',');
  console.log(`Escribiendo: '${textoA_Escribir}' en ${path.basename(RUTA_ESCRITURA)} (crear si no existe)...`);
  try {
    escribirTextoEnArchivo(RUTA_ESCRITURA, textoA_Escribir, true);
    console.log('Verificación de lectura del archivo escrito:');
    const contenidoEscrito = leerArchivoComoString(RUTA_ESCRITURA);
    console.log(`Contenido leído: "${contenidoEscrito.trim()}"`);
  } catch (e) {
    console.error(`❌ Fallo en escribirTextoEnArchivo (flag=true): ${e.message}`);
  }
  console.log('----------------------------------------------------');


  // ----------------------------------------------------
  // PRUEBA 4: escribirTextoEnArchivo (Flag: false, Archivo Inexistente)
  // ----------------------------------------------------
  console.log('\n--- 4. Pruebas de escribirTextoEnArchivo (Flag: false, Inexistente) ---');
  try {
    console.log(`Intentando escribir en ${path.basename(RUTA_INEXISTENTE)} (no crear si no existe)...`);
    escribirTextoEnArchivo(RUTA_INEXISTENTE, 'texto de prueba', false);
    console.log('❌ Error: Se esperaba que lanzara un error.');
  } catch (error) {
    if (error.message === 'el archivo no existe') {
      console.log(`✅ Error esperado lanzado: "${error.message}"`);
    } else {
      console.error(`❌ Fallo inesperado en escribirTextoEnArchivo (flag=false): ${error.message}`);
    }
  }
  console.log('----------------------------------------------------');


  // ----------------------------------------------------
  // PRUEBA 5: transformarArrayDeNumerosAUnSoloString
  // ----------------------------------------------------
  console.log('\n--- 5. Pruebas de transformarArrayDeNumerosAUnSoloString ---');
  const arrayEjemplo = [123, 456, 789, 10];
  const separadorString = ',';
  const stringResultado = transformarArrayDeNumerosAUnSoloString(arrayEjemplo, separadorString);
  console.log(`Input: array = [${arrayEjemplo.join(', ')}], separador = '${separadorString}'`);
  console.log(`Output Esperado: '123,456,789,10'`);
  console.log(`Output Obtenido: '${stringResultado}'`);
  console.log('✅ Transformación a string exitosa.');
  console.log('----------------------------------------------------');


  // ----------------------------------------------------
  // PRUEBA 6: combinarDosArrays
  // ----------------------------------------------------
  console.log('\n--- 6. Pruebas de combinarDosArrays ---');
  const arrayA = [1, 5, 10, 10]; // Se prueba con repetido en el mismo array para comprobar la eliminación
  const arrayB = [2, 3, 8, 11, 11]; // Se prueba con repetido en el mismo array
  const combinadoDos = combinarDosArrays(arrayA, arrayB);
  console.log(`Input: array1 = [${arrayA.join(', ')}], array2 = [${arrayB.join(', ')}]`);
  console.log(`Output Esperado: [1, 2, 3, 5, 8, 10, 11]`);
  console.log(`Output Obtenido: [${combinadoDos.join(', ')}]`);
  console.log('✅ Combinación de dos arrays exitosa.');
  console.log('----------------------------------------------------');


  // ----------------------------------------------------
  // PRUEBA 7: combinarNArrays
  // ----------------------------------------------------
  console.log('\n--- 7. Pruebas de combinarNArrays ---');
  const arraysN = [
    [1, 10, 10], // Con repetido para asegurar el filtrado
    [2, 3, 15, 16],
    [4],
    [6, 7, 13, 15] // Con repetido entre arrays
  ];
  const combinadoN = combinarNArrays(arraysN);
  console.log(`Input: arrays = [[1, 10], [2, 3, 15, 16], [4], [6, 7, 13]]`); // Se usa la versión limpia para el log
  console.log(`Output Esperado: [1, 2, 3, 4, 6, 7, 10, 13, 15, 16]`);
  console.log(`Output Obtenido: [${combinadoN.join(', ')}]`);
  console.log('✅ Combinación de N arrays exitosa.');
  console.log('----------------------------------------------------');


  // --- Limpieza de archivos de prueba ---
  try {
    if (fs.existsSync(RUTA_ESCRITURA)) {
        fs.unlinkSync(RUTA_ESCRITURA);
        console.log(`🗑️ Archivo ${path.basename(RUTA_ESCRITURA)} eliminado.`);
    }
  } catch (e) {
    console.warn(`⚠️ Advertencia: No se pudo eliminar ${path.basename(RUTA_ESCRITURA)}: ${e.message}`);
  }

  console.log('\n===================================================');
  console.log('            FIN DE PRUEBAS FUNCIONALES             ');
  console.log('===================================================');
}

// Ejecutar todas las pruebas al iniciar el script (npm test)
ejecutarPruebas();