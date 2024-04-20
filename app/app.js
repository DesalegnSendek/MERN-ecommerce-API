const express = require('express');
const userRouters = require('../routes/usersRoute.js');
dbConnection = require('../config/dbConnect.js');
const dotenv = require('dotenv');

dotenv.config();

//dbconnection
dbConnection();
const app = express();

//pass incoming request
app.use(express.json());
//routes
app.use("/", userRouters);


module.exports = app;