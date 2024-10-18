const express = require('express');
const router = express.Router();

const controller = require("../controllers/productos.controller");

router.get('/', controller.index); // trae todos los productos

router.get("/:productID", controller.show); // busqueda por clave primaria:

router.get("/nombre/:productName", controller.findName); // busqueda por parametro estricto:

router.get("/categoria/:categoryID", controller.parcialName); // busqueda nombre parcial.

router.get("/buscar/:query", controller.buscar); //filtrar con un parametro laxo:

router.get("/importemayor/:unitPrice", controller.mayorPrecio); 

router.post("/", controller.store); // agregar un registro

router.put("/:ProductID", controller.update); // modificar un registro:

router.delete("/:ProductID", controller.destroy);  
// eliminar un registro

module.exports = router; 