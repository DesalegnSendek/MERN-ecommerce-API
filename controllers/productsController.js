const expressAsyncHandler = require("express-async-handler");
const  Product = require("../models/Product");


//description Create new product
//route POST /api/v1/products
//access method private/admin

const createProductController =expressAsyncHandler( async (req, res) => {
    const {name, description, category, sizes, colors, user, price, totalQty} = req.body;
    //product exist
    const productExist = await Product.findOne({name})
    if(productExist){
        const msg = "Product already exists"
        throw new Error(msg);
    }
        //create new product
    const product = await Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        price,
        totalQty,
    });
    //push product into category list
    //send response to category
    res.status(201).json({
        status: "success",
        msg: "Product created successfully",
        product,
    });
})

// description get all products
// route GET /api/products
// access public

const getAllProductsController = expressAsyncHandler( async (req, res) => {
    console.log(req.query);
    //query
    let productQuery = Product.find();
  
   //Search by name
   if(req.query.name)
   {
    productQuery = productQuery.find({
        name:{ $regex: req.query.name, $options:"i" },
    });
   }
    //await query
    const products = await productQuery;

    res.status(200).json({
        status: "success",
        products,
    });
});




module.exports = {createProductController, getAllProductsController}