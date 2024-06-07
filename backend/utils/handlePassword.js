const bcrypt = require("bcrypt");

/**
 * Encripta la contraseña
 * @param {Strign} passwordPlain Contraseña plana
 * @returns hash
 */
const encrypt = async (passwordPlain) => {
    const hash = await bcrypt.hash(passwordPlain, 10);
    return hash;
};

/**
 * Compara la contraseña de acceso con la que esta en la base de datos
 * @param {*} passwordPlain Contraseña plana
 * @param {*} hashPassword Contrseña encriptada
 * @returns 
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
};

module.exports = { encrypt, compare };