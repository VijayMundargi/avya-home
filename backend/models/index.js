const Projects = require("./ProjectModel");
const Plot = require("./PlotModel");
const PlotHistory = require("./PlotStatusHistory");
const Customer = require("./CustomerModel");
const Associate = require("./AssociateModel");


Projects.hasMany(Plot, { foreignKey: "project_id", as: "plots" });
Plot.belongsTo(Projects, { foreignKey: "project_id", as: "project" });


Plot.hasMany(PlotHistory, { foreignKey: "plot_id", as: "history" });
PlotHistory.belongsTo(Plot, { foreignKey: "plot_id", as: "plot" });



Plot.hasMany(Customer, { foreignKey: "plot_id", as: "customers" });
Customer.belongsTo(Plot, { foreignKey: "plot_id", as: "plot" });



Associate.hasMany(Customer, { foreignKey: "promoter_id", as: "customers" });
Customer.belongsTo(Associate, { foreignKey: "promoter_id", as: "promoter" });



module.exports = {
  Projects,
  Plot,
  PlotHistory,
  Customer,
  Associate,
};