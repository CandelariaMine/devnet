const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/conection"); // tu archivo de conexión

const Indicator = sequelize.define("Indicator", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  sistema: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  metrica: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: "indicadores_diarios",
  timestamps: false,
});

module.exports = Indicator;
