const express = require('express');
const {
    createCategoryController,
     getAllCategoryController,
     getSingleCategoryController,
     updateSingleCategory,
     deleteSingleCategory
    } = require('../controllers/categoryController.js');
const isLoggedIn = require('../middlewares/isLoggedIn.js');

const categoriesRouter = express.Router();

categoriesRouter.post('/', isLoggedIn, createCategoryController);
categoriesRouter.get('/', getAllCategoryController);
categoriesRouter.get('/:id', getSingleCategoryController);
categoriesRouter.put('/:id', isLoggedIn, updateSingleCategory);
categoriesRouter.delete('/:id', isLoggedIn, deleteSingleCategory);

module.exports = categoriesRouter;