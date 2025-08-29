import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";
import { getDataDragos } from "../../utils/Api-candelaria/api";
import "./Dragos.css";

export function Dragos() {
  const [anilloData, setAnilloData] = useState([]);
  const PRTG_URL = "https://10.224.241.25/sensor.htm?id=";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataDragos();

        setAnilloData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const statusLight = (idInterface) => {
    // Verifica si hay datos en anilloData
    if (anilloData.length === 0) {
      return ""; // O cualquier otro valor que desees para indicar que no hay datos disponibles
    }

    // Busca la interfaz en anilloData
    const interfaceData = anilloData.find((data) => data.id_prtg === idInterface);

    // Verifica si se encontró la interfaz y si su estado incluye "Up" o "Down"
    if (interfaceData && interfaceData.status) {
      if (interfaceData.status.toLowerCase().includes("up")) {
        return "anillo-green";
      }
      if (interfaceData.status.toLowerCase().includes("down")) {
        return "anillo-red";
      }
      if (interfaceData.status.toLowerCase().includes("unusual")) {
        return "anillo-orange";
      }
      if (interfaceData.status.toLowerCase().includes("paused")) {
        return "anillo-blue";
      }
    }

    return "anillo-grey";
  };

  const statusTitle = (idInterface) => {
    // Verifica si hay datos en anilloData
    if (anilloData.length === 0) {
      return ""; // O cualquier otro valor que desees para indicar que no hay datos disponibles
    }

    // Busca la interfaz en anilloData
    const interfaceData = anilloData.find((e) => e.id_prtg === idInterface);

    // Verifica si se encontró la interfaz y si su estado incluye "Up" o "Down"
    if (interfaceData && interfaceData.status) {
      return `${interfaceData.name} - ${interfaceData.location}: ${interfaceData.status}`;
    }

    // En caso de no encontrar datos o que el estado no incluya "Up" o "Down"
    return "Not Found"; // O cualquier otro valor que desees para indicar un estado no válido
  };

  return (
    <main className="main-container-dragos">
      <Navbar title={"Sistema Dragos"} />
      <DatetimeModules module={"dragos"} name={"Sistema Dragos"} />
      <div className="dragos-image-container">
        <img className="dragos-image" src="/mapa_dragos.webp" alt="" />
        
        
        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("17493")} className={`status-light-dragos id17493 ${statusLight("17493")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}17493&tabid=1`} target="_blank">
                Te1/12
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("17497")} className={`status-light-dragos id17497 ${statusLight("17497")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}17497&tabid=1`} target="_blank">
              Te1/16
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("17481")} className={`status-light-dragos id17481 ${statusLight("17481")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}17481&tabid=1`} target="_blank">
              Te1/7
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("17495")} className={`status-light-dragos id17495 ${statusLight("17495")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}17495&tabid=1`} target="_blank">
              Te1/14
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("20154")} className={`status-light-dragos id20154 ${statusLight("20154")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20154&tabid=1`} target="_blank">
              Eth/1/45
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("20153")} className={`status-light-dragos id20153 ${statusLight("20153")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20153&tabid=1`} target="_blank">
              Te1/11
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("17155")} className={`status-light-dragos id17155 ${statusLight("17155")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}17155&tabid=1`} target="_blank">
              Gi2/0/11
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("20152")} className={`status-light-dragos id20152 ${statusLight("20152")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20152&tabid=1`} target="_blank">
              Gi1/0/18
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("20151")} className={`status-light-dragos id20151 ${statusLight("20151")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20151&tabid=1`} target="_blank">
              FaD/17
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("20368")} className={`status-light-dragos id20368 ${statusLight("20368")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20368&tabid=1`} target="_blank">
              Gi1/0/2
              </a>
            </p>
          </div>
        </div>
     
        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("20367")} className={`status-light-dragos id20367 ${statusLight("20367")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20367&tabid=1`} target="_blank">
              Gi0/19
              </a>
            </p>
          </div>
        </div>
     
        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("20364")} className={`status-light-dragos id20364 ${statusLight("20364")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20364&tabid=1`} target="_blank">
              G1/0/31
              </a>
            </p>
          </div>
        </div>
     
        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("20365")} className={`status-light-dragos id20365 ${statusLight("20365")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20365&tabid=1`} target="_blank">
              G1/0/31
              </a>
            </p>
          </div>
        </div>
     
        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("20366")} className={`status-light-dragos id20366 ${statusLight("20366")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20366&tabid=1`} target="_blank">
              Te1/2
              </a>
            </p>
          </div>
        </div>
     
        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("20360")} className={`status-light-dragos id20360 ${statusLight("20360")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20360&tabid=1`} target="_blank">
              G1/0/12
              </a>
            </p>
          </div>
        </div>
     
        <div className="main-lights-dragos-container">
          <div className="status-light-anillo-container">
            <p title={statusTitle("20361")} className={`status-light-dragos id20361 ${statusLight("20361")}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20361&tabid=1`} target="_blank">
              G1/0/6
              </a>
            </p>
          </div>
        </div>
     
      </div>
    </main>
  );
}
