const User = require("../models/User.js");

//description Registration
//description POST api/v1/users/register
//description private/admin

 const registerUserController = (user) => {
    res.json({
        msg: "User registration controller",
    });
};

module.exports = registerUserController;