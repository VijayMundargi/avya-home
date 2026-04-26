const catchAsyncError = require('../middlewares/catachAsyncError.js');
const ErrorHandler = require('../utils/errorHandler.js');
const {Op} = require('sequelize')

const { Plot, Projects } = require('../models');
const createPlot = catchAsyncError(async (req, res, next) => {
  const {
    project_id,
    plot_number,
    block_code,
    dimension_sqft,
    plot_category,
    plot_facing,
    bsp_per_sqft,
    plc_charges
  } = req.body;

  if (!project_id || !plot_number) {
    return next(new ErrorHandler("Project & Plot number required", 400));
  }

  const project = await Projects.findByPk(project_id);
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  const exists = await Plot.findOne({
    where: {
      project_id,
      plot_number: plot_number.trim()
    }
  });

  if (exists) {
    return next(new ErrorHandler("Plot already exists", 400));
  }

  let total_price = null;
  if (dimension_sqft && bsp_per_sqft) {
    total_price =
      parseFloat(dimension_sqft) * parseFloat(bsp_per_sqft) +
      parseFloat(plc_charges || 0);
  }

  const plot = await Plot.create({
    project_id,
    plot_number: plot_number.trim(),
    block_code,
    dimension_sqft,
    plot_category,
    plot_facing,
    bsp_per_sqft,
    plc_charges,
    total_price,
    status_updated_at: new Date()
  });

  res.status(201).json({
    success: true,
    message: "Plot created successfully",
    plot
  });
});


const getPlots = catchAsyncError(async (req, res, next) => {
  const { project_id, status, search } = req.query;

  let where = {};

  if (project_id) where.project_id = project_id;
  if (status) where.status = status;

  if (search) {
    where.plot_number = {
      [Op.like]: `%${search}%`
    };
  }

  const plots = await Plot.findAll({
    where,
    include: [
      {
        model: Projects,
        as: "project", 
        attributes: ["id", "project_name"]
      }
    ],
    order: [["created_at", "DESC"]]
  });

  res.status(200).json({
    success: true,
    plots
  });
});

const getPlot = catchAsyncError(async(req,res,next)=>{
    const plot = await Plot.findByPk(req.params.id,{
        include:[
            {
                model:Projects,
                as:"project",
            }
        ]
    });

    if(!plot){
        return next(new ErrorHandler("Plot not found",404));
    }
    res.status(200).json({
        success:true,
        plot
    })

})

const updatePlot = catchAsyncError(async (req, res, next) => {
  const plot = await Plot.findByPk(req.params.id);

  if (!plot) {
    return next(new ErrorHandler("Plot not found", 404));
  }

  const updatedData = req.body;


  if (updatedData.dimension_sqft || updatedData.bsp_per_sqft || updatedData.plc_charges) {
    const sqft = updatedData.dimension_sqft || plot.dimension_sqft;
    const price = updatedData.bsp_per_sqft || plot.bsp_per_sqft;
    const plc = updatedData.plc_charges ?? plot.plc_charges;

    updatedData.total_price =
      parseFloat(sqft) * parseFloat(price) + parseFloat(plc || 0);
  }

  await plot.update(updatedData);

  res.status(200).json({
    success: true,
    message: "Plot updated",
    plot
  });
});

const deletePlot = catchAsyncError(async(req,res,next)=>{
    const plot = await Plot.findByPk(req.params.id)
    if(!plot){
        return next(new ErrorHandler("Plot not found",404));
    }

    await plot.destroy();
    res.status(200).json({
        success:true,
        message:"Plot deleted succcesfully"
    })
})

const updateStatus = catchAsyncError(async(req,res,next)=>{
    const {status} = req.body;
    const plot = await Plot.findByPk(req.params.id);
    if(!plot){
        return next(new ErrorHandler("plot not found",404))
    }
    const allowdStatus = ["allowd","hold","booked","sold-out"];
    if(!allowdStatus.includes(status)){
        return next(new ErrorHandler("Invalid status value",400))
    }
        plot.status = status;
        plot.status_updated_at = new Date();
        await plot.save();
        res.status(200).json({
            success:true,
            message:"Plot status updated",
            plot
        })
})


module.exports = {createPlot,getPlots,getPlot,updatePlot,deletePlot,updateStatus}
