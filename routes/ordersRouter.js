const exppress  = require("express");
const {
    createOrderController,
    getAllordersController,
    getOrderStatsController,
    updateOrderController,
    getSingleOrderController,
 } = require("../controllers/orderController.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");

const  orderRouter = exppress.Router();

orderRouter.post("/", isLoggedIn, createOrderController);
orderRouter.get("/", isLoggedIn, getAllordersController);
orderRouter.get("/sales/stats", isLoggedIn, getOrderStatsController);
orderRouter.put("/update/:id", isLoggedIn, updateOrderController);
orderRouter.get("/:id", isLoggedIn, getSingleOrderController);
module.exports = orderRouter;