const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.js");
const {createCustomerKyc} = require("../controllers/cutomer.controller.js");



router.post(
  "/customer/kyc",
  upload.fields([
    { name: "aadhar_doc" },
    { name: "pan_doc" },
    { name: "photo" }
  ]),
  createCustomerKyc
);

module.exports = router;