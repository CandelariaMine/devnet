import { getFirewalls } from "../../utils/Api-candelaria/api";
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { DashFirewalls } from "./DashFirewalls/DashFirewalls";
import { Spinner } from "../Spinner/Spinner";
import { BASE_API_URL } from "../../utils/Api-candelaria/api";
import { FailHistoryFw } from "./FailHistoryFw";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";
import BeatLoader from "react-spinners/BeatLoader";
import PuffLoader from "react-spinners/PuffLoader";
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
  const [arrayHistoryFail, setArrayHistoryFail] = useState([]);
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const [fwHistory, setFwHistory] = useState({});
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firewallsList = await getFirewalls();
        setFirewalls(firewallsList.data);

        // Filtrar los arreglos después de obtener los datos
        const corporateFirewalls = firewallsList.data.filter(
          (fw) => fw.ubication === "corporate"
        );
        const communityFirewalls = firewallsList.data.filter(
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
        <td>{fw.name}</td>
        <td>{fw.ip}</td>
        <td
          className={
            fw.num_users && fw.num_users.includes("Not Found") ? "kpi-red" : ""
          }
        >
          {!fw.num_users ? "Actualizando..." : fw.num_users}
        </td>
        <td>{fw.channel}</td>
        <td>{fw.link}</td>
        <td
          title={
            fw.fail_datetime !== "No fail reported"
              ? `Falló desde ${fw.fail_datetime}`
              : ""
          }
          style={{
            cursor: fw.fail_datetime !== "No fail reported" ? "help" : "",
          }}
          className={
            fw.state &&
            (fw.state === "dead"
              ? "kpi-red"
              : fw.state.toLowerCase().includes("error")
              ? "kpi-red"
              : fw.state === "Not Found"
              ? "kpi-red"
              : "kpi-green")
          }
        >
          {!fw.state ? `Actualizando...` : fw.state.toUpperCase()}
        </td>
        <td
          className={
            fw.packet_loss &&
            (!fw.packet_loss.includes(".")
              ? "kpi-red"
              : parseFloat(fw.packet_loss) > 5
              ? "kpi-red"
              : parseFloat(fw.packet_loss) >= 2 &&
                parseFloat(fw.packet_loss) <= 5
              ? "kpi-yellow"
              : "")
          }
        >
          {/* {!fw.packet_loss.includes(".")
            ? fw.packet_loss
            : fw.packet_loss + "%"
            ? fw.packet_loss === null
            : "Actualizando..."} */}
          {fw.packet_loss === null
            ? "Actualizando..."
            : !fw.packet_loss.includes(".")
            ? fw.packet_loss
            : fw.packet_loss + "%"}
        </td>
        <td
          className={
            fw.latency &&
            (!fw.latency.includes(".")
              ? "kpi-red"
              : parseFloat(fw.latency) > 100
              ? "kpi-red"
              : parseFloat(fw.latency) >= 50 && parseFloat(fw.latency) <= 100
              ? "kpi-yellow"
              : "")
          }
        >
          {!fw.latency
            ? "Actualizando..."
            : !fw.latency.includes(".") && fw.latency
            ? fw.latency
            : fw.latency + " ms"}
          {/* {fw.latency &&
            (!fw.latency.includes(".")
              ? fw.latency
              : fw.latency + " ms"
              ? fw.latency === null
              : "Actualizando...")} */}
        </td>
        <td
          className={
            fw.jitter &&
            (!fw.jitter.includes(".")
              ? "kpi-red"
              : parseFloat(fw.jitter) > 30
              ? "kpi-red"
              : parseFloat(fw.jitter) >= 10 && parseFloat(fw.jitter) <= 30
              ? "kpi-yellow"
              : "")
          }
        >
          {!fw.jitter
            ? "Actualizando..."
            : !fw.jitter.includes(".")
            ? fw.jitter
            : fw.jitter + " ms"}
          {/* {fw.jitter &&
            (!fw.jitter.includes(".")
              ? fw.jitter
              : fw.jitter + " ms"
              ? fw.jitter === null
              : "Actualizando...")} */}
        </td>
        <td
          title={
            fw.status_gateway &&
            (fw.status_gateway.includes("Down")
              ? "IP Gateway PRTG: Down"
              : "IP Gateway PRTG: Up")
          }
          style={{ cursor: "help" }}
          className={
            fw.status_gateway &&
            (fw.status_gateway.includes("Up")
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
              : "")
          }
        >
          {fw.gateway}
        </td>

        <td
          onClick={fw.failed_before === "Si" ? () => getHistoryFail(fw) : null}
          style={{ cursor: fw.failed_before === "Si" ? "pointer" : "default" }}
        >
          {!fw.failed_before ? "No" : fw.failed_before}
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
        <td>{fw.name}</td>
        <td>{fw.ip}</td>
        <td>{fw.channel}</td>
        <td>{fw.link}</td>
        <td
          title={
            fw.fail_datetime && fw.fail_datetime !== "No fail reported"
              ? fw.fail_datetime
              : ""
          }
          style={{
            cursor: fw.fail_datetime !== "No fail reported" ? "help" : "",
          }}
          className={
            fw.state &&
            (fw.state === "dead"
              ? "kpi-red"
              : fw.state.toLowerCase().includes("error")
              ? "kpi-red"
              : fw.state === "Not Found"
              ? "kpi-red"
              : "kpi-green")
          }
        >
          {!fw.state ? "Actualizando..." : fw.state.toUpperCase()}
        </td>
        <td
          className={
            fw.packet_loss &&
            (!fw.packet_loss.includes(".")
              ? "kpi-red"
              : parseFloat(fw.packet_loss) > 5
              ? "kpi-red"
              : parseFloat(fw.packet_loss) >= 2 &&
                parseFloat(fw.packet_loss) <= 5
              ? "kpi-yellow"
              : "")
          }
        >
          {!fw.packet_loss
            ? "Actualizando..."
            : fw.packet_loss === "Not Found"
            ? "Not Found"
            : fw.packet_loss + "%"}
          {/* {fw.packet_loss === "Not Found" ? "Not Found" : fw.packet_loss + "%"} */}
        </td>
        <td
          className={
            fw.latency &&
            (!fw.latency.includes(".")
              ? "kpi-red"
              : parseFloat(fw.latency) > 100
              ? "kpi-red"
              : parseFloat(fw.latency) >= 50 && parseFloat(fw.latency) <= 100
              ? "kpi-yellow"
              : "")
          }
        >
          {!fw.latency
            ? "Actualizando..."
            : !fw.latency.includes(".") && fw.latency
            ? fw.latency
            : fw.latency + " ms"}
        </td>
        <td
          className={
            fw.jitter &&
            (!fw.jitter.includes(".")
              ? "kpi-red"
              : parseFloat(fw.jitter) > 30
              ? "kpi-red"
              : parseFloat(fw.jitter) >= 10 && parseFloat(fw.jitter) <= 30
              ? "kpi-yellow"
              : "")
          }
        >
          {!fw.jitter
            ? "Actualizando..."
            : !fw.jitter.includes(".")
            ? fw.jitter
            : fw.jitter + " ms"}
        </td>
        <td
          className={
            fw.status_gateway &&
            (fw.status_gateway.includes("Up")
              ? "kpi-green"
              : fw.status_gateway.includes("Paused")
              ? "kpi-blue"
              : fw.status_gateway.includes("Down")
              ? "kpi-red"
              : "")
          }
        >
          {fw.gateway}
        </td>

        <td
          className={fw.failed_before === "Si" ? "kpi-yellow" : ""}
          onClick={fw.failed_before === "Si" ? () => getHistoryFail(fw) : null}
          style={{ cursor: fw.failed_before === "Si" ? "pointer" : "default" }}
        >
          {fw.failed_before}
        </td>
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

  // Funcion para obtener historial de fallas de los FW
  const getHistoryFail = async (dataFw) => {
    setShowHistoryButton(false);
    setShowLoadingButton(true);
    setFwHistory({
      name: dataFw.name,
      channel: dataFw.channel,
      ubication: dataFw.ubication,
    });
    try {
      const request = await axios.post(
        `${BASE_API_URL}/firewalls/history-fail`,
        {
          ...dataFw,
        }
      );
      if (request.status === 200) {
        setArrayHistoryFail(request.data.data);
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
          fwHistory={fwHistory}
          arrayHistoryFail={arrayHistoryFail}
          setShowHistoryTable={setShowHistoryTable}
        />
      )}
      <Navbar title={"Firewalls - Canales Internet"} />

      {showLoadingButton && <BeatLoader className="charging-bar" color="red" />}
      {/* {showHistoryButton && (
        <button
          style={{ cursor: "pointer" }}
          onClick={() => getHistoryFail()}
          className="history-button-fw"
        >
          Historial de Fallas
        </button>
      )} */}
      <DatetimeModules module={"firewalls"} name={"firewalls"} />
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