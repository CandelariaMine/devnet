import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";
import { Link } from "react-router-dom";
import { getDataAnillo, PRTG_URL } from "../../utils/Api-candelaria/api";
import "./Anillo.css";

export const Anillo = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [anilloData, setAnilloData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataAnillo();
        setAnilloData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleZoomIn = () => {
    // Ajusta el nivel de zoom según sea necesario
    if (zoomLevel < 4) {
      setZoomLevel(zoomLevel + 1);
    }
  };

  const handleZoomOut = () => {
    // Ajusta el nivel de zoom según sea necesario
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 1);
    }
  };

  const statusLight = (idInterface) => {
    // Verifica si hay datos en anilloData
    if (anilloData.length === 0) {
      return ""; // O cualquier otro valor que desees para indicar que no hay datos disponibles
    }

    // Busca la interfaz en anilloData
    const interfaceData = anilloData.find((data) => data.id_prtg === idInterface);

    // Verifica si se encontró la interfaz y si su estado incluye "Up" o "Down"
    if (interfaceData && interfaceData.status) {
      if (interfaceData.status.includes("Up")) {
        return "anillo-green";
      }
      if (interfaceData.status.includes("Down")) {
        return "anillo-red";
      }
      if (interfaceData.status.includes("Unusual")) {
        return "anillo-orange";
      }
      if (interfaceData.status.includes("Paused")) {
        return "anillo-blue";
      }
    }

    // En caso de no encontrar datos o que el estado no incluya "Up" o "Down"
    return "anillo-white"; // O cualquier otro valor que desees para indicar un estado no válido
  };

  const statusTitle = (idInterface) => {
    // Verifica si hay datos en anilloData
    if (anilloData.length === 0) {
      return ""; // O cualquier otro valor que desees para indicar que no hay datos disponibles
    }

    // Busca la interfaz en anilloData
    const interfaceData = anilloData.find((data) => data.id_prtg === idInterface);

    // Verifica si se encontró la interfaz y si su estado incluye "Up" o "Down"
    if (interfaceData && interfaceData.status) {
      {
        return `Device: ${interfaceData.device} - Sensor: ${interfaceData.sensor} - ${
          interfaceData.status || "Not Found"
        }`;
      }
    }

    // En caso de no encontrar datos o que el estado no incluya "Up" o "Down"
    return "Not Found"; // O cualquier otro valor que desees para indicar un estado no válido
  };

  return (
    <>
      <Navbar title={"Anillo Candelaria"} />
      <DatetimeModules module={"anillo_opit"} name={"anillo opit"} />
      <div className="button-zoom-container">
        <button className="button-zoom zoom-in" onClick={handleZoomIn}>
          +
        </button>
        <button className="button-zoom zoom-out" onClick={handleZoomOut}>
          -
        </button>
      </div>
      <main className={`background-anillo zoom-${zoomLevel}`}>
        <div className="main-anillo-container">
          <img src="/anillo_opit.webp" alt="anillo" />
          <div className=".main-lights-anillo-container">
            
            <div className="status-light-anillo-opit-container">
              <a style={{ color: "black" }} href={`${PRTG_URL}20644&tabid=1`} target="_blank">
                <p // 10.224.92.3
                  title={statusTitle(20645)}
                  className={`status-light-anillo id20645 ${statusLight(20645)}`}
                ></p>
              </a>
            </div>

            <div className="status-light-anillo-opit-container">
              <a style={{ color: "black" }} href={`${PRTG_URL}19531&tabid=1`} target="_blank">
                <p // 10.224.92.30
                  title={statusTitle(19532)}
                  className={`status-light-anillo id19532 ${statusLight(19532)}`}
                ></p>
              </a>
            </div>

            <div className="status-light-anillo-opit-container">
              <a style={{ color: "black" }} href={`${PRTG_URL}19523&tabid=1`} target="_blank">
                <p // 10.224.92.25
                  title={statusTitle(19524)}
                  className={`status-light-anillo id19524 ${statusLight(19524)}`}
                ></p>
              </a>
            </div>

            <div className="status-light-anillo-opit-container">
              <a style={{ color: "black" }} href={`${PRTG_URL}19509&tabid=1`} target="_blank">
                <p // 10.224.92.20
                  title={statusTitle(19510)}
                  className={`status-light-anillo id19510 ${statusLight(19510)}`}
                ></p>
              </a>
            </div>

            <div className="status-light-anillo-opit-container">
              <a style={{ color: "black" }} href={`${PRTG_URL}19517&tabid=1`} target="_blank">
                <p // 10.224.92.22
                  title={statusTitle(19518)}
                  className={`status-light-anillo id19518 ${statusLight(19518)}`}
                ></p>
              </a>
            </div>

            <div className="status-light-anillo-opit-container">
              <a style={{ color: "black" }} href={`${PRTG_URL}19519&tabid=1`} target="_blank">
                <p // 10.224.92.24
                  title={statusTitle(19520)}
                  className={`status-light-anillo id19520 ${statusLight(19520)}`}
                ></p>
              </a>
            </div>

            <div className="status-light-anillo-opit-container">
              <a style={{ color: "black" }} href={`${PRTG_URL}20682&tabid=1`} target="_blank">
                <p // 10.224.92.23
                  title={statusTitle(20683)}
                  className={`status-light-anillo id20683 ${statusLight(20683)}`}
                ></p>
              </a>
            </div>

            <div className="status-light-anillo-opit-container">
              <a style={{ color: "black" }} href={`${PRTG_URL}19529&tabid=1`} target="_blank">
                <p // 10.224.92.29
                  title={statusTitle(19530)}
                  className={`status-light-anillo id19530 ${statusLight(19530)}`}
                ></p>
              </a>
            </div>

            <div className="status-light-anillo-opit-container">
              <a style={{ color: "black" }} href={`${PRTG_URL}19521&tabid=1`} target="_blank">
                <p // 10.224.92.25
                  title={statusTitle(19522)}
                  className={`status-light-anillo id19522 ${statusLight(19522)}`}
                ></p>
              </a>
            </div>

            <div className="status-light-anillo-opit-container">
              <a style={{ color: "black" }} href={`${PRTG_URL}19527&tabid=1`} target="_blank">
                <p // 10.224.92.28
                  title={statusTitle(19528)}
                  className={`status-light-anillo id19528 ${statusLight(19528)}`}
                ></p>
              </a>
            </div>

            <div className="status-light-anillo-opit-container">
              <a style={{ color: "black" }} href={`${PRTG_URL}20701&tabid=1`} target="_blank">
                <p // 10.224.92.21
                  title={statusTitle(20702)}
                  className={`status-light-anillo id20702 ${statusLight(20702)}`}
                ></p>
              </a>
            </div>

            <div className="status-light-anillo-opit-container">
              <a style={{ color: "black" }} href={`${PRTG_URL}20687&tabid=1`} target="_blank">
                <p // 10.224.92.5
                  title={statusTitle(20688)}
                  className={`status-light-anillo id20688 ${statusLight(20688)}`}
                ></p>
              </a>
            </div>

            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.86
                title={statusTitle(15596)}
                className={`status-light-anillo id15596 ${statusLight(15596)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}7918&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.86
                title={statusTitle(20594)}
                className={`status-light-anillo id20594 ${statusLight(20594)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}7918&tabid=1`} target="_blank">
                  Fa1/4
                </a>
              </p>
            </div>

            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.83
                title={statusTitle(15609)}
                className={`status-light-anillo id15609 ${statusLight(15609)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}12829&tabid=1`} target="_blank">
                  Gi0/12
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.83
                title={statusTitle(17572)}
                className={`status-light-anillo id17572 ${statusLight(17572)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}12829&tabid=1`} target="_blank">
                  Gi0/11
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.83
                title={statusTitle(15608)}
                className={`status-light-anillo id15608 ${statusLight(15608)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}12829&tabid=1`} target="_blank">
                  Gi0/5
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.103
                title={statusTitle(15685)}
                className={`status-light-anillo id15685 ${statusLight(15685)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15680&tabid=1`} target="_blank">
                  Gi1/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.103
                title={statusTitle(15684)}
                className={`status-light-anillo id15684 ${statusLight(15684)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15680&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.82
                title={statusTitle(15607)}
                className={`status-light-anillo id15607 ${statusLight(15607)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}10966&tabid=1`} target="_blank">
                  Gi1/0/28
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.82
                title={statusTitle(15606)}
                className={`status-light-anillo id15606 ${statusLight(15606)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}10966&tabid=1`} target="_blank">
                  Gi1/0/27
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.82
                title={statusTitle(15605)}
                className={`status-light-anillo id15605 ${statusLight(15605)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}10966&tabid=1`} target="_blank">
                  Gi1/0/26
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.82
                title={statusTitle(15604)}
                className={`status-light-anillo id15604 ${statusLight(15604)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}10966&tabid=1`} target="_blank">
                  Gi1/0/25
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.72
                title={statusTitle(15583)}
                className={`status-light-anillo id15583 ${statusLight(15583)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5444&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.72
                title={statusTitle(18452)}
                className={`status-light-anillo id18452 ${statusLight(18452)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5444&tabid=1`} target="_blank">
                  Gi1/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.106
                title={statusTitle(17408)}
                className={`status-light-anillo id17408 ${statusLight(17408)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}17404&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.106
                title={statusTitle(20016)}
                className={`status-light-anillo id20016 ${statusLight(20016)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}17404&tabid=1`} target="_blank">
                  fa1/9
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.106
                title={statusTitle(20646)}
                className={`status-light-anillo id20646 ${statusLight(20646)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}17404&tabid=1`} target="_blank">
                  Gi1/4
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.113
                title={statusTitle(20800)}
                className={`status-light-anillo id20800 ${statusLight(20800)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}19372&tabid=1`} target="_blank">
                  Gi1/9
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.87
                title={statusTitle(15611)}
                className={`status-light-anillo id15611 ${statusLight(15611)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13065&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.71
                title={statusTitle(15603)}
                className={`status-light-anillo id15603 ${statusLight(15603)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}12496&tabid=1`} target="_blank">
                  Gi0/16
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.71
                title={statusTitle(15602)}
                className={`status-light-anillo id15602 ${statusLight(15602)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}12496&tabid=1`} target="_blank">
                  Gi0/15
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.91
                title={statusTitle(15612)}
                className={`status-light-anillo id15612 ${statusLight(15612)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13359&tabid=1`} target="_blank">
                  Gi1/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.91
                title={statusTitle(15670)}
                className={`status-light-anillo id15670 ${statusLight(15670)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13359&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.91
                title={statusTitle(15613)}
                className={`status-light-anillo id15613 ${statusLight(15613)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13359&tabid=1`} target="_blank">
                  Gi1/3
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.92
                title={statusTitle(15628)}
                className={`status-light-anillo id15628 ${statusLight(15628)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13454&tabid=1`} target="_blank">
                  Gi1/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.73
                title={statusTitle(15668)}
                className={`status-light-anillo id15668 ${statusLight(15668)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5446&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.73
                title={statusTitle(15669)}
                className={`status-light-anillo id15669 ${statusLight(15669)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5446&tabid=1`} target="_blank">
                  Gi1/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.73
                title={statusTitle(20591)}
                className={`status-light-anillo id20591 ${statusLight(20591)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5446&tabid=1`} target="_blank">
                  Gi1/4
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.76
                title={statusTitle(15614)}
                className={`status-light-anillo id15614 ${statusLight(15614)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13451&tabid=1`} target="_blank">
                  Gi1/5
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.76
                title={statusTitle(15615)}
                className={`status-light-anillo id15615 ${statusLight(15615)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13451&tabid=1`} target="_blank">
                  Gi1/8
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.76
                title={statusTitle(17753)}
                className={`status-light-anillo id17753 ${statusLight(17753)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13451&tabid=1`} target="_blank">
                  Gi1/7
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.76
                title={statusTitle(20584)}
                className={`status-light-anillo id20584 ${statusLight(20584)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13451&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            {/* <div className="status-light-anillo-opit-container">
              <p // 10.224.114.84
                title={statusTitle(15610)}
                className={`status-light-anillo id15610 ${statusLight(15610)}`}
              >
                <a
                  style={{ color: "black" }}
                  href={`${PRTG_URL}12834&tabid=1`}
                  target="_blank"
                >
                  Gi1/1
                </a>
              </p>
            </div> */}
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.95
                title={statusTitle(15631)}
                className={`status-light-anillo id15631 ${statusLight(15631)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13457&tabid=1`} target="_blank">
                  Fa0/11
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.95
                title={statusTitle(15633)}
                className={`status-light-anillo id15633 ${statusLight(15633)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13457&tabid=1`} target="_blank">
                  Gi0/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.95
                title={statusTitle(15634)}
                className={`status-light-anillo id15634 ${statusLight(15634)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13457&tabid=1`} target="_blank">
                  Gi0/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.95
                title={statusTitle(15632)}
                className={`status-light-anillo id15632 ${statusLight(15632)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13457&tabid=1`} target="_blank">
                  Fa0/12
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.93
                title={statusTitle(15629)}
                className={`status-light-anillo id15629 ${statusLight(15629)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13455&tabid=1`} target="_blank">
                  Gi1/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.94
                title={statusTitle(15630)}
                className={`status-light-anillo id15630 ${statusLight(15630)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}13456&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.101
                title={statusTitle(15636)}
                className={`status-light-anillo id15636 ${statusLight(15636)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}14670&tabid=1`} target="_blank">
                  Fa0/12
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.77
                title={statusTitle(15585)}
                className={`status-light-anillo id15585 ${statusLight(15585)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5492&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.77
                title={statusTitle(15586)}
                className={`status-light-anillo id15586 ${statusLight(15586)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5492&tabid=1`} target="_blank">
                  Gi1/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.78
                title={statusTitle(15597)}
                className={`status-light-anillo id15598 ${statusLight(15597)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}12482&tabid=1`} target="_blank">
                  Gi1/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.78
                title={statusTitle(15598)}
                className={`status-light-anillo id15597 ${statusLight(15598)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}12482&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.78
                title={statusTitle(15599)}
                className={`status-light-anillo id15599 ${statusLight(15599)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}12482&tabid=1`} target="_blank">
                  Gi1/3
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.78
                title={statusTitle(20596)}
                className={`status-light-anillo id20596 ${statusLight(20596)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}12482&tabid=1`} target="_blank">
                  Gi1/5
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.102
                title={statusTitle(15638)}
                className={`status-light-anillo id15638 ${statusLight(15638)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15290&tabid=1`} target="_blank">
                  Gi0/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.102
                title={statusTitle(15637)}
                className={`status-light-anillo id15637 ${statusLight(15637)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15290&tabid=1`} target="_blank">
                  Fa0/5
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.105
                title={statusTitle(15639)}
                className={`status-light-anillo id15639 ${statusLight(15639)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15292&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.79
                title={statusTitle(15587)}
                className={`status-light-anillo id15587 ${statusLight(15587)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5496&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.79
                title={statusTitle(15588)}
                className={`status-light-anillo id15588 ${statusLight(15588)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5496&tabid=1`} target="_blank">
                  Gi1/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.80
                title={statusTitle(15593)}
                className={`status-light-anillo id15593 ${statusLight(15593)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5582&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.80
                title={statusTitle(15595)}
                className={`status-light-anillo id15595 ${statusLight(15595)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5582&tabid=1`} target="_blank">
                  Gi1/3
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.80
                title={statusTitle(15594)}
                className={`status-light-anillo id15594 ${statusLight(15594)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5582&tabid=1`} target="_blank">
                  Gi1/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.80
                title={statusTitle(18599)}
                className={`status-light-anillo id18599 ${statusLight(18599)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5582&tabid=1`} target="_blank">
                  Gi1/8
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.80
                title={statusTitle(20593)}
                className={`status-light-anillo id20593 ${statusLight(20593)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5582&tabid=1`} target="_blank">
                  Gi1/4
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.89
                title={statusTitle(15648)}
                className={`status-light-anillo id15648 ${statusLight(15648)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15644&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.81
                title={statusTitle(15589)}
                className={`status-light-anillo id15589 ${statusLight(15589)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5513&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.81
                title={statusTitle(20590)}
                className={`status-light-anillo id20590 ${statusLight(20590)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5513&tabid=1`} target="_blank">
                  Gi1/4
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.81
                title={statusTitle(15590)}
                className={`status-light-anillo id15590 ${statusLight(15590)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5513&tabid=1`} target="_blank">
                  Gi1/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.81
                title={statusTitle(20592)}
                className={`status-light-anillo id20592 ${statusLight(20592)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5513&tabid=1`} target="_blank">
                  Gi1/4
                </a>
              </p>
            </div>
            {/* <div className="status-light-anillo-opit-container">
              <p // 10.224.114.111
                title={statusTitle(18598)}
                className={`status-light-anillo id18598 ${statusLight(18598)}`}
              >
                <a
                  style={{ color: "black" }}
                  href={`${PRTG_URL}18594&tabid=1`}
                  target="_blank"
                >
                  Gi1/1
                </a>
              </p>
            </div> */}
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.85
                title={statusTitle(16562)}
                className={`status-light-anillo id16562 ${statusLight(16562)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5568&tabid=1`} target="_blank">
                  Gi1/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.85
                title={statusTitle(16561)}
                className={`status-light-anillo id16561 ${statusLight(16561)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}5568&tabid=1`} target="_blank">
                  Gi1/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.70
                title={statusTitle(15600)}
                className={`status-light-anillo id15600 ${statusLight(15600)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}12490&tabid=1`} target="_blank">
                  Gi0/11
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.70
                title={statusTitle(15601)}
                className={`status-light-anillo id15601 ${statusLight(15601)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}12490&tabid=1`} target="_blank">
                  Gi0/12
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.114.70
                title={statusTitle(20703)}
                className={`status-light-anillo id20703 ${statusLight(20703)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}12490&tabid=1`} target="_blank">
                  Gi0/10
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.125.220
                title={statusTitle(17757)}
                className={`status-light-anillo id17757 ${statusLight(17757)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15692&tabid=1`} target="_blank">
                  Gi1/0/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.125.220
                title={statusTitle(17758)}
                className={`status-light-anillo id17758 ${statusLight(17758)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15692&tabid=1`} target="_blank">
                  Gi2/0/8
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.125.220
                title={statusTitle(20630)}
                className={`status-light-anillo id20630 ${statusLight(20630)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15692&tabid=1`} target="_blank">
                  Gi2/0/7
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.125.219
                title={statusTitle(17759)}
                className={`status-light-anillo id17759 ${statusLight(17759)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15690&tabid=1`} target="_blank">
                  Gi1/0/1
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.125.219
                title={statusTitle(17760)}
                className={`status-light-anillo id17760 ${statusLight(17760)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15690&tabid=1`} target="_blank">
                  Gi1/0/6
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.125.219
                title={statusTitle(17761)}
                className={`status-light-anillo id17761 ${statusLight(17761)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15690&tabid=1`} target="_blank">
                  Gi1/0/2
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.125.219
                title={statusTitle(20689)}
                className={`status-light-anillo id20689 ${statusLight(20689)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15690&tabid=1`} target="_blank">
                  Gi1/0/12
                </a>
              </p>
            </div>
            <div className="status-light-anillo-opit-container">
              <p // 10.224.125.219
                title={statusTitle(17762)}
                className={`status-light-anillo id17762 ${statusLight(17762)}`}
              >
                <a style={{ color: "black" }} href={`${PRTG_URL}15690&tabid=1`} target="_blank">
                  Gi1/0/7
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
