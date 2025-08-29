const { sequelize } = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const HistoricPrtgDown = sequelize.define(
  "HistoricPrtgDown",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    downDatetime: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
    upDatetime: {
      type: DataTypes.STRING(225),
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING(225),
      allowNull: true,
    },
  },
  {
    tableName: "historic_prtg_down",
    timestamps: false,
  }
);

module.exports = { HistoricPrtgDown };
