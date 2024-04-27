const expressAsyncHandler = require("express-async-handler");
const Brand  = require("../models/Brand.js");

// @desc    Create new Brand
// @route   POST /api/v1/brands
// @access  Private/Admin
 const  createBrandController = expressAsyncHandler(async (req, res) => {
  const  { name } = req.body;
  //brand exists
  const  brandFound = await Brand.findOne({ name });
  if (brandFound) {
    throw new Error("brand not found");
  }
  //create
  const  brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "Brand created successfully",
    brand,
  });
});

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
 const  getAllBrandsController = expressAsyncHandler(async (req, res) => {
  const  brands = await Brand.find();
  res.json({
    status: "success",
    message: "Brands fetched successfully",
    brands,
  });
});

// @desc    Get single brand
// @route   GET /api/brands/:id
// @access  Public
 const  getSingleBrandController = expressAsyncHandler(async (req, res) => {
  const  brand = await Brand.findById(req.params.id);
  res.json({
    status: "success",
    message: "brand fetched successfully",
    brand,
  });
});

// @desc    Update brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
 const  updateBrandController = expressAsyncHandler(async (req, res) => {
  const  { name } = req.body;

  //update
  const  brand = await Brand.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "brand updated successfully",
    brand,
  });
});

// @desc    delete brand
// @route   DELETE /api/brands/:id
// @access  Private/Admin
 const  deleteBrandController = expressAsyncHandler(async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "brand deleted successfully",
  });
});

module.exports = { getAllBrandsController, getSingleBrandController, createBrandController, updateBrandController, deleteBrandController, updateBrandController };