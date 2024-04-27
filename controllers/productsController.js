const expressAsyncHandler = require("express-async-handler");
const  Product = require("../models/Product.js");
const Category = require("../models/Category.js");


//description Create new product
//route POST /api/v1/products
//access method private/admin
 const  createProductController = expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const  { name, description, category, sizes, colors, price, totalQty, brand } =
      req.body;
    //Product exists
    const  productExists = await Product.findOne({ name });
    if (productExists) {
      throw new Error("Product Already Exists");
    }
    
    //find the category
    const  categoryFound = await Category.findOne({
      name: category,
    });
    if (!categoryFound) {
      throw new Error(
        "Category not found, please create category first or check category name"
      );
    }
    //create the product
    const  product = await Product.create({
      name,
      description,
      category,
      sizes,
      colors,
      user: req.userAuthId,
      price,
      totalQty,
      //images: convertedImgs,
    });
    //push the product into category
    categoryFound.products.push(product._id);
    //resave
    await categoryFound.save();
   
    //send response
    res.json({
      status: "success",
      message: "Product created successfully",
      product,
    });
  });



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
   //filter by brand name
   if(req.query.brand)
   {
    productQuery = productQuery.find({
        brand:{ $regex: req.query.brand, $options:"i" },
    });
   }

   //filter by category name
   if(req.query.category)
   {
    productQuery = productQuery.find({
        category:{ $regex: req.query.category, $options:"i" },
    });
   }
   //filter by color name
   if(req.query.colors)
   {
    productQuery = productQuery.find({
        colors:{ $regex: req.query.colors, $options:"i" },
    });
   }

   //filter by size
   if(req.query.sizes)
   {
    productQuery = productQuery.find({
        sizes:{ $regex: req.query.sizes, $options:"i" },
    });
   }

   //filter by price
   if(req.query.price)
   {
    const priceRange = req.query.price.split("-");
    //gte: greater than or equal to
    //lte: less than or equal to
    productQuery = productQuery.find({
        price:{ $gte: priceRange[0], $lte: priceRange[1] },
    });     
   }


   //pagination
   //page number
   const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;

   //limit number of items to show per page
   const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

   //start index of first item to show per page
   const startIndex = (page - 1) * limit;

   //end index of last item to show per page
   const endIndex = page * limit;

   //total
   const total = await Product.countDocuments();

   productQuery = productQuery.skip(startIndex).limit(limit);
    
   //pagination results and filtering results
   const pagination = {};
   if(endIndex < total){
            pagination.next = {
            page: page + 1,
            limit,
        };
    }

    if(startIndex > 0 ) {
        pagination.prev = {
        page: page - 1,
        limit,
        };
    }
        //await query
        const products = await productQuery;

        res.status(200).json({
            status: "success",
            total,
            results: products.length,
            pagination,
            message: "Successfully fetched products",
            products,
        });
});

//description GET single product
//route GET /api/products/:id
//access public
const getSingleProduct = expressAsyncHandler( async (req, res) => {
        console.log(req.params);
        const product = await Product.findById(req.params.id); 

        //if there is no product
        if(!product){
            return res.status(404).json({
                status: "error",
                msg: "Product not found",
            });
        }
        //success message for the product
        res.status(200).json({
            status: "success",
            msg: "Product fetched successfully",
            product,
        });
    }
);

//description update single product
//route PUT /api/products/:id/update
//access private/admin
const updateSingleProduct = expressAsyncHandler( async (req, res) => {
    const {
        name,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty,
        brand
    } = req.body;

    //update product
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            category,
            sizes,
            colors,
            user: req.userAuthId,
            price,
            totalQty,
            brand,
        },
        {
            new: true,
        }
    );

    res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        product,
    });
    }
);

//description delete single product
//route Delete /api/products/:id/delete
//access private/admin
const deleteSingleProduct = expressAsyncHandler( async (req, res) => {
    console.log(req.params);
    const product = await Product.findByIdAndDelete(req.params.id); 

    //if there is no product
    if(!product){
        return res.status(404).json({
            status: "error",
            msg: "Product not found",
        });
    }
    //success message for the product
    res.status(200).json({
        status: "success",
        msg: "Product deleted successfully",
    });
}
);
module.exports = { createProductController, getAllProductsController, getSingleProduct, updateSingleProduct, deleteSingleProduct }