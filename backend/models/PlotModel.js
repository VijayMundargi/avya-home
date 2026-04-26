const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Plot = db.define("plots", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "projects",
      key: "id"
    }
  },

  plot_number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },

  block_code: {
    type: DataTypes.STRING(20)
  },

  dimension_sqft: {
    type: DataTypes.DECIMAL(10, 4)
  },

  plot_category: {
    type: DataTypes.STRING(100)
  },

  plot_facing: {
    type: DataTypes.STRING(50)
  },

  bsp_per_sqft: {
    type: DataTypes.DECIMAL(10, 2)
  },

  total_price: {
    type: DataTypes.DECIMAL(12, 2)
  },

  plc_charges: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },

  status: {
    type: DataTypes.ENUM("available", "hold", "booked", "sold_out"),
    defaultValue: "available"
  },

  status_updated_at: {
    type: DataTypes.DATE
  }

}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,

  indexes: [
    {
      unique: true,
      fields: ["project_id", "plot_number"] // ✅ no duplicate plot in same project
    }
  ]
});

module.exports = Plot;