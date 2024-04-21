const express = require('express');
const {registerUserController, loginUserController, getUserProfile } = require('../controllers/UsersController.js');

const userRouters = express.Router();

userRouters.post('/register', registerUserController);
userRouters.post('/login', loginUserController);
userRouters.get('/profile', getUserProfile);

module.exports = userRouters;