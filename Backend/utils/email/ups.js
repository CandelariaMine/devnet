const { getApiData } = require("./getData");

const fetchDataUps = async () => {
  try {
    const allUps = await getApiData("ups");
    // console.log(allUps);

    let enLinea = 0;
    let usandoBateria = 0;
    let otro = 0;
    let changeBateryCounter = 0;

    // allUps.data?.forEach((ups) => {
    //   if (ups.status_ups === 2) {
    //     enLinea++;
    //   } else if (ups.status_ups === 3) {
    //     usandoBateria++;
    //   } else {
    //     otro++;
    //   }

    //   if (ups.batery === 2) {
    //     changeBateryCounter++;
    //   }
    // });

    if (allUps) {
      allUps.data.forEach(({ status_ups, batery }) => {
        switch (status_ups) {
          case 2:
            enLinea++;
            break;
          case 3:
            usandoBateria++;
            break;
          default:
            otro++;
        }

        if (batery === 2) {
          changeBateryCounter++;
        }
      });
    }

    const ups = `
    <div style="margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
      <h2 style="text-align: center; color: #111; font-size: 24px; margin: 0;">UPS</h2>
      <div style="text-align: center; overflow-x: auto; margin-top: 20px;">
        <table style="width: 100%; max-width: 600px; border-collapse: collapse; font-size: 10px; color: #333; table-layout: fixed; style="text-align: center;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="width: 50%; border: 1px solid #ddd; padding: 4px;">Estado</th>
              <th style="width: 50%; border: 1px solid #ddd; padding: 4px;">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">En línea</td>	
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${enLinea}</td>
            </tr>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Usando batería</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${usandoBateria}</td>
            </tr>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Otro</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${otro}</td>
            </tr>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Cambio batería</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${changeBateryCounter}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    `;

    return ups;
  } catch (error) {
    console.error("Error fetching UPS data:", error);
    throw new Error("Failed to fetch device data");
  }
};

module.exports = {
  fetchDataUps,
};
