const express = require('express');
const router = express.Router();

const controller = require('../controllers/productos.controllers')

router.get('/productos', controller.index);
router.post('/productos', controller.store);

module.exports = router;