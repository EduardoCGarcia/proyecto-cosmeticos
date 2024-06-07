const { validationResult } = require("express-validator");

/**
 * Middleware que permite continuar si la validacion del dato es correcta si no 
 * envia el array de el array de errores.
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next 
 */
const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(403);
        res.send({ error: error.array() });
    }
};

module.exports = validateResults;