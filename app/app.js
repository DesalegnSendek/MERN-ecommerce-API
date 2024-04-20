const express = require('express');
const userRouter = require('../routes/usersRoute.js');
dbConnection = require('../config/dbConnect.js');
const dotenv = require('dotenv');

dotenv.config();


//dbconnection
dbConnection();
const app = express();

//routes
app.use('/', userRouter);


module.exports = app;