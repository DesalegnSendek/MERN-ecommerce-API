const getTokenFromHeader = (req)=>{
    // console.log(req.headers);
    //get token from header
    const token = req?.headers?.authorization?.split(' ')[1];
    //console.log(token);
    if (token===undefined){
        return "No token in the request";
    }else{
        return token;
    }

    }
    
    module.exports = getTokenFromHeader
