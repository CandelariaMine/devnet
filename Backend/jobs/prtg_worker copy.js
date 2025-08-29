const axios = require('axios');
const https = require('https');
const { HistoricPrtgDown } = require('../models/historic_prtg_down');
const { getLocalDateTime } = require('../utils/getLocalDateTime');

async function checkPrtgAndSaveIfDown() {
    try {
        const prtgUrl = "https://10.224.241.25/api/table.json?content=devices&name&filter_host=10.224.4.138";
        const params = {
            username: "canadmin",
            password: "Carrera01"
        };
        const response = await axios.get(prtgUrl, {
            params,
            timeout: 5000,
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });
        const data = response.data;
        response.status = 500;
        if (!data || typeof data !== 'object' || response.status !== 200) {
            await HistoricPrtgDown.create({
                datetime: getLocalDateTime()
            });
            console.log('PRTG está caído, registro guardado.');
        } else {
            console.log('PRTG está activo.');
        }
    } catch (error) {
        // await GroupPrtgDownDatetimes.create({
        //     id_prtg: '10.224.4.138',
        //     datetime: getLocalDateTime()
        // });
        console.error('Error al consultar PRTG, registro guardado:', error.message);
    }
}

// setInterval(() => {
//     checkPrtgAndSaveIfDown();
// }, 5000);


module.exports = { checkPrtgAndSaveIfDown };
