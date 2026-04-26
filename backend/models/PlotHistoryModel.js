const { DataTypes } = require("sequelize");
const db = require("../config/database");

const PlotHistory = db.define("plot_history", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  plot_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  old_status: DataTypes.STRING,
  new_status: DataTypes.STRING,

  changed_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }

}, {
  timestamps: false
});

module.exports = PlotHistory;