const express = require('express');
const productsController = require('../controllers/products');
const productsRouter =express.Router();
productsRouter.post('/add',productsController.addProduct);
productsRouter.get('/view',productsController.viewProducts);
module.exports=productsRouter;