const express = require('express');
const {registerUserController, loginUserController} = require('../controllers/UsersController.js');

const userRouters = express.Router();

userRouters.post('/api/v1/users/register', registerUserController);
userRouters.post('/api/v1/users/login', loginUserController);

module.exports = userRouters;