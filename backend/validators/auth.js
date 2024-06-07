const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorRegister = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("role").exists(),
  check("lastname").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("num_cuenta")
    .exists()
    .notEmpty()
    .isNumeric()
    .isLength({ min: 7, max: 7 }),
  /* check("email")
        .exists()
        .notEmpty()
        .isLowercase()
        .isEmail(), */
  check("password").exists().notEmpty().isLength({ min: 8, max: 20 }),
  /* check("avatar")
        .exists()
        .notEmpty(), */
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorLogin = [
  check("num_cuenta").exists().notEmpty().isLength({ min: 7, max: 7 }),
  check("password").exists().notEmpty().isLength({ min: 8, max: 20 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorRegister, validatorLogin };
