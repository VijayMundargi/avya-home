const catchAsyncError = require('../middlewares/catachAsyncError.js');
const ErrorHandler = require('../utils/errorHandler.js');
const { Op } = require('sequelize');
const ExcelJS = require('exceljs');
const PlotHistory = require("../models/PlotHistoryModel.js");
const { Plot, Projects } = require('../models');



const createPlot = catchAsyncError(async (req, res, next) => {
  const data = req.body;

  if (!data.project_id || !data.plot_number) {
    return next(new ErrorHandler("Project & Plot number required", 400));
  }

  const project = await Projects.findByPk(data.project_id);
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  const exists = await Plot.findOne({
    where: {
      project_id: data.project_id,
      plot_number: data.plot_number.trim()
    }
  });

  if (exists) {
    return next(new ErrorHandler("Plot already exists", 400));
  }

  const sqft = parseFloat(data.dimension_sqft || 0);
  const price = parseFloat(data.bsp_per_sqft || 0);
  const plc = parseFloat(data.plc_charges || 0);
  const discount = parseFloat(data.discount || 0);

  const total_price = sqft * price + plc - discount;

  const plot = await Plot.create({
    ...data,
    plot_number: data.plot_number.trim(),
    total_price,
    status: "available",
    status_updated_at: new Date()
  });

  res.status(201).json({
    success: true,
    message: "Plot created successfully",
    plot
  });
});


const getPlots = catchAsyncError(async (req, res) => {
  const {
    project_id,
    status,
    search,
    block_code,
    min_size,
    max_size,
    min_price,
    max_price
  } = req.query;

  let where = {};

  if (project_id) where.project_id = project_id;
  if (status) where.status = status;
  if (block_code) where.block_code = block_code;

  if (search) {
    where.plot_number = { [Op.like]: `%${search}%` };
  }

  if (min_size || max_size) {
    where.dimension_sqft = {};
    if (min_size) where.dimension_sqft[Op.gte] = parseFloat(min_size);
    if (max_size) where.dimension_sqft[Op.lte] = parseFloat(max_size);
  }

  if (min_price || max_price) {
    where.total_price = {};
    if (min_price) where.total_price[Op.gte] = parseFloat(min_price);
    if (max_price) where.total_price[Op.lte] = parseFloat(max_price);
  }

  const plots = await Plot.findAll({
    where,
    include: [{
      model: Projects,
      as: "project",
      attributes: ["id", "project_name"]
    }],
    order: [["created_at", "DESC"]]
  });

  res.json({ success: true, plots });
});



const getPlot = catchAsyncError(async (req, res, next) => {
  const plot = await Plot.findByPk(req.params.id, {
    include: [{ model: Projects, as: "project" }]
  });

  if (!plot) {
    return next(new ErrorHandler("Plot not found", 404));
  }

  res.json({ success: true, plot });
});



const updatePlot = catchAsyncError(async (req, res, next) => {
  const plot = await Plot.findByPk(req.params.id);

  if (!plot) {
    return next(new ErrorHandler("Plot not found", 404));
  }

  const data = req.body;

  const sqft = data.dimension_sqft || plot.dimension_sqft;
  const price = data.bsp_per_sqft || plot.bsp_per_sqft;
  const plc = data.plc_charges ?? plot.plc_charges;
  const discount = data.discount ?? plot.discount;

  data.total_price =
    parseFloat(sqft) * parseFloat(price) +
    parseFloat(plc || 0) -
    parseFloat(discount || 0);

  await plot.update(data);

  res.json({
    success: true,
    message: "Plot updated",
    plot
  });
});



const deletePlot = catchAsyncError(async (req, res, next) => {
  const plot = await Plot.findByPk(req.params.id);

  if (!plot) {
    return next(new ErrorHandler("Plot not found", 404));
  }

  await plot.destroy();

  res.json({
    success: true,
    message: "Plot deleted successfully"
  });
});



const updateStatus = catchAsyncError(async (req, res, next) => {
  const { status } = req.body;

  // ✅ VALIDATE INPUT
  if (!status) {
    return next(new ErrorHandler("Status is required", 400));
  }

  // ✅ VALID STATUS ENUM
  const allowedStatus = ["available", "hold", "booked", "sold_out"];

  if (!allowedStatus.includes(status)) {
    return next(new ErrorHandler("Invalid status value", 400));
  }

  // ✅ FIND PLOT
  const plot = await Plot.findByPk(req.params.id);

  if (!plot) {
    return next(new ErrorHandler("Plot not found", 404));
  }

  const oldStatus = plot.status;

  // ❌ avoid duplicate history
  if (oldStatus === status) {
    return res.status(200).json({
      success: true,
      message: "Status unchanged",
      plot
    });
  }

  // ✅ UPDATE PLOT
  plot.status = status;
  plot.status_updated_at = new Date();
  await plot.save();

  try {
    // ✅ SAVE HISTORY
    await PlotHistory.create({
      plot_id: plot.id,
      old_status: oldStatus,
      new_status: status,
      changed_at: new Date()
    });
  } catch (err) {
    console.error("History save failed:", err.message);
    // don't break main flow
  }

  res.status(200).json({
    success: true,
    message: "Plot status updated",
    plot
  });
});



const exportPlots = catchAsyncError(async (req, res) => {
  const plots = await Plot.findAll();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Plots");

  sheet.columns = [
    { header: "Plot No", key: "plot_number" },
    { header: "Block", key: "block_code" },
    { header: "Size", key: "dimension_sqft" },
    { header: "Price", key: "total_price" },
    { header: "Status", key: "status" }
  ];

  plots.forEach(p => sheet.addRow(p.dataValues));

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=plots.xlsx"
  );

  await workbook.xlsx.write(res);
  res.end();
});


const getPlotHistory = catchAsyncError(async (req, res) => {
  const history = await PlotHistory.findAll({
    where: { plot_id: req.params.id },
    order: [["changed_at", "DESC"]]
  });

  res.json({
    success: true,
    history
  });
});

module.exports = {
  createPlot,
  getPlots,
  getPlot,
  updatePlot,
  deletePlot,
  updateStatus,
  exportPlots,
  getPlotHistory
};