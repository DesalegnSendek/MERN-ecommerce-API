const express = require('express');
const createProductController = require('../controllers/productsController.js');
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const productRouter = express.Router();

productRouter.post('/',isLoggedIn, createProductController);

module.exports = productRouter;