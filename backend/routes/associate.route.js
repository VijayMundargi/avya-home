const express = require('express');

const {
    createAssociate,
    getAllAssociate,
    getAssociate,
    updateAssociate,
    resetAssociatePassword,
} = require('../controllers/associate.controller.js');

const { isAuthenticated } = require('../middlewares/auth.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const validate = require('../helpers/validate.js');
const { associateSchema } = require('../validators/associate.schema.js');

const router = express.Router();


router.post(
  '/associate',
  isAuthenticated,
  authorizeRoles("super_admin"),
  createAssociate
);


router.get(
  '/associate',
  isAuthenticated,
  authorizeRoles("super_admin", "manager"),
  getAllAssociate
);


router.get(
  '/associate/:id',
  isAuthenticated,
  authorizeRoles("super_admin", "manager"),
  getAssociate
);


router.put(
  '/associate/:id',
  isAuthenticated,
  authorizeRoles("super_admin"),
  updateAssociate
);


router.put(
  '/associate/reset-password/:id',
  isAuthenticated,
  authorizeRoles("super_admin"),
  resetAssociatePassword
);

module.exports = router;