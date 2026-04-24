const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Associates = db.define("associates", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  associate_code: {
    type: DataTypes.STRING(20),
    unique: true
  },

  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  mobile: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isNumeric: true,
      len: [10, 15]
    }
  },

  email: {
    type: DataTypes.STRING(100),
    validate: {
      isEmail: true
    }
  },

  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  sponsor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "associates",
      key: "id"
    }
  },

  commission_pct: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.0
  },

  pan_number: DataTypes.STRING(20),
  aadhar_number: DataTypes.STRING(20),
  date_of_birth: DataTypes.DATEONLY,

  gender: DataTypes.ENUM("Male", "Female", "Other"),

  address: DataTypes.TEXT,

  bank_account: DataTypes.STRING(30),
  bank_ifsc: DataTypes.STRING(20),
  bank_name: DataTypes.STRING(100),

  nominee_name: DataTypes.STRING(100),
  nominee_relation: DataTypes.STRING(50),

  role: {
    type: DataTypes.ENUM("super_admin", "manager", "associate", "sub_associate"),
    defaultValue: "associate"
  },

  status: {
    type: DataTypes.ENUM("active", "inactive", "suspended"),
    defaultValue: "active"
  },
    resetOTP:{
        type:DataTypes.STRING
    },
    otpExpiry:{
        type:DataTypes.DATE
    },
 

  joining_date: DataTypes.DATEONLY

}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  freezeTableName: true,
  indexes: [
    { unique: true, fields: ["mobile"] },
    { unique: true, fields: ["associate_code"] }
  ]
});

module.exports = Associates;