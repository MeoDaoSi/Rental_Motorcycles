const User = require('../app/models/users');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    // If user existed => skip
    if(req.user){
        return next();
    }
    try {
        // Get token from header
        const token = await req.header('authorization').replace('Bearer ','');
        // Verify token
        const decode = jwt.verify(token,process.env.PRIVATE_KEY_TOKEN,process.env.JWT_EXPIREs_IN);
        // Get user from model
        const user = await User.findById(decode._id);
        if(!user){
            throw new Error();
        }
        // Store user in request
        req.user = user;
        req.token = token;
        // Call next middleware
        return next();
    } catch (error) {
        res.status(401).json('please authenticate');
    }
}
module.exports = auth