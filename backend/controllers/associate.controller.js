const Associates = require('../models/AssociateModel.js')
const catchAsyncError = require("../middlewares/catachAsyncError");
const ErrorHandler = require("../utils/errorHandler.js")
const generateAssociateCode = require('../utils/generateAssociateCode.js')
const bcrypt = require('bcryptjs');



const createAssociate = catchAsyncError(async (req, res, next) => {
    const { name, email, mobile, password, role, sponsor_id } = req.body;

    if (!name || !email || !mobile || !password) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    const existing = await Associates.findOne({ where: { mobile } });

    if (existing) {
        return next(new ErrorHandler("User already exists", 400));
    }

    const associate_code = await generateAssociateCode();

   
    const hashed_password = await bcrypt.hash(password, 10);

    
    const user = await Associates.create({
        associate_code,
        name,
        email,
        mobile,
        password_hash: hashed_password,
        role,
        sponsor_id
    });

    res.status(201).json({
        success: true,
        message: "Associate created successfully",
        user
    });
});

const getAssociate = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;
    const user = await Associates.findByPk(id);
    if(!user){
        return next(new ErrorHandler("User not exists",404));
    }
    res.status(200).json({
            success:true,
            user
        })
})

const getAllAssociate = catchAsyncError(async(req,res,next)=>{
    const user = await Associates.findAll();
    res.status(200).json({
        success:true,
        user
    })
})



const updateAssociate = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const user = await Associates.findByPk(id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // ❗ Handle password separately
    if (req.body.password) {
        const hashed = await bcrypt.hash(req.body.password, 10);
        req.body.password_hash = hashed;
        delete req.body.password;
    }

    await user.update(req.body);

    res.status(200).json({
        success: true,
        message: "Updated successfully",
        user
    });
});

const resetAssociatePassword = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;

    const user = await Associates.findByPk(id);

    if (!user) {
        return next(new Error("User not found"));
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password_hash = hashed;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password reset successful"
    });
});




module.exports = {createAssociate,getAllAssociate,getAssociate,updateAssociate,resetAssociatePassword}