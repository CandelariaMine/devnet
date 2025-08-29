import { useEffect, useState } from "react";
import { Navbar } from "../../Navbar/Navbar";
import {
  getInterfaces,
  getSystemHealth,
  getNeighbors,
  getDefaultRoute,
} from "../../../utils/Api-candelaria/api";
import { useLocation } from "react-router-dom";
import { Spinner } from "../../Spinner/Spinner";
import { InfGenDatetime } from "../../DatetimeModules/InfGenDatetime";
import "./Details.css";
import { RouteDefaultTable } from "./Bgp";

export const Details = () => {
  const [devicesInterfaces, setDevicesInterfaces] = useState([]);
  const [devicesHealth, setDevicesHealth] = useState([]);
  const [neighbors, setNeighbors] = useState([]);
  const [routeStatus, setRouteStatus] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [apList, setApList] = useState([]);
  const [showBttnBgp, setShowBttnBgp] = useState(false);
  // const [numApPrtg, setNumApPrtg] = useState("Cargando...");
  // const [numApDb, setNumApDb] = useState("Cargando...");
  // const [showOthers, setShowOthers] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dataInterfaces = await getInterfaces();
        dataInterfaces = dataInterfaces.data;
        dataInterfaces.sort((a, b) => (a.status === "Up" ? 1 : -1));

        let dataDevicesHealth = await getSystemHealth();
        dataDevicesHealth = dataDevicesHealth.data;
        dataDevicesHealth.sort((a, b) => (a.status === "Up" ? 1 : -1));

        let dataNeighbors = await getNeighbors();
        dataNeighbors = dataNeighbors.data;
        dataNeighbors.sort((a, b) => (a.status === "Up" ? 1 : -1));

        const dataRouteStatus = await getDefaultRoute();

        // let dataAp = await getAp();
        // dataAp.apList.sort((a, b) => (a.status === "Joined" ? 1 : -1));

        setDevicesHealth(dataDevicesHealth);
        setRouteStatus(dataRouteStatus);
        setDevicesInterfaces(dataInterfaces);
        setNeighbors(dataNeighbors);
        // setApList(dataAp.apList);
        // setNumApPrtg(dataAp.numberApRegisteredPrtg);
        // setNumApDb(dataAp.numberApRegisteredDb);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Obtener el parámetro "nombre" del URL
    const urlParams = new URLSearchParams(window.location.search);
    const nombreParam = urlParams.get("nombre");

    // Aplicar el valor al estado del filtro
    if (nombreParam) {
      setFilterValue(nombreParam);
    }
    if (nombreParam && nombreParam.toLowerCase().includes("sw core")) {
      setShowBttnBgp(true);
    }
  }, []);

  const filterData = (data) => {
    // Filtrar los datos basados en el valor del filtro

    return data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  };

  devicesHealth.forEach((element) => {
    // Primer If es porque los neighbors no tienen `name`
    if (element.name && element.name.includes("System Health")) {
      // if (element.status.includes("Paused") || element.status.includes("Unusual")) {
      //   element.color = "blue";
      // }
      if (
        element.status === "Up" &&
        element.name.includes("CPU") &&
        parseInt(element.lastvalue) <= 90
      ) {
        element.color = "";
      }
      if (
        (element.name.includes("CPU") && parseInt(element.lastvalue) > 90) ||
        (element.name.includes("CPU") && element.status.includes("Down"))
      ) {
        element.color = "red";
      }
      if (
        element.status === "Up" &&
        element.name.includes("Power Supplies") &&
        element.lastvalue === "Normal"
      ) {
        element.color = "";
      }
      if (
        element.name.includes("Power Supplies") &&
        element.lastvalue.includes("Down")
      ) {
        element.color = "red";
      }
      if (
        element.name.includes("Power Supplies") &&
        element.lastvalue.includes("Warning")
      ) {
        element.color = "yellow";
      }
      if (
        element.status === "Up" &&
        element.name.includes("Temperatures") &&
        parseInt(element.lastvalue) < 70
      ) {
        element.color = "";
      }
      if (
        (element.name.includes("Temperatures") &&
          parseInt(element.lastvalue) >= 70) ||
        (element.name.includes("Temperatures") &&
          element.status.includes("Down"))
      ) {
        element.color = "red";
      }
      if (
        (element.name.includes("Memory") &&
          element.name_switch === "WLC 9800 NEGOCIO" &&
          parseInt(element.lastvalue.replace(".", "")) <= 1000) ||
        (element.name.includes("Memory") &&
          element.name_switch === "WLC 9800 NEGOCIO" &&
          element.status.includes("Down"))
      ) {
        element.color = "red";
      }
    }
  });

  if (loading) {
    // Si la información está cargando, renderizar el Spinner
    return (
      <div>
        <Navbar title={"Detalles Inf. Gen."} />
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Navbar title={"Detalles Inf. Gen."} />
      <InfGenDatetime />
      {showBttnBgp && (<RouteDefaultTable/>)}
      <div className="search-container-details-ig">
        <label htmlFor="search">Buscar por palabre clave</label>
        <input
          id="search"
          type="text"
          placeholder="Filtrar datos"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
      <main className="table-details-inf-gen-container">
        {filterData(devicesInterfaces).length === 0 ? (
          <div style={{ display: "none" }}></div>
        ) : (
          <div className="div-details-inf-gen">
            <h3>Interfaces</h3>
            <table className="table-details-inf-gen">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Switch</th>
                </tr>
              </thead>
              <tbody>
                {filterData(devicesInterfaces).length === 0 ? (
                  <tr>
                    <td colSpan="3">No hay elementos</td>
                  </tr>
                ) : (
                  filterData(devicesInterfaces).map((interfaceDevice) => (
                    <tr key={interfaceDevice.id + interfaceDevice.id_prtg}>
                      <td>{interfaceDevice.name}</td>
                      <td
                        className={
                          interfaceDevice.status === "Up"
                            ? "kpi-green"
                            : interfaceDevice.status.includes("Down")
                            ? "kpi-red"
                            : interfaceDevice.status.includes("Warning")
                            ? "kpi-yellow"
                            : "kpi-blue"
                        }
                      >
                        {interfaceDevice.status}
                      </td>
                      <td>{interfaceDevice.name_switch}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {filterData(devicesHealth).length === 0 ? (
          <div style={{ display: "none" }}></div>
        ) : (
          <div className="div-details-inf-gen">
            <h3>System Health</h3>
            <table className="table-details-inf-gen">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Info</th>
                  <th>Switch</th>
                </tr>
              </thead>
              <tbody>
                {filterData(devicesHealth).length === 0 ? (
                  <tr>
                    <td colSpan="4">No hay elementos</td>
                  </tr>
                ) : (
                  filterData(devicesHealth).map((healthDevice) => (
                    <tr key={healthDevice.id + healthDevice.id_prtg}>
                      <td>{healthDevice.name}</td>
                      <td
                        className={
                          healthDevice.status === "Up"
                            ? "kpi-green"
                            : healthDevice.status.includes("Down")
                            ? "kpi-red"
                            : healthDevice.status.includes("Warning")
                            ? "kpi-yellow"
                            : "kpi-blue"
                        }
                      >
                        {healthDevice.status}
                      </td>
                      <td className={`kpi-${healthDevice.color}`}>
                        {healthDevice.lastvalue}
                      </td>
                      <td>{healthDevice.name_switch}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {filterData(neighbors).length === 0 ? (
          <div style={{ display: "none" }}></div>
        ) : (
          <div className="div-details-inf-gen">
            <h3>Neighbors</h3>
            <table className="table-details-inf-gen">
              <thead>
                <tr>
                  <th>IP</th>
                  <th>Estado</th>
                  <th>Neighbor</th>
                  <th>Interface</th>
                  <th>Switch</th>
                </tr>
              </thead>
              <tbody>
                {filterData(neighbors).length === 0 ? (
                  <tr>
                    <td colSpan="5">No hay elementos</td>
                  </tr>
                ) : (
                  filterData(neighbors).map((neighbor) => (
                    <tr key={neighbor.id + neighbor.ip_neighbor}>
                      <td>{neighbor.ip_neighbor}</td>
                      <td
                        className={
                          neighbor.status !== "Up" ? "kpi-red" : "kpi-green"
                        }
                      >
                        {neighbor.status}
                      </td>
                      <td>{neighbor.neighbor.toUpperCase()}</td>
                      <td
                        style={{ cursor: "help" }}
                        className={
                          neighbor.interface_descrip === "" ? "kpi-grey" : ""
                        }
                        title={
                          neighbor.interface_descrip === ""
                            ? "No description"
                            : neighbor.interface_descrip
                        }
                      >
                        {neighbor.interface_descrip === ""
                          ? `${neighbor.interface} `
                          : neighbor.interface}
                      </td>

                      <td>{neighbor.name_switch}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};
