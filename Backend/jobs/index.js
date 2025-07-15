const cron = require("node-cron");
const { sendEmailReport } = require("./email_report");

console.log("Envio de correo importado correctamente");

// Ejecutar todos los días a las 7:00 AM
cron.schedule("0 7 * * *", async () => {
// cron.schedule("* * * * *", async () => {
  console.log("Ejecutando cronjob para enviar el reporte a las 7:00 AM...");
  await sendEmailReport();
});
