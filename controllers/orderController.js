const asyncHandler  = require("express-async-handler");
const dotenv  = require("dotenv");
dotenv.config();
const Stripe  = require("stripe");
const Order  = require("../models/Order.js");
const Product  = require("../models/Product.js");
const User  = require("../models/User.js");
const Coupon  = require("../models/Coupon.js");
//@desc create orders
//@route POST /api/v1/orders
//@access private

//stripe instance
const  stripe = new Stripe(process.env.STRIPE_KEY);

const  createOrderController = asyncHandler(async (req, res) => {
  // //get teh coupon
  // const  { coupon } = req?.query;

  // const  couponFound = await Coupon.findOne({
  //   code: coupon?.toUpperCase(),
  // });
  // if (couponFound?.isExpired) {
  //   throw new Error("Coupon has expired");
  // }
  // if (!couponFound) {
  //   throw new Error("Coupon does exists");
  // }

  //get discount
  // const  discount = couponFound?.discount / 100;

  //Get the payload(customer, orderItems, shipppingAddress, totalPrice);
  const  { orderItems, shippingAddress, totalPrice } = req.body;
  console.log(req.body);
  //Find the user
  const  user = await User.findById(req.userAuthId);
  //Check if user has shipping address
  if (!user?.hasShippingAddress) {
    throw new Error("Please provide shipping address");
  }
  //Check if order is not empty
  if (orderItems?.length <= 0) {
    throw new Error("No Order Items");
  }
  //Place/create order - save into DB
  const  order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
    totalPrice,
  });

  //Update the product qty
  const  products = await Product.find({ _id: { $in: orderItems } });

  orderItems?.map(async (order) => {
    const  product = products?.find((product) => {
      return product?._id?.toString() === order?._id?.toString();
    });
    if (product) {
      product.totalSold += order.qty;
    }
    await product.save();
  });
  //push order into user
  user.orders.push(order?._id);
  await user.save();

  //make payment (stripe)
  //convert order items to have same structure that stripe need
  const  convertedOrders = orderItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.name,
          description: item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.qty,
    };
  });
  const  session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata: {
      orderId: JSON.stringify(order?._id),
    },
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.send({ url: session.url });
});

//@desc get all orders
//@route GET /api/v1/orders
//@access private

const  getAllordersController = asyncHandler(async (req, res) => {
  //find all orders
  const  orders = await Order.find().populate("user");
  res.json({
    success: true,
    message: "All orders",
    orders,
  });
});

//@desc get single order
//@route GET /api/v1/orders/:id
//@access private/admin

const getSingleOrderController = asyncHandler(async (req, res) => {
  //get the id  = require(params
  const  id = req.params.id;
  const  order = await Order.findById(id);
  //send response
  res.status(200).json({
    success: true,
    message: "Single order",
    order,
  });
});

//@desc update order to delivered
//@route PUT /api/v1/orders/update/:id
//@access private/admin

const updateOrderController = asyncHandler(async (req, res) => {
  //get the id  = require(params
  const  id = req.params.id;
  //update
  const  updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Order updated",
    updatedOrder,
  });
});

//@desc get sales sum of orders
//@route GET /api/v1/orders/sales/sum
//@access private/admin

const getOrderStatsController = asyncHandler(async (req, res) => {
  //get order stats
  const  orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        minimumSale: {
          $min: "$totalPrice",
        },
        totalSales: {
          $sum: "$totalPrice",
        },
        maxSale: {
          $max: "$totalPrice",
        },
        avgSale: {
          $avg: "$totalPrice",
        },
      },
    },
  ]);
  //get the date
  const  date = new Date();
  const  today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const  saleToday = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: today,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);
  //send response
  res.status(200).json({
    success: true,
    message: "Sum of orders",
    orders,
    saleToday,
  });
});

module.exports = { 
  createOrderController,
  getOrderStatsController,
  updateOrderController,
  getSingleOrderController,
  getAllordersController
 };