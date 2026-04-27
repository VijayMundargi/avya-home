const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(100),
    },

    aadhar_number: {
      type: DataTypes.STRING(20),
    },

    pan_number: {
      type: DataTypes.STRING(20),
    },

    address: {
      type: DataTypes.TEXT,
    },

    plot_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    promoter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    booking_date: {
      type: DataTypes.DATE,
    },

    total_amount: {
      type: DataTypes.DECIMAL(12, 2),
    },

    amount_paid: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },

    balance_due: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },

    status: {
      type: DataTypes.ENUM("active", "sold_out", "cancelled"),
      defaultValue: "active",
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "customers",
    timestamps: false, 
  }
);

module.exports = Customer;