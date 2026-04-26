const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} = require("../controllers/project.controller");

const { isAuthenticated } = require("../middlewares/auth");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.post("/project", isAuthenticated, authorizeRoles("super_admin"), createProject);
router.get("/project", isAuthenticated, getProjects);
router.get("/project/:id", isAuthenticated, getProject);
router.put("/project/:id", isAuthenticated, authorizeRoles("super_admin"), updateProject);
router.delete("/project/:id", isAuthenticated, authorizeRoles("super_admin"), deleteProject);

module.exports = router;