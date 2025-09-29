// utils/sendEmail.js
const nodemailer = require("nodemailer");
const { fetchDataDevices } = require("../utils/email/devices");
const { fetchDataDcs } = require("../utils/email/dcs");
const { navbar } = require("../utils/email/title");
const { fetchDataOpenPit } = require("../utils/email/redes_openpit");
const { fetchDataUps } = require("../utils/email/ups");
const { fetchDataCanales } = require("../utils/email/canales");
const { fetchDataWan } = require("../utils/email/wan");
const { fetchDataInfraGen } = require("../utils/email/infra_general");
const { fetchDataDragos } = require("../utils/email/dragos");
const { fetchDataUG } = require("../utils/email/mina_ug");

const transporter = nodemailer.createTransport({
  host: "10.224.98.53",
  port: 25,
  secure: false,
});

const sendEmailReport = async () => {
  console.log("Iniciando envio de Email");
  try {
    const dashDevices = await fetchDataDevices();
    const dashDcs = await fetchDataDcs();
    const title = navbar();
    const openPitData = await fetchDataOpenPit();
    const upsData = await fetchDataUps();
    const dashCanales = await fetchDataCanales();
    const dashWan = await fetchDataWan();
    const dashInfraGen = await fetchDataInfraGen();
    const dashDragos = await fetchDataDragos();
    const dashUG = await fetchDataUG();

    const footer = `
    <div style="width: 600px; margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
        <p style="text-align: center; color: #ddd; font-size: 10px;">Los datos recopilados en este correo fueron tomados el dia de hoy a las 7:00 AM</p>
      </div>
    `;
    console.log("Fetchdata para email ready");
    // Enviar el correo
    const result = await transporter.sendMail({
      from: "Devnet <devnet@lundinmining.com>",
      to: [
        "juan.munera@sgtnetworks.com",
        "julio.coral@sgtnetworks.com",
        "adriana.franco@sgtnetworks.com",
        // "jorge.torres@lundinmining.com",
        "alan.munoz@lundinmining.com",
        "oscar.palomino@lundinmining.com",
        "luis.alfaro@lundinmining.com",
        "alvaro.pardo@lundinmining.com",
      ],
      subject: "Reporte Devnet Candelaria",
      html:
        title +
        dashDcs +
        upsData +
        openPitData +
        dashDevices +
        dashCanales +
        dashWan +
        dashInfraGen +
        dashDragos +
        dashUG +
        footer,
    });

    console.log("Respuesta enviada correctamente", result);
    return { statusCode: 200, message: "Correo enviado correctamente" };
  } catch (error) {
    console.error("Error enviando correo:", error);
    return { statusCode: 500, message: "Error enviando correo" };
  }
};

sendEmailReport()

module.exports = { sendEmailReport };
