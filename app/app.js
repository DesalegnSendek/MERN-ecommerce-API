const express = require('express');
const userRouters = require('../routes/usersRoute.js');
dbConnection = require('../config/dbConnect.js');
const dotenv = require('dotenv');
const {globalErrorHandler, NotFound} = require('../middlewares/globalErrorHandler.js');

dotenv.config();

//dbconnection
dbConnection();
const app = express();

//pass incoming request
app.use(express.json());
//routes
app.use("/api/v1/users/", userRouters);


//error handlers
app.use(NotFound);
app.use(globalErrorHandler);
module.exports = app;