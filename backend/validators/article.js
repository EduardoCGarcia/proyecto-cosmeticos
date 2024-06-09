const { check, validationResult } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateArticle = [
    check("codigo")
        .exists()
        .notEmpty()
        .isLength({ min: 7, max: 7 }),
    check("nombre")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 255 }),
    check("cantidad")
        .exists()
        .notEmpty()
        .isNumeric(),
        check("precio")
        .exists()
        .notEmpty()
        .isNumeric(),
    check("marca")
        .exists()
        .isLength({ min: 0, max: 50 }),
    check("modelo")
        .exists()
        .isLength({ min: 0, max: 20 }),
    check("num_serie")
        .exists()
        .isLength({ min: 0, max: 20 }),
    check("estado")
        .exists()
        .isLength({ min: 0, max: 20 }),
    check("caracteristicas")
        .exists()
        .isLength({ min: 0, max: 255 }),
    check("ubicacion")
        .exists()
        .isLength({ min: 0, max: 50 }),
    check("imagen_url")
        .exists()
        .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorBuscarArticulo = [
    check("id")
        .exists()
        .notEmpty(),
    //TODO validar mongoID si no se usan dos bases de datos
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateArticle, validatorBuscarArticulo };