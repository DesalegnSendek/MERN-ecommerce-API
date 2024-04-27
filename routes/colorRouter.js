const express  = require("express");
const {
    createColorController,
    getAllColorsController,
    getSingleColorController,
    updateColorController,
    deleteColorController
} = require("../controllers/colorsController.js");
const isLoggedIn = require('../middlewares/isLoggedIn.js');

const  colorRouter = express.Router();

colorRouter.post("/", isLoggedIn, createColorController);
colorRouter.get("/", getAllColorsController);
colorRouter.get("/:id", getSingleColorController);
colorRouter.put("/:id", isLoggedIn, updateColorController);
colorRouter.delete("/:id", isLoggedIn, deleteColorController);

module.exports = colorRouter;