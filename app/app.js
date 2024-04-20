const express = require('express');
dbConnection = require('../config/dbConnect.js');

//dbconnection
dbConnection();
const app = express();


module.exports = app