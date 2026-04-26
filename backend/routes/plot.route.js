const express = require("express");
const router = express.Router();


const { isAuthenticated } = require('../middlewares/auth.js');

const {
  createPlot,
  getPlots,
  getPlot,
  updatePlot,
  deletePlot,
  updateStatus  
} = require("../controllers/plot.controller.js");

router.post("/create-plot", isAuthenticated, createPlot);
router.get("/get-plot", isAuthenticated, getPlots);
router.get("/get-plot/:id", isAuthenticated, getPlot);
router.put("/update-plot/:id", isAuthenticated, updatePlot);
router.delete("/delete-plot/:id", isAuthenticated, deletePlot);


router.put("/update-status/:id/status", isAuthenticated, updateStatus);

module.exports = router;