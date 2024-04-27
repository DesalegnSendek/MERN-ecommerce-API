const express = require('express');
const createCategoryController = require('../controllers/categoryController.js');
const isLoggedIn = require('../middlewares/isLoggedIn.js');

const categoriesRouter = express.Router();

categoriesRouter.post('/', isLoggedIn, createCategoryController);

module.exports = categoriesRouter;