const exppress  = require("express");
const {
  createCouponController,
  getAllCouponsController,
  getCouponController,
  updateCouponController,
  deleteCouponController,
}  = require("../controllers/couponsController.js");
const isAdmin  = require("../middlewares/isAdmin.js");
const { isLoggedIn }  = require("../middlewares/isLoggedIn.js");

const  couponsRouter = exppress.Router();

couponsRouter.post("/", isLoggedIn, createCouponController);

couponsRouter.get("/", getAllCouponsController);
couponsRouter.put("/update/:id", isLoggedIn, isAdmin, updateCouponController);
couponsRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteCouponController);
couponsRouter.get("/single", getCouponController);
module.exports couponsRouter;