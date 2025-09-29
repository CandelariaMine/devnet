
const Indicator = require("../models/indicadores_diarios");

class IndicatorService {
  // Guardar indicadores en la base de datos
  async saveIndicators(fecha, sistema, indicadores) {
    const registros = Object.entries(indicadores).map(([metrica, valor]) => ({
      fecha,
      sistema,
      metrica,
      valor,
    }));

    await Indicator.bulkCreate(registros);
  }

  // Obtener indicadores por fecha, sistema y ubicación
  async getIndicators(fecha, sistema) {
    const rows = await Indicator.findAll({
      where: { fecha, sistema },
    });

    return rows.reduce((acc, row) => {
      acc[row.metrica] = parseFloat(row.valor);
      return acc;
    }, {});
  }

  // Comparar métricas de hoy vs ayer
  compareMetrics(today, yesterday) {
    const result = {};
    for (const metric in today) {
      const diff = today[metric] - (yesterday[metric] || 0);
      result[metric] = {
        today: today[metric],
        yesterday: yesterday[metric] || "N/A",
        diff,
        trend: diff > 0 ? "up" : diff < 0 ? "down" : "equal",
      };
    }
    return result;
  }
}

module.exports = new IndicatorService();

