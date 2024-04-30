const express  = require("express");
const createReviewController   = require("../controllers/reviewsController.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const  reviewRouter = express.Router(); 

reviewRouter.post("/:id", isLoggedIn, createReviewController);

module.exports = reviewRouter;