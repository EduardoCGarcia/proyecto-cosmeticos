// Importamos las bibliotecas necesarias
const express = require("express");
const fs = require("fs");

// Inicializamos el router de Express
const router = express.Router();

// __dirname es una variable global en Node.js que obtiene la dirección del directorio del módulo actual.
const PATH_ROUTES = __dirname;

/**
 * Removes the file extension from a given file name.
 * 
 * @param {string} fileName - The name of the file including the extension.
 * @returns {string} - The file name without the extension.
 */
const removeExtension = (fileName) => {
    // Split the file name when a dot is found and take the first part
    return fileName.split('.').shift();
}

/**
     * This method takes a file as input and performs the following operations:
     * 
     * 1. It extracts the name of the file without its extension using the
     * `removeExtension` function.
     * 2. If the name of the file is not 'index', it proceeds to the next step.
     * 3. It configures a route based on the name of the file and requires its content
     * as middleware.
     * - For example, if the file is named 'users.js', the route '/users' will be
     * configured.
     * 4. The configured route and its corresponding middleware are added to the
     * router.
     * 
     * Note: The `removeExtension` function is not defined in the provided code snippet.
     */
fs.readdirSync(PATH_ROUTES).filter((file) => {
    // Obtener el nombre del archivo sin su extensión
    const name = removeExtension(file);
    
    // Si el nombre del archivo no es 'index', lo utilizamos para configurar una ruta
    if (name !== 'index') {
        // Configurar la ruta basada en el nombre del archivo y requerir su contenido como middleware
        // Por ejemplo, si el archivo se llama 'users.js', se configurará la ruta '/users'
        router.use(`/${name}`, require(`./${file}`));
    }
});

// Exportamos el router para usarlo en otras partes de la aplicación
module.exports = router;