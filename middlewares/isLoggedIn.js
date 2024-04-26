const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLoggedIn = (req, res, next) => {
    //get token from header
    const token = getTokenFromHeader(req);

    //verify the token
    const decodedUser = verifyToken(token);
    
    if(!decodedUser){
        throw new Error("Invalid/Expired token: please login again");
    }else{
        //save the user in session
        req.userAuthId = decodedUser?.id;
        next();
    }
    
}

module.exports = isLoggedIn;