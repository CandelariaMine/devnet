import {
  getDcsCandelariaIndicators,
  getUps,
  getMeshIndicators,
  getDataBaseFim,
  getDataMeshProcess,
  getVpn,
  getAnilloUgUpDown,
  getDataAnilloTetraUpDown,
  getDataFlotacionOtUpDown,
  getMraUpDown,
  getPrtgStatus,
  getUpsKpi,
} from "../../utils/Api-candelaria/api";
import { Navbar } from "../../components/Navbar/Navbar";
import { DevicesDash } from "../../components/Devices/DevicesDash/DevicesDash";
import { DashMesh } from "../Mesh/DashMesh/DashMesh";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashFirewalls } from "../Firewalls/DashFirewalls/DashFirewalls";
import { WanDashboard } from "../Wan/WanDashboard/WanDashboard";
import { useWanDates } from "../../hooks/useWanDates";
import { useVpnCounter } from "../../hooks/useVpnCounter";
import { InfraGeneralDash } from "../InfraGeneral/InfraGeneralDash/InfraGeneralDash";
import PuffLoader from "react-spinners/PuffLoader";
import { getDataAnillo } from "../../utils/Api-candelaria/api";
import { useDcsIndicators } from "../../hooks/useDcsIndicators";
import { useCountDcsClients } from "../../hooks/useCountDcsClients";
import { HomeDragos } from "../Dragos/Home";
import "./home.css";
import { Modal } from "../Modal/Modal";

