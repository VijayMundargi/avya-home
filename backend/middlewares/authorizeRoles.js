const ErrorHandler = require("../utils/errorHandler.js")

const authorizeRoles = (...roles) =>{
    return(req,res,next)=>{
        if(!req.user || !roles.includes(req.user.role)){
            return next(
                new ErrorHandler("Access denied: insuffient permission",403)
            );
        }
        next();
    }
}

module.exports = authorizeRoles;