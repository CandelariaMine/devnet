import { Navbar } from "../../Navbar/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDataInfGen } from "../../../hooks/useDataInfGen";
import { Spinner } from "../../Spinner/Spinner";
import { DatetimeModules } from "../../DatetimeModules/DatetimeModules";
import { InfGenDatetime } from "../../DatetimeModules/InfGenDatetime";
import { getKpiInfGenByCategory, getKpiCertificados, getDataDockers, getLicenciamientos } from "../../../utils/Api-candelaria/api"
import "./Categories.css";

export function Categories() {
  const [coresUp, setCoresUp] = useState([]);
  const [coresDown, setCoresDown] = useState([]);
  const [distUp, setDistUp] = useState([]);
  const [distDown, setDistDown] = useState([]);
  const [fortigateAdminUp, setFortigateAdminUp] = useState([]);
  const [fortigateAdminDown, setFortigateAdminDown] = useState([]);
  const [fortigateConceUp, setFortigateConceUp] = useState([]);
  const [fortigateConceDown, setFortigateConceDown] = useState([]);
  const [sslUp, setSslUp] = useState([]);
  const [voiceUp, setVoiceUp] = useState([]);
  const [wirelessUp, setWirelessUp] = useState([]);
  const [iseUp, setIseUp] = useState([]);
  const [sslDown, setSslDown] = useState([]);
  const [voiceDown, setVoiceDown] = useState([]);
  const [wirelessDown, setWirelessDown] = useState([]);
  const [iseDown, setIseDown] = useState([]);
  const [lteUp, setLteUp] = useState([]);
  const [lteDown, setLteDown] = useState([]);
  const [cctvUp, setCctvUp] = useState([]);
  const [dockersUp, setDockersUp] = useState([]);
  const [fwItUp, setFwItUp] = useState([]);
  const [fwItDown, setFwItDown] = useState([]);
  const [fwOtUp, setFwOtUp] = useState([]);
  const [fwOtDown, setFwOtDown] = useState([]);
  const [cctvDown, setCctvDown] = useState([]);
  const [dockersDown, setDockersDownp] = useState([]);
  const [seguridadUp, setSeguridadUp] = useState([]);
  const [seguridadDown, setSeguridadDown] = useState([]);
  const [licenciamientosUpState, setLicenciamientosUpState ] = useState([]);
  const [licenciamientosDownState, seLlicenciamientosDownState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [kpiCategories, setKpiCategories] = useState(null);
  const [kpiCertificados, setKpiCertificados] = useState(null);
  const [kpiProcesosDevNet, setKpiProcesosDevNet] = useState(null);
  const [kpiLicenciamientos, setKpiLicenciamientos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataStatusInfGen = await useDataInfGen();
        const dataCertificados = await getKpiCertificados();
        const dataDockers = await getDataDockers();
        const dataKpiLicencamientos = await getLicenciamientos();
        const newCoresUp = [];
        const newDistUp = [];
        const newFortigateAdminUp = [];
        const newFortigateConcenUp = [];
        const dataSslUp = [];
        const dataVoiceUp = [];
        const dataWirelessUp = [];
        const dataIseUp = [];
        const dataLteUp = [];
        const dataCctvUp = [];
        const dataFwItUp = [];
        const dataFwOtUp = [];
        const dataDockersUp = [];
        const dataSeguridadUp = [];
        const licenciamientosUp = [];

        const newCoresDown = [];
        const newDistDown = [];
        const newFortigateAdminDown = [];
        const newFortigateConcenDown = [];
        const dataSslDown = [];
        const dataVoiceDown = [];
        const dataWirelessDown = [];
        const dataIseDown = [];
        const dataLteDown = [];
        const dataCctvDown = [];
        const dataFwItDown = [];
        const dataFwOtDown = [];
        const dataDockersDown = [];
        const dataSeguridadDown = [];
        const licenciamientosDown = [];

        dataStatusInfGen.upElements.forEach((e) => {
          if (e.name_switch && e.name_switch.includes("CORE")) {
            newCoresUp.push(e);
          }
          if (
            (e.name_switch && e.name_switch.toLowerCase().includes("distri")) ||
            (e.rol && e.rol.toLowerCase().includes("distri"))
          ) {
            newDistUp.push(e);
          }
          if (e.name_switch === "FORTIGATE - ADMINISTRACIÓN") {
            newFortigateAdminUp.push(e);
          }
          if (e.name_switch === "FORTIGATE - CONCENTRADORA") {
            newFortigateConcenUp.push(e);
          }
          if (e.rol && e.rol.toLowerCase().includes("certificado")) {
            dataSslUp.push(e);
          }
          if (e.rol && e.rol.toLowerCase().includes("telefonia")) {
            dataVoiceUp.push(e);
          }
          if (e.rol && e.rol.toLowerCase().includes("ise")) {
            dataIseUp.push(e);
          }
          if (e.rol && e.rol.toLowerCase().includes("inalambricas")) {
            dataWirelessUp.push(e);
          }
          if (
            (e.rol && e.rol.toLowerCase().includes("lte")) ||
            (e.rol && e.rol.toLowerCase().includes("vmware"))
          ) {
            dataLteUp.push(e);
          }
          if (e.rol && e.rol.toLowerCase() === "cctv") {
            dataCctvUp.push(e);
          }
          if (e.rol && e.rol.toLowerCase() === "fw it") {
            dataFwItUp.push(e);
          }
          if (e.rol && e.rol.toLowerCase() === "fw ot") {
            dataFwOtUp.push(e);
          }
          if (e.type && e.type === "docker") {
            dataDockersUp.push(e);
          }
          if (e.name_switch && e.name_switch.toLowerCase().includes("fac")) {
            dataSeguridadUp.push(e);
          }
          if (e.equipo && e.status === "Up" || e.status === "Warning") {
            licenciamientosUp.push(e);
          }
        });

        dataStatusInfGen.downElements.forEach((e) => {
          if (e.name_switch && e.name_switch.includes("CORE")) {
            newCoresDown.push(e);
          }
          if (
            (e.name_switch && e.name_switch.toLowerCase().includes("distri")) ||
            (e.rol && e.rol.toLowerCase().includes("distri"))
          ) {
            newDistDown.push(e);
          }
          if (e.name_switch === "FORTIGATE - ADMINISTRACIÓN") {
            newFortigateAdminDown.push(e);
          }
          if (e.name_switch === "FORTIGATE - CONCENTRADORA") {
            newFortigateConcenDown.push(e);
          }
          if (e.rol && e.rol.toLowerCase().includes("certificado")) {
            dataSslDown.push(e);
          }
          if (e.rol && e.rol.toLowerCase().includes("telefonia")) {
            dataVoiceDown.push(e);
          }
          if (e.rol && e.rol.toLowerCase().includes("ise")) {
            dataIseDown.push(e);
          }
          if (e.rol && e.rol.toLowerCase().includes("inalambricas")) {
            dataWirelessDown.push(e);
          }
          if (
            (e.rol && e.rol.toLowerCase().includes("lte")) ||
            (e.rol && e.rol.toLowerCase().includes("vmware"))
          ) {
            dataLteDown.push(e);
          }
          if (e.rol && e.rol.toLowerCase() === "cctv") {
            dataCctvDown.push(e);
          }
          if (e.rol && e.rol.toLowerCase() === "fw it") {
            dataFwItDown.push(e);
          }
          if (e.rol && e.rol.toLowerCase() === "fw ot") {
            dataFwOtDown.push(e);
          }
          if (e.type && e.type === "docker") {
            dataDockersDown.push(e);
          }
          if (e.name_switch && e.name_switch.toLowerCase().includes("fac")) {
            dataSeguridadDown.push(e);
          }
          if (e.equipo && e.status === "Down") {
            licenciamientosDown.push(e);
          }
        });
        setCoresUp(newCoresUp);
        setDistUp(newDistUp);
        setCoresDown(newCoresDown);
        setDistDown(newDistDown);
        setFortigateAdminUp(newFortigateAdminUp);
        setFortigateAdminDown(newFortigateAdminDown);
        setFortigateConceUp(newFortigateConcenUp);
        setFortigateConceDown(newFortigateConcenDown);
        setSslUp(dataSslUp);
        setVoiceUp(dataVoiceUp);
        setWirelessUp(dataWirelessUp);
        setIseUp(dataIseUp);
        setSslDown(dataSslDown);
        setVoiceDown(dataVoiceDown);
        setWirelessDown(dataWirelessDown);
        setIseDown(dataIseDown);
        setIsLoading(false);
        setLteUp(dataLteUp);
        setLteDown(dataLteDown);
        setCctvUp(dataCctvUp);
        setCctvDown(dataCctvDown);
        setFwItUp(dataFwItUp);
        setFwItDown(dataFwItDown);
        setFwOtUp(dataFwOtUp);
        setFwOtDown(dataFwOtDown);
        setDockersUp(dataDockersUp);
        setDockersDownp(dataDockersDown);
        setSeguridadUp(dataSeguridadUp);
        setSeguridadDown(dataSeguridadDown);
        setLicenciamientosUpState(licenciamientosUp);
        seLlicenciamientosDownState(licenciamientosDown);
        setKpiCertificados(dataCertificados.data.data.kpi);
        setKpiProcesosDevNet(dataDockers.kpi)
        setKpiLicenciamientos(dataKpiLicencamientos.data.kpi)
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchKpi = async () => {
      try {
        const kpiData = await getKpiInfGenByCategory();
        setKpiCategories(kpiData.data.data);
      } catch (error) {
        console.error(error)
      }
    };
    fetchKpi();
  }, [])
  
  
  return (
    <div>
      <Navbar title={"Categorias Inf. Gen."} />
      <InfGenDatetime />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="table-ig-categories-container">
          <table>
            <thead>
              <tr>
                <th style={{ backgroundColor: "#444444", color: "white" }}>
                  Categoria
                </th>
                <th style={{ backgroundColor: "#444444", color: "white" }}>
                  KPI
                </th>
                <th className="kpi-green">Up</th>
                <th className="kpi-red">Down</th>
                <th style={{ backgroundColor: "#444444", color: "white" }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general?categoria=core">
                    CORE
                  </Link>
                </td>
                <td className={`${kpiCategories.core < 100 ? "kpi-red" : "kpi-green"}`}>{kpiCategories.core}%</td>
                <td>{coresUp.length}</td>
                <td>{coresDown.length}</td>
                <td>{coresUp.length + coresDown.length}</td>
              </tr>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general?categoria=dist">
                    DIST
                  </Link>
                </td>
                <td className={`${kpiCategories.dist < 100 ? "kpi-red" : "kpi-green"}`}>{kpiCategories.dist}%</td>
                <td>{distUp.length}</td>
                <td>{distDown.length}</td>
                <td>{distUp.length + distDown.length}</td>
              </tr>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general?categoria=fortigate">
                    VPN SITE TO SITE
                  </Link>
                </td>
                <td className={`${kpiCategories.vpnSite < 100 ? "kpi-red" : "kpi-green"}`}>{kpiCategories.vpnSite}%</td>
                <td>{fortigateAdminUp.length + fortigateConceUp.length}</td>
                <td>{fortigateAdminDown.length + fortigateConceDown.length}</td>
                <td>
                  {fortigateAdminUp.length +
                    fortigateAdminDown.length +
                    fortigateConceUp.length +
                    fortigateConceDown.length}
                </td>
              </tr>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general/certificados">
                    Certificados Candelaria
                  </Link>
                </td>
                <td className={`${kpiCertificados < 100 ? "kpi-red" : "kpi-green"}`}>{kpiCertificados}%</td>
                <td>{sslUp.length}</td>
                <td>{sslDown.length}</td>
                <td>{sslUp.length + sslDown.length}</td>
              </tr>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general?categoria=telefonia">
                    Telefonia IP
                  </Link>
                </td>
                <td  className={`${kpiCategories.telefonia < 100 ? "kpi-red" : "kpi-green"}`}>{kpiCategories.telefonia}%</td>
                <td>{voiceUp.length}</td>
                <td>{voiceDown.length}</td>
                <td>{voiceUp.length + voiceDown.length}</td>
              </tr>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general?categoria=ise">
                    Servidores ISE y PRIME
                  </Link>
                </td>
                <td  className={`${kpiCategories.servidoresIsePrime < 100 ? "kpi-red" : "kpi-green"}`}>{kpiCategories.servidoresIsePrime}%</td>
                <td>{iseUp.length}</td>
                <td>{iseDown.length}</td>
                <td>{iseUp.length + iseDown.length}</td>
              </tr>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general?categoria=inalambricas">
                    Controladoras Inalambricas
                  </Link>
                </td>
                <td  className={`${kpiCategories.controladoras < 100 ? "kpi-red" : "kpi-green"}`}>{kpiCategories.controladoras}%</td>
                <td>{wirelessUp.length}</td>
                <td>{wirelessDown.length}</td>
                <td>{wirelessUp.length + wirelessDown.length}</td>
              </tr>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general?categoria=lte">
                    LTE
                  </Link>
                </td>
                <td  className={`${kpiCategories.lte < 100 ? "kpi-red" : "kpi-green"}`}>{kpiCategories.lte}%</td>
                <td>{lteUp.length}</td>
                <td>{lteDown.length}</td>
                <td>{lteUp.length + lteDown.length}</td>
              </tr>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general?categoria=cctv">
                    Sistema CCTV
                  </Link>
                </td>
                <td  className={`${kpiCategories.cctv < 100 ? "kpi-red" : "kpi-green"}`}>{kpiCategories.cctv}%</td>
                <td>{cctvUp.length}</td>
                <td>{cctvDown.length}</td>
                <td>{cctvUp.length + cctvDown.length}</td>
              </tr>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general?categoria=fw%20it">
                    Firewalls IT
                  </Link>
                </td>
                <td  className={`${kpiCategories.fwit < 100 ? "kpi-red" : "kpi-green"}`}>{kpiCategories.fwit}%</td>
                <td>{fwItUp.length}</td>
                <td>{fwItDown.length}</td>
                <td>{fwItUp.length + fwItDown.length}</td>
              </tr>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general?categoria=fw%20ot">
                    Firewalls OT
                  </Link>
                </td>
                <td  className={`${kpiCategories.fwot < 100 ? "kpi-red" : "kpi-green"}`}>{kpiCategories.fwot}%</td>
                <td>{fwOtUp.length}</td>
                <td>{fwOtDown.length}</td>
                <td>{fwOtUp.length + fwOtDown.length}</td>
              </tr>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general/procesos-devnet">
                    Procesos DevNet
                  </Link>
                </td>
                <td className={`${kpiProcesosDevNet < 100 ? "kpi-red" : "kpi-green"}`}>{kpiProcesosDevNet}%</td>
                <td>{dockersUp.length}</td>
                <td>{dockersDown.length}</td>
                <td>{dockersUp.length + dockersDown.length}</td>
              </tr>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general?categoria=seguridad">
                    Seguridad
                  </Link>
                </td>
                <td  className={`${kpiCategories.seguridad < 100 ? "kpi-red" : "kpi-green"}`}>{kpiCategories.seguridad}%</td>
                <td>{seguridadUp.length}</td>
                <td>{seguridadDown.length}</td>
                <td>{seguridadUp.length + seguridadDown.length}</td>
              </tr>
              <tr>
                <td className="td-category-ig">
                  <Link to="/monitoreo/infraestrucura-general/licenciamientos">
                    Licenciamientos
                  </Link>
                </td>
                <td className={`${kpiLicenciamientos < 100 ? "kpi-red" : "kpi-green"}`}>{kpiLicenciamientos}%</td>
                <td>{licenciamientosUpState.length}</td>
                <td>{licenciamientosDownState.length}</td>
                <td>{licenciamientosUpState.length + licenciamientosDownState.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
