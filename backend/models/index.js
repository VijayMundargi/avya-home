const Projects = require("./ProjectModel");
const Plot = require("./PlotModel");


Projects.hasMany(Plot, {
  foreignKey: "project_id",
  as: "plots"
});

Plot.belongsTo(Projects, {
  foreignKey: "project_id",
  as: "project"
});

module.exports = {
  Projects,
  Plot
};