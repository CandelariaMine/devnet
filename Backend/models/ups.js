const { sequelize } = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const Ups = sequelize.define(
  "Ups",
  {
    ip: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status_prtg: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status_ups: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    batery: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_ups: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    uptime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ubication: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    prioridad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: "ups",
    timestamps: false,
  }
);

module.exports = { Ups }