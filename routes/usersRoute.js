const express = require('express');
const registerUserController = require('../controllers/UsersController.js');

const userRouter = express.Router();

userRouter.post('/api/v1/users/register', registerUserController);

module.exports = userRouter;