import axios from "axios";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
let envi;

if (ENVIRONMENT === "local") {
  envi = "localhost";
} else if (ENVIRONMENT === "development") {
  envi = "10.224.116.78";
} else if (ENVIRONMENT === "production") {
  envi = "10.224.116.14";
}

export const BASE_API_URL = `http://${envi}:3001/api/v1/candelaria`;

// Url para redirigir a PRTG y CISCO desde la tabla
export const PRTG_URL = "https://10.224.241.25/device.htm?id=";
export const CISCO_URL =
  "https://10.224.241.14/webacs/loginAction.do?action=login&product=wcs&selectedCategory=en#pageId=full_search_pageId&query=";
export const CISCO_URL_IT =
  "https://10.224.116.90/webacs/loginAction.do?action=login&product=wcs&selectedCategory=en#pageId=full_search_pageId&query=";

export const getPrtgStatus = async () => {
  return axios
    .get(`${BASE_API_URL}/status-prtg`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("getPrtgStatus: Error obteniendo el estado de prtg: ", error);
    });
};

export const getVmDevnetStatus = async () => {
  return axios
    .get(`${BASE_API_URL}/devnet/vm`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("getVmDevnetStatus: Error obteniendo el estado de las VMs de Devnet: ", error);
    });
};

export const getDatetimeModules = async () => {
  return axios
    .get(`${BASE_API_URL}/status/modules`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("getDatetimeModules:Error del API REST Candealaria : ", error);
    });
};

export const getAnilloUgUpDown = async () => {
  return axios
    .get(`${BASE_API_URL}/anillo-ug/updown`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("getAnilloUgUpDown (ANILLO UG):Error del API REST Candealaria : ", error);
    });
};

export const getIndicators = async () => {
  return axios
    .get(`${BASE_API_URL}/indicators/`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("INDICADORES: Error del API REST Candealaria : ", error);
    });
};

export const getClients = async () => {
  return axios
    .get(`${BASE_API_URL}/clients`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("CLIENTES DESALADORA: Error del API REST Candealaria : ", error);
    });
};

export const getClientsDesaladora = async () => {
  return axios
    .get(`${BASE_API_URL}/clients/desaladora`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("CLIENTES: Error del API REST Candealaria : ", error);
    });
};

export const getSwitches = async () => {
  return axios
    .get(`${BASE_API_URL}/switches`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("SWITCHES: Error del API REST Candealaria : ", error);
    });
};

export const getUps = async () => {
  return axios
    .get(`${BASE_API_URL}/ups`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("UPS: Error del API REST Candealaria : ", error);
    });
};

export const getVpn = async () => {
  return axios
    .get(`${BASE_API_URL}/vpn`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("VPN: Error del API REST Candealaria : ", error);
    });
};

export const getMesh = async () => {
  return axios
    .get(`${BASE_API_URL}/mesh`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("MESH: Error del API REST Candealaria : ", error);
    });
};

export const getDevices = async () => {
  return axios
    .get(`${BASE_API_URL}/devices`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("DEVICES: Error del API REST Candealaria : ", error);
    });
};

export const getFirewalls = async () => {
  return axios
    .get(`${BASE_API_URL}/firewalls`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("FIREWALLS: Error del API REST Candealaria : ", error);
    });
};

export const getWan = async () => {
  return axios
    .get(`${BASE_API_URL}/wan`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("WAN: Error del API REST Candealaria : ", error);
    });
};

