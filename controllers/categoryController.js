const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/Category.js");


//descriptiom create new category
//route POST /api/v1/categories
//access private/admin
const createCategoryController = expressAsyncHandler(async (req, res) => {
    const {
        name,        
    } = req.body;

    //category exist
    const categoryExist = await Category.findOne({name})
    if(categoryExist){
        throw new Error("Category already exist");
    }
    //category create
    const category = await Category.create({
        name,
        user: req.userAuthId,
    });
    //send response
    res.status(201).json({
        success: true,
        message: "Category created successfully",
        category,
    });
});

//description Get all categories
//description route GET /api/categories
//access routes GET public
const getAllCategoryController = expressAsyncHandler(async (req, res) => {
    const category = await Category.find();

    //send response
    res.status(201).json({
        success: true,
        message: "Categories fetched successfully",
        category,
    });
});

//description Get single category
//description route GET /api/categories/:id
//access routes GET public
const getSingleCategoryController = expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    
    //send response
    res.status(201).json({
        success: true,
        message: "Category fetched successfully",
        category,
    });
});

//description update single product
//route PUT /api/products/:id/update
//access private/admin
const updateSingleCategory = expressAsyncHandler( async (req, res) => {
    const { name } = req.body;

    //update category
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name,
        },
        {
            new: true,
        }
    );

    res.status(200).json({
        status: "success",
        message: "Category updated successfully",
        category,
    });
    }
);  

//description delete single category
//route Delete /api/categories/:id/delete
//access private/admin
const deleteSingleCategory = expressAsyncHandler( async (req, res) => {
    await Category.findByIdAndDelete(req.params.id); 
    
    //success message
    res.status(200).json({
        status: "success",
        msg: "Category deleted successfully",
    });
}
);


module.exports = { 
    createCategoryController, 
    getAllCategoryController, 
    getSingleCategoryController, 
    updateSingleCategory, 
    deleteSingleCategory 
};