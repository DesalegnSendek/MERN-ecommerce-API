const expressAsyncHandler  = require("express-async-handler");
const Product  = require("../models/Product.js");
const Review  = require("../models/Review.js");


// @desc    Create new review
// @route   POST /api/v1/reviews
// @access  Private/Admin
 const  createReviewController = expressAsyncHandler(async (req, res) => {
   const  { product, message, rating } = req.body;
   //1. Find the product
  const  { id } = req.params;
  // console.log(req.params);
  const  productFound = await Product.findById(id);
  //console.log(productFound);
  if (!productFound) {
    return res.status(404).json({
      status: "error",
      msg: "review not found",
  });
  }
   //check if user already reviewed this product
  const  hasReviewed = productFound?.reviews?.find((review) => {
    return review?.user?.toString() === req?.userAuthId?.toString();
  });

  if (hasReviewed) {
    return res.status(404).json({
      status: "error",
      msg: "user has already reviewed the product",
  });  }
   //create review
  const  review = await Review.create({
    message,
    rating,
    product: productFound?._id,
    user: req.userAuthId,
  });

   //Push review into product Found~
  productFound.reviews.push(review?._id);
   //resave
  await productFound.save();
  //success message
  res.status(201).json({ 
    success: true,
    message: "Review created successfully",
  });
});

module.exports = createReviewController;