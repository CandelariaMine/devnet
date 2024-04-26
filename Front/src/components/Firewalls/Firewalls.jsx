import { getFirewalls } from "../../utils/Api-candelaria/api";
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Status_System } from "../Status_System/Status_System";
import { DashFirewalls } from "./DashFirewalls/DashFirewalls";
import { Spinner } from "../Spinner/Spinner";
import { BASE_API_URL } from "../../utils/Api-candelaria/api";
import { FailHistoryFw } from "./FailHistoryFw";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import "./firewalls.css";

export function Firewalls() {
  const [firewalls, setFirewalls] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDownPaused, setFilterDownPaused] = useState(true);
  const [fwCommunity, setFwCommunity] = useState([]);
  const [fwCorporate, setFwCorporate] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showHistoryButton, setShowHistoryButton] = useState(false);
  const [showHistoryTable, setShowHistoryTable] = useState(false);
  const [dataHistoryFail, setDataHistoryFail] = useState([]);
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firewallsList = await getFirewalls();
        setFirewalls(firewallsList);

        // Filtrar los arreglos después de obtener los datos
        const corporateFirewalls = firewallsList.filter(
          (fw) => fw.ubication === "corporate"
        );
        const communityFirewalls = firewallsList.filter(
          (fw) => fw.ubication === "community"
        );
        setFwCorporate(corporateFirewalls);
        setFwCommunity(communityFirewalls);
        setShowSpinner(false);
        !jwtToken ? setShowHistoryButton(false) : setShowHistoryButton(true);
      } catch (error) {
        console.error("Error al obtener el listado de firewalls:", error);
        return error;
      }
    };
    fetchData();
  }, []);

  if (showSpinner) {
    return (
      <div>
        <Navbar title={"Firewalls - Canales Internet"} />
        <Spinner />
      </div>
    );
  }

  // Función para renderizar el cuerpo de la tabla
  const renderTableBody = (firewallsArray) => {
    if (firewallsArray.length === 0) {
      return (
        <tr>
          <td className="no-match" colSpan="14" style={{ fontSize: "13px" }}>
            No hay elementos
          </td>
        </tr>
      );
    }

    return firewallsArray.map((fw) => (
      <tr key={fw.id}>
        <td>{fw.fw}</td>
        <td>{fw.ip}</td>
        <td>{fw.num_users}</td>
        <td>{fw.canal}</td>
        <td>{fw.link}</td>
        <td className={fw.state === "dead" ? "kpi-red" : "kpi-green"}>
          {fw.state.toUpperCase()}
        </td>
        <td
          className={
            fw.packet_loss === "Not Found"
              ? ""
              : parseFloat(fw.packet_loss) > 5
              ? "kpi-red"
              : parseFloat(fw.packet_loss) >= 2 &&
                parseFloat(fw.packet_loss) <= 5
              ? "kpi-yellow"
              : ""
          }
        >
          {fw.packet_loss === "Not Found" ? "Not Found" : fw.packet_loss + "%"}
        </td>
        <td
          className={
            fw.latency === "Not Found"
              ? ""
              : parseFloat(fw.latency) > 100
              ? "kpi-red"
              : parseFloat(fw.latency) >= 50 && parseFloat(fw.latency) <= 100
              ? "kpi-yellow"
              : ""
          }
        >
          {fw.latency === "Not Found" ? "Not Found" : fw.latency + " ms"}
        </td>
        <td
          className={
            fw.jitter === "Not Found"
              ? ""
              : parseFloat(fw.jitter) > 30
              ? "kpi-red"
              : parseFloat(fw.jitter) >= 10 && parseFloat(fw.jitter) <= 30
              ? "kpi-yellow"
              : ""
          }
        >
          {fw.jitter === "Not Found" ? "Not Found" : fw.jitter + " ms"}
        </td>
        <td
          title={
            fw.status_gateway.includes("Down")
              ? "IP Gateway PRTG: Down"
              : "IP Gateway PRTG: Up"
          }
          style={{ cursor: "help" }}
          className={
            fw.status_gateway.includes("Up")
              ? "kpi-green"
              : fw.status_gateway.includes("Paused")
              ? "kpi-blue"
              : fw.status_gateway.includes("Down")
              ? "kpi-red"
              : fw.status_gateway.includes("Not Found") &&
                fw.gateway.includes("100.64.0.1")
              ? "kpi-green"
              : fw.status_gateway.includes("Not Found")
              ? "kpi-red"
              : ""
          }
        >
          {fw.gateway}
        </td>

        <td className={fw.failed_before === "Si" ? "kpi-yellow" : ""}>
          {fw.failed_before}
        </td>
      </tr>
    ));
  };

  const renderTableBody2 = (firewallsArray) => {
    if (firewallsArray.length === 0) {
      return (
        <tr>
          <td className="no-match" colSpan="14" style={{ fontSize: "13px" }}>
            No hay elementos
          </td>
        </tr>
      );
    }

    return firewallsArray.map((fw) => (
      <tr key={fw.id}>
        <td>{fw.fw}</td>
        <td>{fw.ip}</td>
        <td>{fw.canal}</td>
        <td>{fw.link}</td>
        <td>{fw.state}</td>
        <td
          className={
            fw.packet_loss === "Not Found"
              ? ""
              : parseFloat(fw.packet_loss) > 5
              ? "kpi-red"
              : parseFloat(fw.packet_loss) >= 2 &&
                parseFloat(fw.packet_loss) <= 5
              ? "kpi-yellow"
              : ""
          }
        >
          {fw.packet_loss === "Not Found" ? "Not Found" : fw.packet_loss + "%"}
        </td>
        <td
          className={
            fw.latency === "Not Found"
              ? ""
              : parseFloat(fw.latency) > 100
              ? "kpi-red"
              : parseFloat(fw.latency) >= 50 && parseFloat(fw.latency) <= 100
              ? "kpi-yellow"
              : ""
          }
        >
          {fw.latency === "Not Found" ? "Not Found" : fw.latency + " ms"}
        </td>
        <td
          className={
            fw.jitter === "Not Found"
              ? ""
              : parseFloat(fw.jitter) > 30
              ? "kpi-red"
              : parseFloat(fw.jitter) >= 10 && parseFloat(fw.jitter) <= 30
              ? "kpi-yellow"
              : ""
          }
        >
          {fw.jitter === "Not Found" ? "Not Found" : fw.jitter + " ms"}
        </td>
        <td
          className={
            fw.status_gateway.includes("Up")
              ? "kpi-green"
              : fw.status_gateway.includes("Paused")
              ? "kpi-blue"
              : fw.status_gateway.includes("Down")
              ? "kpi-red"
              : ""
          }
        >
          {fw.gateway}
        </td>

        <td>{fw.failed_before}</td>
      </tr>
    ));
  };

  // Función para renderizar el contador de líneas
  const renderRowCount = (firewallsArray) => {
    const rowCount = firewallsArray.length;
    return (
      <div className="row-count" style={{ fontSize: "0.8rem" }}>
        Total de elementos: {rowCount}
      </div>
    );
  };

  // // Funcion para obtener historial de fallas de los FW
  // const getHistoryFail = async () => {
  //   setShowHistoryButton(false);
  //   setShowLoadingButton(true);
  //   setTimeout(async () => {
  //     try {
  //       const request = await axios.get(
  //         `${BASE_API_URL}/firewalls/history-fail`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${jwtToken}`,
  //           },
  //         }
  //       );
  //       if (request.status === 200) {
  //         setDataHistoryFail(request.data);
  //         setShowHistoryTable(true);
  //         setShowHistoryButton(true);
  //         setShowLoadingButton(false);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setShowHistoryButton(true);
  //       setShowLoadingButton(false);
  //     }
  //   }, 3000);
  // };

  // Funcion para obtener historial de fallas de los FW
  const getHistoryFail = async () => {
    setShowHistoryButton(false);
    setShowLoadingButton(true);
    try {
      const request = await axios.get(
        `${BASE_API_URL}/firewalls/history-fail`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (request.status === 200) {
        setDataHistoryFail(request.data);
        setShowHistoryTable(true);
        setShowHistoryButton(true);
        setShowLoadingButton(false);
      }
    } catch (error) {
      console.error(error);
      setShowHistoryButton(true);
      setShowLoadingButton(false);
    }
  };

  return (
    <>
      {showHistoryTable && (
        <FailHistoryFw
          dataHistoryFail={dataHistoryFail}
          setShowHistoryTable={setShowHistoryTable}
        />
      )}
      <Navbar title={"Firewalls - Canales Internet"} />

      {showLoadingButton && <BeatLoader className="charging-bar" color="red" />}
      {showHistoryButton && (
        <button
          style={{ cursor: "pointer" }}
          onClick={() => getHistoryFail()}
          className="history-button-fw"
        >
          Historial de Fallas
        </button>
      )}
      <Status_System tableToShow={"fw"} />
      <DashFirewalls />
      <div className="firewalls-container">
        <h2>FW - Canales Corporativos</h2>
        <table>
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>IP</th>
              <th>NÚMERO USUARIOS</th>
              <th>CANAL</th>
              <th>DATOS ENLACE</th>
              <th>ESTADO</th>
              <th>PERDIDAS</th>
              <th>LATENCIA</th>
              <th>JITTER</th>
              <th>GATEWAY</th>
              <th>FALLO 24Hrs</th>
            </tr>
          </thead>
          <tbody>{renderTableBody(fwCorporate)}</tbody>
        </table>
        {renderRowCount(fwCorporate)}
      </div>

      <div className="firewalls-container">
        <h2>FW - Canales Comunitarios / Villa</h2>
        <table>
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>IP</th>
              <th>CANAL</th>
              <th>DATOS ENLACE</th>
              <th>ESTADO</th>
              <th>PERDIDAS</th>
              <th>LATENCIA</th>
              <th>JITTER</th>
              <th>GATEWAY</th>
              <th>FALLO 24Hrs</th>
            </tr>
          </thead>
          <tbody>{renderTableBody2(fwCommunity)}</tbody>
        </table>
        {renderRowCount(fwCommunity)}
      </div>
    </>
  );
}
