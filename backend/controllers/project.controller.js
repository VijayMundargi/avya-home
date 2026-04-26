const Projects = require('../models/ProjectModel.js');
const catchAsyncError = require('../middlewares/catachAsyncError.js');
const ErrorHandler = require('../utils/errorHandler.js');
const { where } = require('sequelize');

const createProject = catchAsyncError(async (req, res, next) => {

  const {
    project_name,
    location,
    total_area,
    base_price_sqft,
    launch_date
  } = req.body;

  
  if (!project_name || !location) {
    return next(new ErrorHandler("Project name and location are required", 400));
  }

 
  const exists = await Projects.findOne({
    where: {
        project_name: project_name.toLowerCase()
}
  });

  if (exists) {
    return next(new ErrorHandler("Project already exists", 400));
  }

  
  const project = await Projects.create({
    project_name,
    location,
    total_area,
    base_price_sqft,
    launch_date,
    total_plots: 0
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    project
  });

});


const getProjects = catchAsyncError(async(req,res,next)=>{
    const projects = await Projects.findAll({
        order:[["created_at", "DESC"]]
    })
    res.json({
        success:true,
        projects
    })
})

const getProject = catchAsyncError(async(req,res,next)=>{
    const project = await Projects.findByPk(req.params.id);
    if(!project){
        return next(new ErrorHandler("No project found",404));
    }
    res.status(200).json({
        success:true,
        project,
    })
})

const updateProject = catchAsyncError(async(req,res,next)=>{
    const project = await Projects.findByPk(req.params.id)
    if(!project){
        return next(new ErrorHandler("Project not found",404))
    }

    await project.update(req.body);
    res.status(200).json({
        success:true,
        message:"Project updated sucessfull",
        project
    })
})

const deleteProject = catchAsyncError(async (req, res, next) => {

    const project = await Projects.findByPk(req.params.id);

    if (!project) {
        return next(new ErrorHandler("Project not found", 404));
    }

    await project.destroy(); 

    res.status(200).json({
        success: true,
        message: "Project deleted successfully"
    });

});


module.exports = {createProject,getProject,getProjects,updateProject,deleteProject}