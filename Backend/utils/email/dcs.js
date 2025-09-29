const { getApiData } = require("./getData");
const IndicatorService = require("../../controllers/metricas");
const fetchDataDcs = async () => {
  try {
    const fechaHoy = new Date().toISOString().slice(0, 10);
    const fechaAyer = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    // Obtener datos de la API
    const dataCandelaria = await getApiData("indicators/dcs-candelaria");
    const dataDesaladora = await getApiData("indicators/dcs-desaladora");

    // Preparar métricas a guardar
    const indicadoresCandelaria = {
      overall: dataCandelaria.overallKpi.indicador,
      disp: dataCandelaria.disponibilidad.indicador,
      infraSol: dataCandelaria.infraSolucion.indicador,
    };

    const indicadoresDesaladora = {
      overall: dataDesaladora.overallKpi.indicador,
      disp: dataDesaladora.disponibilidad.indicador,
    };

    // Guardar en la BD
    await IndicatorService.saveIndicators(fechaHoy, "DCS Candelaria", indicadoresCandelaria);
    await IndicatorService.saveIndicators(fechaHoy, "DCS Desaladora", indicadoresDesaladora);
    console.log("Si guardo");
    // // Traer los de ayer
    const ayerCandelaria = await IndicatorService.getIndicators(fechaAyer, "DCS Candelaria");
    const ayerDesaladora = await IndicatorService.getIndicators(fechaAyer, "DCS Desaladora");

    // Comparar métricas
    const comparacionCandelaria = IndicatorService.compareMetrics(indicadoresCandelaria, ayerCandelaria);
    const comparacionDesaladora = IndicatorService.compareMetrics(indicadoresDesaladora, ayerDesaladora);

    console.log("Comparación Candelaria:", comparacionCandelaria);
    console.log("Comparación Desaladora:", comparacionDesaladora);
    
    const dcsTable = `
    <div style="margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
      <h2 style="text-align: center; color: #111; font-size: 24px; margin: 0;">Control Proceso</h2>
      <h3 style="text-align: center; color: #111; margin-top: 4px;">DCS</h3>
      <div style="text-align: center; overflow-x: auto;">
        <table style="width: 100%; max-width: 600px; display: inline-table; border-collapse: collapse; font-size: 10px; color: #333; table-layout: fixed;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="width: 25%; border: 1px solid #ddd; padding: 4px;">Ubicación</th>
              <th style="width: 25%; border: 1px solid #ddd; padding: 4px;">Overall</th>
              <th style="width: 25%; border: 1px solid #ddd; padding: 4px;">Disp</th>
              <th style="width: 25%; border: 1px solid #ddd; padding: 4px;">Inf Sol</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Candelaria</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">
                ${indicadoresCandelaria.overall}% (${comparacionCandelaria.overall.trend === "up" ? "↑" : comparacionCandelaria.overall.trend === "down" ? "↓" : "="})
              </td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">
                ${indicadoresCandelaria.disp}% (${comparacionCandelaria.disp.trend === "up" ? "↑" : comparacionCandelaria.disp.trend === "down" ? "↓" : "="})
              </td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">
                ${indicadoresCandelaria.infraSol}% (${comparacionCandelaria.infraSol.trend === "up" ? "↑" : comparacionCandelaria.infraSol.trend === "down" ? "↓" : "="})
              </td>
            </tr>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Desaladora</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">
                ${indicadoresDesaladora.overall}% (${comparacionDesaladora.overall.trend === "up" ? "↑" : comparacionDesaladora.overall.trend === "down" ? "↓" : "="})
              </td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">
                ${indicadoresDesaladora.disp}% (${comparacionDesaladora.disp.trend === "up" ? "↑" : comparacionDesaladora.disp.trend === "down" ? "↓" : "="})
              </td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">N/A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;

    const otTable = `
      <h3 style="text-align: center; color: #111; margin-top: 24px;">Sistemas OT</h3>
      <div style="text-align: center; overflow-x: auto;">
        <table style="width: 100%; max-width: 600px; display: inline-table; border-collapse: collapse; font-size: 10px; color: #333; table-layout: fixed; style="text-align: center;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="width: 33%; border: 1px solid #ddd; padding: 4px;">Sistema</th>
              <th style="width: 17%; border: 1px solid #ddd; padding: 4px; background-color: rgb(3, 186, 31); color: white; font-weight: bold">Up</th>
              <th style="width: 17%; border: 1px solid #ddd; padding: 4px; background-color: red; color: white; font-weight: bold">Down</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">Red OT Flotación</td>
              <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">41</td>
              <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">0</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">MRA</td>
              <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">12</td>
              <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `;


    return dcsTable + otTable;
  } catch (error) {
    console.error("Error fetching DCS data:", error);
    throw new Error("Failed to fetch DCS data");
  }
};

module.exports = {
  fetchDataDcs,
};
