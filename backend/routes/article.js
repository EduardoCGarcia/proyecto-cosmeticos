const express = require("express")
const router = express.Router();

const { createItem, getItems, getItem, deleteItem, updateItem } = require("../controllers/article");
const { validatorCreateArticle, validatorBuscarArticulo } = require("../validators/article");


router.get("/", getItems);

router.get("/:id", validatorBuscarArticulo, getItem)

router.post('/', validatorCreateArticle, createItem);

router.delete('/:id', validatorBuscarArticulo, deleteItem);

router.put('/:id', validatorBuscarArticulo, validatorCreateArticle, updateItem);


module.exports = router;