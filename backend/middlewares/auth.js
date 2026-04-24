const jwt = require("jsonwebtoken")
const ErrorHandler = require('../utils/errorHandler.js')

const isAuthenticated  = (req,res,next)=>{
    try {
        const token = req.cookies?.token;
        if(!token){
            return next(new ErrorHandler("Please login first",401));
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid token",400))
    }
}

module.exports = {isAuthenticated}