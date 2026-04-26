const Projects = require("./ProjectModel");
const Plot = require("./PlotModel");
const PlotHistory = require("./PlotStatusHistory");

Projects.hasMany(Plot, { foreignKey: "project_id", as: "plots" });
Plot.belongsTo(Projects, { foreignKey: "project_id", as: "project" });

Plot.hasMany(PlotHistory, { foreignKey: "plot_id" });

module.exports = { Projects, Plot, PlotHistory };