const express = require('express');
const {
  createBrandController,deleteBrandController,getAllBrandsController,getSingleBrandController,updateBrandController,
}  = require("../controllers/brandsController.js");

const isLoggedIn = require('../middlewares/isLoggedIn.js');

const  brandsRouter = express.Router();

brandsRouter.post("/", createBrandController);
brandsRouter.get("/", getAllBrandsController);
brandsRouter.get("/:id", getSingleBrandController);
brandsRouter.delete("/:id", isLoggedIn, deleteBrandController);
brandsRouter.put("/:id", isLoggedIn, updateBrandController);

module.exports = brandsRouter;