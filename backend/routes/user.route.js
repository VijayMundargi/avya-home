const express = require('express');
const Associates = require('../models/AssociateModel.js');
const {
  login,
  logout,
  forgotPassword,
  changePassword,
  resetPassword
} = require("../controllers/user.controller.js");

const { isAuthenticated } = require('../middlewares/auth.js');
const validate = require('../helpers/validate.js');

const {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema
} = require('../validators/auth.schema');

const router = express.Router();


router.post(
  '/login',
  validate(loginSchema),
  login
);


router.post(
  '/logout',
  isAuthenticated,
  logout
);

router.get('/me', isAuthenticated, async (req, res) => {
  const user = await Associates.findByPk(req.user.id);

  res.json({
    success: true,
    user
  });
});

router.post(
  '/password/forgot',
  validate(forgotPasswordSchema),
  forgotPassword
);


router.post(
  '/password/reset',
  validate(resetPasswordSchema),
  resetPassword
);


router.post(
  '/password/change',
  isAuthenticated,
  validate(changePasswordSchema),
  changePassword
);

module.exports = router;