export function Home() {
  const [dcsCandeIndicators, setDcsCandeIndicators] = useState();
  const [wanDates, setWanDates] = useState("");
  const [enLineaCount, setEnLineaCount] = useState(0);
  const [usandoBateriaCount, setUsandoBateriaCount] = useState(0);
  const [otroCount, setOtroCount] = useState(0);
  const [changeBatery, setChangeBatery] = useState(0);
  const [numberUps, setNumberUps] = useState(0);
  const { dataVpn1Users, dataVpn2Users, dataVpn3Users } = useVpnCounter();
  const [vpnCandelaria, setVpnCandelaria] = useState({});
  const [homeMessage, setHomeMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [meshUpElem, setMeshUpElem] = useState(0);
  const [meshDownElem, setMeshDownElem] = useState(0);
  const [fimDownElem, setFimhDownElem] = useState(0);
  const [openPitLoading, setOpenPitLoading] = useState(true);
  const [dataMeshProcessUp, setDataMeshProcessUp] = useState([]);
  const [dataMeshProcessDown, setDataMeshProcessDown] = useState([]);
  const [upDownAnilloUg, setUpDownAnilloUg] = useState([]);
  const [upDownTetra, setUpDownTetra] = useState([]);
  const [dcsIndicators, setDcsIndicators] = useState({});
  const [flotacionData, setFlotacionData] = useState({});
  const [mra, setMra] = useState({});
  const [statusPrtg, setStatusPrtg] = useState(null);
  const [showPrtgModal, setShowPrtgModal] = useState(false);
  const [kpiUps, setKpiUps] = useState("Cargando kpi...");

  // Estados de spinners
  const [spinnerDcsCandelaria, setSpinnerDcsCandelaria] = useState(true);
  const [spinnerUps, setSpinnerUps] = useState(true);
  const [spinnerMesh, setSpinnerMesh] = useState(false);
  const [anilloUp, setAnilloUp] = useState([]);
  const [anilloDown, setAnilloDown] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const logoutParam = queryParams.get("logout");
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const getKpiUps = async () => {
      const response = await getUpsKpi();
      setKpiUps(response.data);
    }
    getKpiUps();
  }, [])
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataMra = await getMraUpDown();
        setMra(dataMra.data);
        const flotacionDataUpDown = await getDataFlotacionOtUpDown();
        setFlotacionData(flotacionDataUpDown.data);

        const dataDcsIndicators = await useDcsIndicators();

        const dcsCandelaria = await getDcsCandelariaIndicators();
        const dataAnillo = await getDataAnillo();
        const dataUpAnillo = dataAnillo.data.filter((e) => e.status === "Up");
        const dataDownAnillo = dataAnillo.data.filter((e) => e.status.includes("Down"));
        const dataUpDownTetra = await getDataAnilloTetraUpDown();

        const dataVpnCande = await getVpn();
        setVpnCandelaria(dataVpnCande.data);
        const dataAnilloUg = await getAnilloUgUpDown();
        setAnilloUp(dataUpAnillo);
        setAnilloDown(dataDownAnillo);
        setUpDownAnilloUg(dataAnilloUg.data);
        setDcsIndicators(dataDcsIndicators);

        // OPEN PIT
        const meshIndicators = await getMeshIndicators();
        let meshElementsDown = 0;
        meshElementsDown += meshIndicators.palasFailed;
        meshElementsDown += meshIndicators.caexFailed;
        let meshElementsUp = 0;
        meshElementsUp += meshIndicators.palasOk + meshIndicators.palasWarnings;
        meshElementsUp += meshIndicators.caexOk + meshIndicators.caexWarnings;
        const allDataMeshProcess = await getDataMeshProcess();
        const allDataMeshProcessUp = allDataMeshProcess.data.filter((e) => e.status === "ok");
        const allDataMeshProcessDown = allDataMeshProcess.data.filter((e) => e.status === "fail");
        setMeshUpElem(meshElementsUp);
        setMeshDownElem(meshElementsDown);
        setOpenPitLoading(false);
        setDataMeshProcessUp(allDataMeshProcessUp);
        setDataMeshProcessDown(allDataMeshProcessDown);
        setUpDownTetra(dataUpDownTetra.data);

        const fimStatus = await getDataBaseFim();
        const downFim = fimStatus.data.fimStatus.filter((e) => e.status_http.includes("Down"));
        setFimhDownElem(downFim.length);
        const dates = useWanDates();
        const allUps = await getUps();

        let enLinea = 0;
        let usandoBateria = 0;
        let otro = 0;
        let countUps = 0;
        let changeBateryCounter = 0;

        if (allUps) {
          allUps.data.forEach(({ status_ups, batery }) => {
            switch (status_ups) {
              case 2:
                enLinea++;
                break;
              case 3:
                usandoBateria++;
                break;
              default:
                otro++;
            }

            if (batery === 2) {
              changeBateryCounter++;
            }

            countUps++;
          });
        }

        setDcsCandeIndicators(dcsCandelaria);
        setSpinnerDcsCandelaria(false);
        setSpinnerUps(false);
        setSpinnerMesh(false);
        setWanDates(dates);
        setNumberUps(countUps);
        setEnLineaCount(enLinea);
        setUsandoBateriaCount(usandoBateria);
        setOtroCount(otro);
        setChangeBatery(changeBateryCounter);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (logoutParam && !token) {
      setHomeMessage("Has cerrado sesión.");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }, [logoutParam]);

  useEffect(() => {
    const fetchPrtgStatus = async () => {
      try {
        const res = await getPrtgStatus();
        setStatusPrtg(res.prtg_status);

        if (!res.prtg_status) {
          setShowPrtgModal(true); // abrir modal si PRTG está caído
        }
      } catch (error) {
        console.error("Error al obtener el estado de PRTG", error);
        setShowPrtgModal(true); // abrir modal si hay error de conexión
      }
    };

    fetchPrtgStatus();
  }, []);

  const overAll = dcsCandeIndicators?.overallKpi?.indicador;
  const disponibilidad = dcsCandeIndicators?.disponibilidad?.indicador;
  const infra_solucion = dcsCandeIndicators?.infraSolucion?.indicador;

  return (
    <>
      <Navbar title={"DEVNET"} />
      <Modal
        isOpen={showPrtgModal}
        onClose={() => setShowPrtgModal(false)}
        title="Error de Conexión"
        content={
          <p style={{ padding: "10px", textAlign: "center" }}>
            El sistema de monitoreo <strong>PRTG</strong> no está funcionando en este momento. Esto puede ocasionar
            inconsistencias en la información presentada por Devnet.
          </p>
        }
        errorMess="Por favor contactar al área de infraestructura."
        buttons={[
          {
            label: "Cerrar",
            type: "primary",
            onClick: () => setShowPrtgModal(false),
          },
        ]}
      />
      <div>
        {showMessage && (
          <div className="home-message-container">
            <p>{homeMessage}</p>
          </div>
        )}
      </div>
      <div className="home-container">
        <section className="system-container">
          <div className="name-system-container">
            <h1>Control Proceso</h1>
          </div>
          <div className="name-system-container">
            <h2>DCS</h2>
          </div>
          {spinnerDcsCandelaria ? (
            <div className="spinner-home-container">
              <div className="spinner-container">
                <PuffLoader color="red" />
              </div>
            </div>
          ) : (
            <div className="home-kpi-dcs">
              <table className="table-home-kpi-dcs">
                <thead>
                  <tr>
                    <th title="Ubicación" style={{ cursor: "help" }}>
                      Ubicación
                    </th>
                    <th title="Overall" style={{ cursor: "help" }}>
                      Overall
                    </th>
                    <th title="Disponibilidad" style={{ cursor: "help" }}>
                      Disp
                    </th>
                    <th title="Infraestructura Solución" style={{ cursor: "help" }}>
                      Inf Sol
                    </th>
                    <th>Detalles</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Candelaria</td>
                    <td
                      className={dcsIndicators.dataDcsCandelaria.overallKpi.indicador < 99.95 ? "kpi-red" : "kpi-green"}
                    >
                      {dcsIndicators.dataDcsCandelaria.overallKpi.indicador}%
                    </td>
                    <td
                      className={
                        dcsIndicators.dataDcsCandelaria.disponibilidad.indicador < 99.95 ? "kpi-red" : "kpi-green"
                      }
                    >
                      {dcsIndicators.dataDcsCandelaria.disponibilidad.indicador}%
                    </td>
                    <td
                      className={
                        dcsIndicators.dataDcsCandelaria.infraSolucion.indicador < 99.95 ? "kpi-red" : "kpi-green"
                      }
                    >
                      {dcsIndicators.dataDcsCandelaria.infraSolucion.indicador}%
                    </td>
                    <td>
                      <Link className="link-open-pit" to="/monitoreo/candelaria/clients">
                        Ver
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Desaladora</td>
                    <td
                      className={
                        dcsIndicators.dataDcsDesaladora.overallKpi.indicador.indicador < 99.95 ? "kpi-red" : "kpi-green"
                      }
                    >
                      {dcsIndicators.dataDcsDesaladora.overallKpi.indicador}%
                    </td>
                    <td
                      className={
                        dcsIndicators.dataDcsDesaladora.disponibilidad.indicador < 99.95 ? "kpi-red" : "kpi-green"
                      }
                    >
                      {dcsIndicators.dataDcsDesaladora.disponibilidad.indicador}%
                    </td>
                    <td>N/A</td>
                    {/* <td>{dcsIndicators.dataDcsCandelaria.infraSolucion.indicador}%</td> */}
                    <td>
                      <Link className="link-open-pit" to="/monitoreo/desaladora/clients">
                        Ver
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="flotacion-table-container">
                <div className="name-system-container">
                  <h2>Sistemas OT</h2>
                </div>
                <table className="table-home-kpi-dcs">
                  <thead>
                    <tr>
                      <th>Sistema</th>
                      <th className="kpi-green">Up</th>
                      <th className="kpi-red">Down</th>
                      <th>Detalles</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Red OT Flotacion</td>
                      <td>{flotacionData.upElements.length}</td>
                      <td>{flotacionData.downElements.length}</td>
                      <td>
                        <Link className="link-open-pit" to="/candelaria/monitoreo/flotacion/ot">
                          Ver
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>MRA</td>
                      <td>{mra.upElements.length}</td>
                      <td>{mra.downElements.length}</td>
                      <td>
                        <Link className="link-open-pit" to="/candelaria/monitoreo/mra">
                          Ver
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <section className="system-container">
          <div className="name-system-container">
            <h1>UPS</h1>
          </div>
          {spinnerUps ? (
            <div className="spinner-home-container">
              <div className="spinner-home-container">
                <PuffLoader color="red" />
              </div>
              <div className="link-system-container links-spinner-home">
                <Link to="/monitoreo/ups" className="link-system button-link" style={{ color: "white" }}>
                  Ver detalles
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="home-kpi-container ups-kpi-container">
                <p><span style={{fontWeight: "bold"}}>KPI:</span> {kpiUps}%</p>
                <table className="home-kpi-table ups-table">
                  <tbody>
                    <tr>
                      <td>
                        <p className="light-indicator green-light"></p>En línea
                      </td>
                      <td>{enLineaCount}</td>
                    </tr>
                    <tr>
                      <td>
                        <p className="light-indicator yellow-light"></p>Usando batería
                      </td>
                      <td>{usandoBateriaCount}</td>
                    </tr>
                    <tr>
                      <td>
                        <p className="light-indicator red-light"></p>Otro
                      </td>
                      <td>{otroCount}</td>
                    </tr>
                    <tr>
                      <td>
                        <p className="warning-light" style={{ bottom: "10px" }}>
                          🪫
                        </p>
                        Cambio batería
                      </td>
                      <td>{changeBatery}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="link-system-container">
                <Link to="/monitoreo/ups" className="link-system button-link" style={{ color: "white" }}>
                  Ver detalles
                </Link>
              </div>
            </>
          )}
        </section>

        <section className="system-container">
          <div className="name-system-container">
            <h1>VPN</h1>
          </div>

          <div className="home-kpi-container">
            <table className="home-kpi-table home-vpn-table">
              <tbody>
                <tr>
                  <td>Administrativo</td>
                  <td>{vpnCandelaria.numUsersFw1} users</td>
                </tr>
                <tr>
                  <td>Concentradora</td>
                  <td>{vpnCandelaria.numUsersFw2} users</td>
                </tr>
                <tr>
                  <td>Ojos</td>
                  <td>{vpnCandelaria.numUsersFw3} users</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="link-system-container">
            <Link to="/monitoreo/vpn" className="link-system button-link" style={{ color: "white" }}>
              Ver detalles
            </Link>
          </div>
        </section>

        <section className="system-container">
          {openPitLoading === true ? (
            <div className="loader-openpit-container">
              <PuffLoader color="red" />
            </div>
          ) : (
            <div className="system-container-openpit">
              <div className="name-system-container">
                <h1>Redes Open Pit</h1>
              </div>
              <div className="home-kpi-container">
                <table className="home-kpi-openpit">
                  <thead>
                    <tr>
                      <th>Sistema</th>
                      <th className="kpi-green">Up</th>
                      <th className="kpi-red">Down</th>
                      <th>Detalles</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mesh</td>
                      <td>{meshUpElem}</td>
                      <td>{meshDownElem}</td>
                      <td>
                        <Link className="link-open-pit" to="/monitoreo/candelaria/mesh">
                          Ver
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Radwin</td>
                      <td>{4 - fimDownElem}</td>
                      <td>{fimDownElem}</td>
                      <td>
                        <Link className="link-open-pit" to="/monitoreo/candelaria/fim">
                          Ver
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Anillo</td>
                      <td>{anilloUp.length}</td>
                      <td>{anilloDown.length}</td>
                      <td>
                        <Link className="link-open-pit" to="/monitoreo/candelaria/anillo">
                          Ver
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Clientes Open Pit</td>
                      <td>{dataMeshProcessUp.length}</td>
                      <td>{dataMeshProcessDown.length}</td>
                      <td>
                        <Link className="link-open-pit" to="/monitoreo/candelaria/proceso-mesh">
                          Ver
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Red Tetra</td>
                      <td>{upDownTetra.upElements.length}</td>
                      <td>{upDownTetra.downElements.length}</td>
                      <td>
                        <Link className="link-open-pit" to="/monitoreo/anillo/tetra">
                          Ver
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <section className="system-container">
          <div className="name-system-container">
            <h1>Dispositivos Candelaria</h1>
          </div>

          <div className="home-kpi-container">
            <DevicesDash />
          </div>
          <div className="link-system-container">
            <Link to="/monitoreo/devices" className="link-system button-link" style={{ color: "white" }}>
              Ver detalles
            </Link>
          </div>
        </section>

        <section className="system-container">
          <div className="name-system-container">
            <h1>Canales Internet</h1>
          </div>

          <div className="home-kpi-container">
            <DashFirewalls />
          </div>

          <div className="link-system-container">
            <Link to="/monitoreo/firewalls" className="link-system button-link" style={{ color: "white" }}>
              Ver detalles
            </Link>
          </div>
        </section>

        <section className="system-container">
          <div className="name-system-container">
            <h1>WAN</h1>
          </div>

          <div className="home-kpi-container">
            <WanDashboard previousMonthName={wanDates.previousMonthName} />
          </div>

          <div className="link-system-container">
            <Link to="/monitoreo/wan" className="link-system button-link" style={{ color: "white" }}>
              Ver detalles
            </Link>
          </div>
        </section>

        <section className="system-container">
          <div className="home-tables-container-infra-dragos">
            <div>
              <h1 style={{ textAlign: "center" }}>Infraestructura General</h1>
              <InfraGeneralDash />
            </div>
            <div>
              <h1 style={{ textAlign: "center" }}>Dragos</h1>
              <HomeDragos />
            </div>
          </div>
        </section>

        <section className="system-container">
          {openPitLoading === true ? (
            <div className="loader-openpit-container">
              <PuffLoader color="red" />
            </div>
          ) : (
            <div className="system-container-openpit">
              <div className="name-system-container">
                <h1>Redes Mina UG</h1>
              </div>
              <div className="home-kpi-container">
                <table className="home-kpi-openpit">
                  <thead>
                    <tr>
                      <th>Sistema</th>
                      <th className="kpi-green">Up</th>
                      <th className="kpi-red">Down</th>
                      <th>Detalles</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Anillo UG</td>
                      <td>{upDownAnilloUg.upElements.length}</td>
                      <td>{upDownAnilloUg.downElements.length}</td>
                      <td>
                        <Link target="_blank" className="link-open-pit" to="/monitoreo/anillo/ug">
                          Ver
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
