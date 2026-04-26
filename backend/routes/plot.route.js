const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth.js");

const {
  createPlot,
  getPlots,
  getPlot,
  updatePlot,
  deletePlot,
  updateStatus,
  exportPlots,
  getPlotHistory
} = require("../controllers/plot.controller.js");


router.post("/", isAuthenticated, createPlot);


router.get("/", isAuthenticated, getPlots);

router.get("/export/all", isAuthenticated, exportPlots);

router.get("/:id", isAuthenticated, getPlot);

router.put("/:id", isAuthenticated, updatePlot);


router.delete("/:id", isAuthenticated, deletePlot);

router.put("/:id/status", isAuthenticated, updateStatus);
router.get("/:id/history", isAuthenticated, getPlotHistory);

module.exports = router;