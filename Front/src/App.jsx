import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { SiCisco } from "react-icons/si";
import { BiSolidTachometer } from "react-icons/bi";

// Custom Hooks
import { useAutoRefresh } from "./hooks/useAutoRefresh";
import { useTabsName } from "./hooks/useTabsName";

// Components
import { Home } from "./components/Home/Home";
import { CandelariaClients } from "./components/CandelariaClients/CandelariaClients";
import { Switches } from "./components/CandelariaSwitches/CandelariaSwitches";
import { Ups } from "./components/Ups/Ups";
import { Vpn } from "./components/Vpn/Vpn";
import { Mesh } from "./components/Mesh/Mesh";
import { Devices } from "./components/Devices/Devices";
import { Firewalls } from "./components/Firewalls/Firewalls";
import { Wan } from "./components/Wan/Wan";
import { AdminUps } from "./components/AdminPanel/AdminViews/AdminUps";
import { AdminClients } from "./components/AdminPanel/AdminViews/AdminClients";
import { AdminDevices } from "./components/AdminPanel/AdminViews/AdminDevices";
import { AdminWan } from "./components/AdminPanel/AdminViews/AdminWan";
import { AdminSwitches } from "./components/AdminPanel/AdminViews/AdminSwitches";
import { AdminMesh } from "./components/AdminPanel/AdminViews/AdminMesh";
import { AdminFirewalls } from "./components/AdminPanel/AdminViews/AdminFirewalls";
import { AdminUsers } from "./components/AdminPanel/AdminViews/AdminUsers";
import { AdminAp } from "./components/AdminPanel/AdminViews/AdminAp";
import { AdminHome } from "./components/AdminPanel/AdminHome/AdminHome";
import { Actility } from "./components/AdminPanel/AdminForms/Actility/Actility";
import { Login } from "./components/Login/Logins";
import { Details } from "./components/InfraGeneral/Details/Details";
import { Map } from "./components/InfraGeneral/Map/Map";
import { DetailsCategory } from "./components/InfraGeneral/DetailsCategory/DetailsCategory";
import { Categories } from "./components/InfraGeneral/Categories/Categories";
// import { ApNegocio } from "./components/InfraGeneral/Ap/ApNegocio";
// import { ApMesh } from "./components/InfraGeneral/Ap/ApMesh";
import { DcsPac } from "./components/DcsPac/DcsPac";
import { DcsOjos } from "./components/DcsOjos/DcsOjos";
import { DcsDesaladora } from "./components/DcsDesaladora/DcsDesaladora";
import { BaseFim } from "./components/BaseFim/BaseFim";
import { Anillo } from "./components/Anillo/Anillo";
import { MeshProcess } from "./components/MeshProcess/MeshProcess";
import { Certificates } from "./components/InfraGeneral/Group_Prtg/Certificates";
// import { Voice } from "./components/InfraGeneral/Group_PrtgXX/Voice";
// import { Ise } from "./components/InfraGeneral/Group_PrtgXX/Ise";
// import { Wireless } from "./components/InfraGeneral/Group_PrtgXX/Wireless";
// import { Lte } from "./components/InfraGeneral/Group_PrtgXX/Lte";
// import { Cctv } from "./components/InfraGeneral/Group_PrtgXX/Cctv";
import { AnilloUg } from "./components/AnilloUg/AnilloUg";
import { Dockers } from "./components/InfraGeneral/Dockers/Dockers";
import { IconsPage } from "./components/IconsPage/IconsPage";
import "./app.css";
import { AnilloTetra } from "./components/AnilloTetra/AnilloTetra";
import { FlotacionOt } from "./components/AnilloFlotacionOt/FlotacionOt";
import { Mra } from "./components/Mra/Mra";
import { Dragos } from "./components/Dragos/Dragos";
import { Licenciamientos } from "./components/InfraGeneral/Licenciamientos/Licenciamientos";
import { Anillov2 } from "./components/Anillo/Anillov2";
import { InventarioCmbd } from "./components/Informes/InventarioCmbd";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { timerActive, toggleTimer } = useAutoRefresh();
  const pageTitle = useTabsName(location.pathname);

  const isAuthenticated = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    return jwtToken !== null;
  };

  useEffect(() => {
    if (location.pathname.includes("admin") && !isAuthenticated()) {
      navigate(`/login?error=401&from=${location.pathname}`);
    }
  }, [location.pathname, isAuthenticated]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div className="MainContainer">
      <Helmet>
        <title>{useTabsName(location.pathname)}</title>
      </Helmet>
      <Routes location={location}>
        <Route path="/monitoreo/home" element={<Home />} />
        <Route path="/monitoreo/candelaria/clients" element={<CandelariaClients />} />
        <Route path="/monitoreo/desaladora/clients" element={<DcsDesaladora />} />
        <Route path="/monitoreo/candelaria/switches" element={<Switches />} />
        <Route path="/monitoreo/ups" element={<Ups />} />
        <Route path="/monitoreo/candelaria/mesh" element={<Mesh />} />
        <Route path="/monitoreo/vpn" element={<Vpn />} />
        <Route path="/monitoreo/devices" element={<Devices />} />
        <Route path="/monitoreo/firewalls" element={<Firewalls />} />
        <Route path="/monitoreo/wan" element={<Wan />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/ups" element={<AdminUps />} />
        <Route path="/admin/clients" element={<AdminClients />} />
        <Route path="/admin/devices" element={<AdminDevices />} />
        <Route path="/admin/wan" element={<AdminWan />} />
        <Route path="/admin/switches" element={<AdminSwitches />} />
        <Route path="/admin/mesh" element={<AdminMesh />} />
        <Route path="/admin/firewalls" element={<AdminFirewalls />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/infrageneral/ap" element={<AdminAp />} />
        <Route path="/admin/actility" element={<Actility />} />
        <Route path="/admin/inventario/cmbd" element={<InventarioCmbd />} />
        <Route path="/login" element={<Login />} />
        <Route path="/monitoreo/pac/clientes" element={<DcsPac />} />
        <Route path="/monitoreo/ojos/clientes" element={<DcsOjos />} />
        <Route path="/monitoreo/infraestrucura-general" element={<DetailsCategory />} />
        <Route path="/monitoreo/infraestrucura-general/categorias" element={<Categories />} />
        {/* <Route
          path="/monitoreo/infraestrucura-general/detalles/ap/negocio"
          element={<ApNegocio />}
        />
        <Route
          path="/monitoreo/infraestrucura-general/detalles/ap/mesh"
          element={<ApMesh />}
        /> */}
        <Route path="/monitoreo/infraestrucura-general/detalles" element={<Details />} />
        <Route path="/monitoreo/infraestrucura-general/map" element={<Map />} />
        <Route path="/monitoreo/candelaria/fim" element={<BaseFim />} />
        <Route path="/monitoreo/candelaria/anillo" element={<Anillo />} />
        <Route path="/monitoreo/candelaria/anillo/v2" element={<Anillov2 />} />
        <Route path="/monitoreo/candelaria/proceso-mesh" element={<MeshProcess />} />
        <Route path="/monitoreo/infraestrucura-general/certificados" element={<Certificates />} />
        {/* <Route
          path="/monitoreo/infraestrucura-general/telefonia"
          element={<Voice />}
        />
        <Route
          path="/monitoreo/infraestrucura-general/iseprime"
          element={<Ise />}
        />
        <Route
          path="/monitoreo/infraestrucura-general/contraladoras-inalambricas"
          element={<Wireless />}
        />
        <Route path="/monitoreo/infraestrucura-general/lte" element={<Lte />} />
        <Route
          path="/monitoreo/infraestrucura-general/cctv"
          element={<Cctv />}
        /> */}
        <Route path="/monitoreo/anillo/ug" element={<AnilloUg />} />
        <Route path="/monitoreo/anillo/tetra" element={<AnilloTetra />} />
        <Route path="/monitoreo/infraestrucura-general/procesos-devnet" element={<Dockers />} />
        <Route path="/candelaria/monitoreo/flotacion/ot" element={<FlotacionOt />} />
        <Route path="/candelaria/monitoreo/mra" element={<Mra />} />
        <Route path="/candelaria/monitoreo/dragos" element={<Dragos />} />
        <Route path="/monitoreo/infraestrucura-general/licenciamientos" element={<Licenciamientos />} />
      </Routes>

      <div className="refresh-button-container">
        <span title={""} style={{ marginLeft: "10px" }} className="refresh-button-container-2">
          Version 2.7.0
        </span>
        <div className="pause-and-icons-container">
          <IconsPage />
          <button
            className="refresh-button"
            onClick={toggleTimer}
            title={timerActive ? "Pausar Autorefresco de la página" : "Activar Autorefresco de la página"}
          >
            {timerActive ? (
              <FontAwesomeIcon icon={faPause} /> // Icono de Pause
            ) : (
              <FontAwesomeIcon icon={faPlay} /> // Icono de Play
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
