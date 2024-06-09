const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateVenta = [
  check("codigo_venta")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 20 })
    .withMessage("El código de venta debe tener entre 5 y 20 caracteres"),
  check("fecha").exists().notEmpty().isISO8601().withMessage("La fecha de la venta es inválida"),
  check("cliente")
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 255 })
    .withMessage("El nombre del cliente debe tener entre 3 y 255 caracteres"),
  check("articulos")
    .exists()
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos un artículo en la venta"),
  check("articulos.*.articulo")
    .exists()
    .isMongoId()
    .withMessage("El ID del artículo debe ser válido de MongoDB"),
  check("articulos.*.cantidad")
    .exists()
    .notEmpty()
    .isNumeric()
    .withMessage("La cantidad de artículos debe ser un número válido"),
  check("articulos.*.precio_unitario")
    .exists()
    .notEmpty()
    .isNumeric()
    .withMessage("El precio de los artículos debe ser un número válido"),
  check("total")
    .exists()
    .notEmpty()
    .isNumeric()
    .withMessage("El total de la venta debe ser un número válido"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateVenta };
