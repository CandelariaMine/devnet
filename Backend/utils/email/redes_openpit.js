const { getApiData } = require("./getData");

const fetchDataOpenPit = async () => {
  try {
    const meshData = await getApiData("indicators/mesh");
    const fimData = await getApiData("fim");
    const anilloData = await getApiData("anillo-opit");
    const meshProcessData = await getApiData("mesh-process");
    const tetraData = await getApiData("anillo-tetra");

    // Procesar Mesh
    const meshUp = meshData.palasOk;
    const meshDown = meshData.palasFailed;

    // Procesar FIM
    const fimStatusList = fimData.data.fimStatus;
    const fimDown = fimStatusList.filter((item) => item.status_http.toLowerCase().includes("down")).length;
    const fimUp = fimStatusList.length - fimDown;

    // Procesar Anillo
    const anilloDown = anilloData.data.filter((item) => item.status.toLowerCase().includes("down")).length;
    const anilloUp = anilloData.data.filter((item) => item.status.toLowerCase().includes("up")).length;

    // Procesar Mesh Process
    const meshProcessDown = meshProcessData.data.filter((item) => item.status === "fail").length;
    const meshProcessUp = meshProcessData.data.filter((item) => item.status === "ok").length;

    // Procesar Tetra
    const tetraDown = tetraData.data.filter((item) => item.status.toLowerCase().includes("down")).length;
    const tetraUp = tetraData.data.filter((item) => item.status.toLowerCase().includes("up")).length;

    const openPitTable = `
    <div style="margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
      <h2 style="text-align: center; color: #111; font-size: 24px; margin: 0;">Redes Open Pit</h2>
      <div style="text-align: center; overflow-x: auto; margin-top: 20px;">
        <table style="width: 100%; max-width: 600px; display: inline-table; border-collapse: collapse; font-size: 10px; color: #333; table-layout: fixed; style="text-align: center;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="width: 40%; border: 1px solid #ddd; padding: 4px;">Sistema</th>
                  <th style="width: 30%; border: 1px solid #ddd; padding: 4px; background-color: rgb(3, 186, 31); color: white; font-weight: bold;">Up</th>
                  <th style="width: 30%; border: 1px solid #ddd; padding: 4px; background-color: red; color: white; font-weight: bold;">Down</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">Mesh</td>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${meshUp}</td>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${meshDown}</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">Radwin</td>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${fimUp}</td>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${fimDown}</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">Anillo</td>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${anilloUp}</td>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${anilloDown}</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">Clientes Open Pit</td>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${meshProcessUp}</td>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${meshProcessDown}</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">Red Tetra</td>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${tetraUp}</td>
                  <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${tetraDown}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      `;

    // const openPitTable = "XD"

    return openPitTable;
  } catch (error) {
    console.error("Error fetching Open Pit data:", error);
    throw new Error("Failed to fetch Open Pit data");
  }
};

module.exports = {
  fetchDataOpenPit,
};
