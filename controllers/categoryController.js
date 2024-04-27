const expressAsyncHandler = require("express-async-handler")
const Category = require("../models/Category.js")



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


module.exports = createCategoryController;