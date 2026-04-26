const db = require('../config/database.js')
const { DataTypes } = require("sequelize");

const Projects = db.define("projects", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  project_name: {
    type: DataTypes.STRING(150),
    unique: true
  },

  location: DataTypes.STRING(200),

  total_area: DataTypes.DECIMAL(10,2),
  total_plots: DataTypes.INTEGER,

  base_price_sqft: DataTypes.DECIMAL(10,2),

  launch_date: DataTypes.DATEONLY,

  status: {
    type: DataTypes.ENUM("active","completed","archived"),
    defaultValue: "active"
  }

}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false
});

module.exports = Projects