const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  getItem,
  deleteItem,
  updateItem,
} = require("../controllers/ventas");
const {
  validatorCreateVenta,
  validatorBuscarVenta,
} = require("../validators/venta");

// Obtener todas las ventas
router.get("/", getItems);

// Obtener una venta por su ID
//router.get("/:id", validatorBuscarVenta, getItem);

// Crear una nueva venta
router.post("/", validatorCreateVenta, createItem);

// Eliminar una venta por su ID
//router.delete("/:id", validatorBuscarVenta, deleteItem);

// Actualizar una venta por su ID
//router.put("/:id", validatorBuscarVenta, validatorCreateVenta, updateItem);

module.exports = router;
