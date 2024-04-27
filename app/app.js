const express = require('express');
const userRouters = require('../routes/usersRoute.js');
dbConnection = require('../config/dbConnect.js');
const dotenv = require('dotenv');
const {globalErrorHandler, NotFound} = require('../middlewares/globalErrorHandler.js');
const productRouter = require('../routes/productsRoute.js');
const categoriesRouter = require('../routes/categoriesRouter.js');

dotenv.config();

//dbconnection
dbConnection();
const app = express();

//pass incoming request
app.use(express.json());
//routes
app.use("/api/v1/users/", userRouters);
 app.use("/api/v1/products/", productRouter);
 app.use("/api/v1/categories/", categoriesRouter);


//error handlers
app.use(NotFound);
app.use(globalErrorHandler);
module.exports = app;