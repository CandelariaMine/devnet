const { getRedClienteServidor_1 } = require("../../../services/overall/RCS1");
const { getRedClienteServidor_2 } = require("../../../services/overall/RCS2");
const { getRedControl_1 } = require("../../../services/overall/RC1");
const { getRedControl_2 } = require("../../../services/overall/RC2");
const { getRed_HSE } = require("../../../services/overall/RHSE");

// Filtramos por aquellos clientes que incluyan en estado "Down" o "Paused (paused)"
const getDownClients = (listAllClients) => {
  return listAllClients.filter((client) => client.status_prtg.includes("Down"));
};

function overallDesaladora(listAllClients) {
  const listAllDownClients = getDownClients(listAllClients);

  const redClienteServidor1 = getRedClienteServidor_1(listAllDownClients);
  const redClienteServidor2 = getRedClienteServidor_2(listAllDownClients);
  const puntosRestarRCS = redClienteServidor1 + redClienteServidor2;

  const redControl1 = getRedControl_1(listAllDownClients);
  const redControl2 = getRedControl_2(listAllDownClients);
  const puntosRestarRC = redControl1 + redControl2;

  const puntosRestarRHSE = getRed_HSE(listAllDownClients);
  let puntosTotalesRCS2 = 0;
  let puntosTotalesRC2 = 0;
  let puntosTotalesHSE2 = 0;

  listAllClients.forEach((client) => {
    if (client.group === "CSP" || client.group === "CSS") {
      if (client.importancia === "ALTA") {
        puntosTotalesRCS2 = puntosTotalesRCS2 + 4;
      }
      if (client.importancia === "MEDIA") {
        puntosTotalesRCS2 = puntosTotalesRCS2 + 2;
      }
      if (client.importancia === "BAJA") {
        puntosTotalesRCS2 = puntosTotalesRCS2 + 0.2;
      }
    }
  });

  listAllClients.forEach((client) => {
    if (
      client.group === "CNP" ||
      client.group === "CNS" ||
      client.group === "CNPB" ||
      client.group === "CNSB"
    ) {
      if (client.importancia === "ALTA") {
        puntosTotalesRC2 = puntosTotalesRC2 + 4;
      }
      if (client.importancia === "MEDIA") {
        puntosTotalesRC2 = puntosTotalesRC2 + 2;
      }
      if (client.importancia === "BAJA") {
        puntosTotalesRC2 = puntosTotalesRC2 + 0.2;
      }
    }
  });

  listAllClients.forEach((client) => {
    if (client.group === "HSE") {
      if (client.importancia === "ALTA") {
        puntosTotalesHSE2 = puntosTotalesHSE2 + 4;
      }
      if (client.importancia === "MEDIA") {
        puntosTotalesHSE2 = puntosTotalesHSE2 + 2;
      }
      if (client.importancia === "BAJA") {
        puntosTotalesHSE2 = puntosTotalesHSE2 + 0.2;
      }
    }
  });

  const porcentajeRCS = parseFloat(
    (((puntosTotalesRCS2 - puntosRestarRCS) / puntosTotalesRCS2) * 100).toFixed(
      2
    )
  );
  const porcentajeRC = parseFloat(
    (((puntosTotalesRC2 - puntosRestarRC) / puntosTotalesRC2) * 100).toFixed(2)
  );
  const porcentajeHSE = parseFloat(
    (
      ((puntosTotalesHSE2 - puntosRestarRHSE) / puntosTotalesHSE2) *
      100
    ).toFixed(2)
  );
  const resultado_overall = parseFloat(
    ((porcentajeRCS + porcentajeRC + porcentajeHSE) / 3).toFixed(2)
  );

  return {
    indicador: resultado_overall,
    "Red Cliente Servidor": porcentajeRCS,
    "Red de Control": porcentajeRC,
    "Red HSE": porcentajeHSE,
  };
}

module.exports = { overallDesaladora, getDownClients };
