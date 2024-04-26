const jwt = require('jsonwebtoken');


const verifyToken = (token)=>{
    return jwt.verify(token, process.env.jwt_key, (err, decoded)=>{
        if(err){
            return false;
        }
        return decoded;
    });
};



module.exports = verifyToken