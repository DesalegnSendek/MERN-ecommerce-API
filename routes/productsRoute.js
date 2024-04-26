const express = require('express');
const {createProductController, getAllProductsController} = require('../controllers/productsController.js');
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const productRouter = express.Router();

productRouter.post('/',isLoggedIn, createProductController);
productRouter.get('/', getAllProductsController);


module.exports = productRouter;