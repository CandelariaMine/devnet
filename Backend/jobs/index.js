const cron = require("node-cron");
const { sendEmailReport } = require("./email_report");
const { checkPrtgAndSaveIfDown  } = require("./prtg_worker")

console.log("Envio de correo importado correctamente");

// Ejecutar todos los días a las 7:00 AM
cron.schedule("0 7 * * *", async () => {
// cron.schedule("* * * * *", async () => {
  console.log("Ejecutando cronjob para enviar el reporte a las 7:00 AM...");
  await sendEmailReport();
});

// Ejecutar cada 10 minutos
cron.schedule("*/10 * * * *", async () => {
  console.log("Ejecutando cronjob para verificar PRTG cada 10 minutos...");
  await checkPrtgAndSaveIfDown();
});
