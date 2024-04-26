const express = require('express');
const {createProductController, getAllProductsController, getSingleProduct, updateSingleProduct} = require('../controllers/productsController.js');
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const productRouter = express.Router();

productRouter.post('/',isLoggedIn, createProductController);
productRouter.get('/', getAllProductsController);
productRouter.get('/:id', getSingleProduct);
productRouter.put('/:id', isLoggedIn, updateSingleProduct);

module.exports = productRouter;