const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.jwt_key, {expiresIn: "3d"});
};

module.exports = generateToken;