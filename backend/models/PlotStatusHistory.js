const { DataTypes } = require("sequelize");
const db = require("../config/database");

const PlotHistory = db.define("plot_history", {
  plot_id: DataTypes.INTEGER,
  status: DataTypes.STRING,
  changed_at: DataTypes.DATE
});

module.exports = PlotHistory;