const  Customer  = require("../models/CustomerModel.js");
const catachAsyncError = require('../middlewares/catachAsyncError');
const ErrorHandler = require('../utils/errorHandler');


const createCustomerKyc = catachAsyncError(async(req,res,next)=>{
    const {data} = req.body || {};
    if (req.files && req.files.aadhar_doc) {
  data.aadhar_doc = req.files.aadhar_doc[0].path;
}

if (req.files && req.files.pan_doc) {
  data.pan_doc = req.files.pan_doc[0].path;
}

if (req.files && req.files.photo) {
  data.photo = req.files.photo[0].path;
}

   data.balance_due = data.total_amount - (data.amount_paid || 0);
   if(data.balance_due === 0){
    data.status = "sold_out"
   }

   const customer = await Customer.create(data);

   res.status(201).json(customer);
})


module.exports = {createCustomerKyc}