export const geHistorictWan = async (ip) => {
  return axios
    .get(`${BASE_API_URL}/wan/historic/${ip}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("HISTORICO WAN: Error del API REST Candealaria : ", error);
    });
};

export const getDcsCandelariaIndicators = async () => {
  return axios
    .get(`${BASE_API_URL}/indicators/dcs-candelaria`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("INDICADOR DCS CANDELARIA: Error del API REST Candealaria : ", error);
    });
};

export const getDcsDesaladoraIndicators = async () => {
  return axios
    .get(`${BASE_API_URL}/indicators/dcs-desaladora`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("INDICADOR DCS CANDELARIA: Error del API REST Candealaria : ", error);
    });
};

export const getDevicesIndicators = async () => {
  return axios
    .get(`${BASE_API_URL}/indicators/devices`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("INDICADOR DEVICES: Error del API REST Candealaria : ", error);
    });
};

export const getFirewallsIndicators = async () => {
  return axios
    .get(`${BASE_API_URL}/indicators/firewalls`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("INDICADOR FIREWALLS: Error del API REST Candealaria : ", error);
    });
};

export const getWanIndicators = async () => {
  return axios
    .get(`${BASE_API_URL}/indicators/wan`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("INDICADOR WAN: Error del API REST Candealaria : ", error);
    });
};

export const getMeshIndicators = async () => {
  return axios
    .get(`${BASE_API_URL}/indicators/mesh`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("INDICADOR MESH: Error del API REST Candealaria : ", error);
    });
};

export const getUsers = async () => {
  return axios
    .get(`${BASE_API_URL}/users`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("USUAROS: Error del API REST Candealaria : ", error);
    });
};

export const getInterfaces = async () => {
  return axios
    .get(`${BASE_API_URL}/interfaces`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("INTERFACES: Error del API REST Candealaria : ", error);
    });
};

export const getSystemHealth = async () => {
  return axios
    .get(`${BASE_API_URL}/system-health`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("SYSTEM HEALTH: Error del API REST Candealaria : ", error);
    });
};

export const getNeighbors = async () => {
  return axios
    .get(`${BASE_API_URL}/neighbors`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("NEIGHBORS: Error del API REST Candealaria : ", error);
    });
};

export const getDefaultRoute = async () => {
  return axios
    .get(`${BASE_API_URL}/route-default`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("DEFAULT ROUTE: Error del API REST Candealaria : ", error);
    });
};

export const getStatusCores = async () => {
  return axios
    .get(`${BASE_API_URL}/status-cores`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("STATUS CORES: Error del API REST Candealaria : ", error);
    });
};

export const getDataInfGen = async () => {
  return axios
    .get(`${BASE_API_URL}/infra_general`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("LA VIEJA ", error);
    });
};

export const getKpiInfGenDevices = async () => {
  return axios
    .get(`${BASE_API_URL}/infra_general/kpi/devices`)
    .then((response) => response)
    .catch((error) => {
      throw new Error("Error obteniendo kpi de i.g. por equipo: ", error);
    });
};

export const getKpiInfGenByCategory = async () => {
  return axios
    .get(`${BASE_API_URL}/infra_general/kpi/categories`)
    .then((response) => response)
    .catch((error) => {
      throw new Error("Error obteniendo kpi de i.g. por categoria: ", error);
    });
};

export const getKpiInfGen = async () => {
  return axios
    .get(`${BASE_API_URL}/infra_general/kpi`)
    .then((response) => response)
    .catch((error) => {
      throw new Error("Error obteniendo kpi general de i.g.: ", error);
    });
};

export const getKpiCertificados = async () => {
  return axios
    .get(`${BASE_API_URL}/group-prtg/certificados`)
    .then((response) => response)
    .catch((error) => {
      throw new Error("Error obteniendo kpi de certificados de i.g.: ", error);
    });
};

export const getAp = async () => {
  return axios
    .get(`${BASE_API_URL}/infra_general/ap`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("AP: Error del API REST Candealaria : ", error);
    });
};

export const getDataClientsPac = async () => {
  return axios
    .get(`${BASE_API_URL}/pac/clients`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("CLIENTS PAC: Error del API REST Candealaria : ", error);
    });
};

export const getDataClientsOjos = async () => {
  return axios
    .get(`${BASE_API_URL}/ojos/clients`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("CLIENTS OJOS: Error del API REST Candealaria : ", error);
    });
};

export const getDataBaseFim = async () => {
  return axios
    .get(`${BASE_API_URL}/fim`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("FIM: Error del API REST Candealaria : ", error);
    });
};

// export const getDataBaseFimDatesRange = async () => {
//   return axios
//     .get(`${BASE_API_URL}/fim/range`)
//     .then((response) => response.data)
//     .catch((error) => {
//       throw new Error("FIM: Error del API REST Candealaria : ", error);
//     });
// };

export const getDataAnillo = async () => {
  return axios
    .get(`${BASE_API_URL}/anillo-opit`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("ANILLO: Error del API REST Candealaria : ", error);
    });
};

export const getDataActility = async () => {
  return axios
    .get(`${BASE_API_URL}/actility`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("ACTILITY: Error del API REST Candealaria : ", error);
    });
};

export const getDataMeshProcess = async () => {
  return axios
    .get(`${BASE_API_URL}/mesh-process`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("MESH PROCESS: Error del API REST Candealaria : ", error);
    });
};

export const getDataPrtgGroups = async () => {
  return axios
    .get(`${BASE_API_URL}/group-prtg`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("GRUOPS PRTG: Error del API REST Candealaria : ", error);
    });
};

export const getDataPrtgGroupsUpDown = async () => {
  return axios
    .get(`${BASE_API_URL}/group-prtg/updown`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("GRUOPS PRTG UP DOWN: Error del API REST Candealaria : ", error);
    });
};

export const getDataAnilloUg = async () => {
  return axios
    .get(`${BASE_API_URL}/anillo-ug`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("ANILLO UG: Error del API REST Candealaria : ", error);
    });
};

export const getDataDockers = async () => {
  return axios
    .get(`${BASE_API_URL}/dockers`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("Dockers: Error del API REST Candealaria : ", error);
    });
};

export const getDataAnilloTetra = async () => {
  return axios
    .get(`${BASE_API_URL}/anillo-tetra`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("ANILLO TETRA: Error del API REST Candealaria : ", error);
    });
};

export const getDataDragos = async () => {
  return axios
    .get(`${BASE_API_URL}/dragos`)
    .then((response) => response)
    .catch((error) => {
      throw new Error("DRAGOS: Error del API REST Candealaria : ", error);
    });
};

export const getDataFlotacionOt = async () => {
  return axios
    .get(`${BASE_API_URL}/flotacion-ot`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("RED OT FLOTACION: Error del API REST Candealaria : ", error);
    });
};

export const getDataFlotacionOtUpDown = async () => {
  return axios
    .get(`${BASE_API_URL}/flotacion-ot/updown`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("RED OT FLOTACION: Error del API REST Candealaria : ", error);
    });
};

export const getDataAnilloTetraUpDown = async () => {
  return axios
    .get(`${BASE_API_URL}/anillo-tetra/updown`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("ANILLO TETRA UP DOWN: Error del API REST Candealaria : ", error);
    });
};

export const getMra = async () => {
  return axios
    .get(`${BASE_API_URL}/mra`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("MRA: Error del API REST Candealaria : ", error);
    });
};

export const getMraUpDown = async () => {
  return axios
    .get(`${BASE_API_URL}/mra/updown`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("MRA UP DOWN: Error del API REST Candealaria : ", error);
    });
};

export const getLicenciamientos = async () => {
  return axios
    .get(`${BASE_API_URL}/licenciamientos`)
    .then((response) => response.data)
    .catch((error) => {
      return error.response;
    });
};
