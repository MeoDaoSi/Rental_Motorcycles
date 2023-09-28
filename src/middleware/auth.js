const User = require("../app/models/users");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const auth = async (req, res, next) => {
    // If user existed => skip
    if(req.user){
        return next();
    }
    try {
        // Get token from header
        const token = await req.header("authorization").replace("Bearer ","");
        if(!token){
            return next(new AppError(401,"Please Authenticate"));
        }
        // Verify token
        const decode = jwt.verify(token,process.env.PRIVATE_KEY_TOKEN,process.env.JWT_EXPIREs_IN);
        // Get user from model
        const user = await User.findById(decode._id);
        if(!user){
            return next(new AppError(404,"User not found"));
        }
        // Store user in request
        req.user = user;
        req.token = token;
        // Call next middleware
        return next();
    } catch (error) {
        return next(new AppError(401,"Please Authenticate"));
    }
}
module.exports = auth