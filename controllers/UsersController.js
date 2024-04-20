const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');


//description Registration
//description POST api/v1/users/register
//description private/admin

 const registerUserController = asyncHandler(
    async (req, res) => {
        // res.json({
        //     msg: "User registration controller",
        // });
    
        const {fullname, email, password} = req.body;
        //check if user is already registered
        const user = await User.findOne({email});
        if (user) {
            //throw new message
           throw new Error("user is already registered");
        }
    
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create new user
    
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            status: 'success',
            msg: "User registered successfully",
            data: newUser,
        });
    }
 )

//description Login user
//description POST api/v1/users/login
//description public/

 const loginUserController = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        //fing user by email
        const user = await User.findOne({email});
       
        if(user && await bcrypt.compare(password, user?.password)){
            res.json({
                status: 'Login successful',
                msg: "Login successful",
                user,
            });
        }else {
           throw new Error("Invalid Credentials");
        }
     }
 )

module.exports = {registerUserController, loginUserController};