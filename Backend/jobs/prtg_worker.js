const axios = require("axios");
const https = require("https");
const { HistoricPrtgDown } = require("../models/historic_prtg_down");
const { getLocalDateTime } = require("../utils/getLocalDateTime");

// let simulateDown = true;
async function checkPrtgAndSaveIfDown() {
    try {
        const prtgUrl =
            "https://10.224.241.25/api/table.json?content=devices&name&filter_host=10.224.4.138";
        const params = {
            username: "canadmin",
            password: "Carrera01",
        };

        const response = await axios.get(prtgUrl, {
            params,
            timeout: 5000,
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        });

        const data = response.data;

        // if (simulateDown) {
        //     response.status = 500; // fuerzo caída
        //     simulateDown = false; // para que la siguiente iteración ya sea OK
        // }

        // 🔴 Simulación de caída si no responde o el status no es 200
        if (!data || typeof data !== "object" || response.status !== 200) {
            // Verificar si ya existe una caída abierta
            const lastDown = await HistoricPrtgDown.findOne({
                where: { upDatetime: null },
                order: [["downDatetime", "DESC"]],
            });

            if (!lastDown) {
                // No hay caída abierta → crear nueva
                await HistoricPrtgDown.create({
                    downDatetime: getLocalDateTime(),
                });
                console.log("PRTG caído 🚨 → Se registró inicio de la caída.");
            } else {
                console.log("PRTG sigue caído (ya está registrado).");
            }
        } else {
            // 🟢 Caso OK → verificar si hay caída abierta para cerrarla
            const lastDown = await HistoricPrtgDown.findOne({
                where: { upDatetime: null },
                order: [["downDatetime", "DESC"]],
            });

            if (lastDown) {
                const upTime = getLocalDateTime();
                const downTime = new Date(lastDown.downDatetime);
                const durationMs = new Date(upTime) - downTime;
                const durationSec = Math.floor(durationMs / 1000);

                await lastDown.update({
                    upDatetime: upTime,
                    duration: durationSec, // duración en segundos (puedes ajustarlo a min/hora)
                });

                console.log(
                    `✅ PRTG volvió a estar activo. Caída cerrada. Duración: ${durationSec} segundos`
                );
            } else {
                console.log("PRTG activo (no había caída abierta).");
            }
        }
    } catch (error) {
        console.error("❌ Error al consultar PRTG:", error.message);
    }
}


module.exports = { checkPrtgAndSaveIfDown };
