const catchAsyncError = require('../middlewares/catachAsyncError.js')
const Associates = require('../models/AssociateModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler.js')
const sendToken = require('../utils/sendToken.js')
const { sendMail } = require('../helpers/SendMail.js')
const { email, success } = require('zod')
const loginEmail = require('../helpers/loginEmail.js')
const nodemailer = require('nodemailer')
const { where, json } = require('sequelize')
const crypto = require('crypto');


const login = catchAsyncError(async(req,res,next)=>{
    const {mobile,password} = req.body;
    const user = await Associates.findOne({where:{mobile}});
    if(!mobile || !password){
        return next(new ErrorHandler("All fileds required",400))
    }
    if(!user){
        return next(new ErrorHandler("Mobile number not found",404))
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if(!isMatch){
        return next(new ErrorHandler("invalid mobile or password",400))
    }
    if(user.status !== "active" ){
        return next(new ErrorHandler("Account is not active",403))
    }
   if(user.email){
    const html = loginEmail(user);
    await sendMail(
        user.email,
        "Login Alert - Avya Estate CRM",
        "Login detected on your account",
        html
    );
   }

    sendToken(user,200,res,"Login sucessfull");
    

})



const logout = catchAsyncError(async(req,res)=>{

     res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful!!",
  });

})

const generateOtp = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let otp = "";

  for (let i = 0; i < 6; i++) {
    otp += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return otp;
};

const sendOTP = catchAsyncError(async(req,res,next)=>{
    const {email} = req.body
    if(!email){
        return next(new ErrorHandler('All fields are required',400))
    }
    const user = await Associates.findOne({where:{email}})
    if(!user){
        return next(new ErrorHandler("User not found",404))
    }
    let otp = generateOtp();
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex')

    user.resetOTP = hashedOtp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();
 await sendMail(
  email,
  "Your OTP Code",
  "", 
  `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`
);

    res.status(200).json({
        success:true,
        message:"OTP sent successfully"
    })
})




const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Email is required", 400));
  }

  const user = await Associates.findOne({ where: { email } });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // reuse OTP logic
  const otp = generateOtp();
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  user.resetOTP = hashedOtp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000;
  await user.save();

  await sendMail(
    email,
    "Password Reset OTP",
    "",
    `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`
  );

  res.status(200).json({
    success: true,
    message: "OTP sent to email",
  });
});


const resetPassword = catchAsyncError(async (req, res, next) => {
  const { email, otp, password, confirmPassword } = req.body;

  if (!email || !otp || !password || !confirmPassword) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  const user = await Associates.findOne({ where: { email } });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // hash OTP from request
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  if (
    user.resetOTP !== hashedOtp ||
    user.otpExpiry < Date.now()
  ) {
    return next(new ErrorHandler("Invalid or expired OTP", 400));
  }

  // update password
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password_hash = hashedPassword;

  // clear OTP fields
  user.resetOTP = null;
  user.otpExpiry = null;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});



const changePassword = catchAsyncError(async(req,res,next)=>{
    const {oldPassword, newPassword} = req.body;

    if(!oldPassword || !newPassword){
        return next(new ErrorHandler("All fileds are required",400))

    }
    const user = await Associates.findByPk(req.user.id);
    if(!user){
        return next(new ErrorHandler("User not found",400));
    }


    const isMatch = await bcrypt.compare(oldPassword,user.password_hash)
    if(!isMatch){
        return next(new ErrorHandler("Old password is incorrect",400))
    }
    const hashedPassword = await bcrypt.hash(newPassword,10);
    user.password_hash = hashedPassword;
    await user.save();

    res.status(200).json({
        success:true,
        message:"Password sucesfully changed"

    })
})


module.exports = {login,logout,forgotPassword,resetPassword,changePassword,sendOTP}