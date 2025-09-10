import { Navbar } from "../../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./adminhome.css";

export const AdminHome = () => {
  const [linkSelected, setLinkSelected] = useState("");

  const linksTables = [
    // "/admin/clients",
    // "/admin/switches",
    // "/admin/ups",
    "/admin/devices",
    // "/admin/wan",
    // "/admin/mesh",
    // "/admin/firewalls",
    // "/admin/users",
    // "/admin/actility",
    "/monitoreo/infraestrucura-general/licenciamientos",
    "/admin/inventario/cmbd"
  ];
  const titles = [
    // "DCS Clientes Candelaria",
    // "DCS Switches Candelaria",
    // "UPS",
    "Dispositivos",
    // "WAN",
    // "MESH",
    // "Firewalls - Canales Internet",
    // "Usuarios",
    // "Actility AP",
    "Licenciamientos",
    "Inventario CMDB"
  ];

  return (
    <>
      <Navbar title={"Admin Home"} />
      <div className="main-admin-home">
        <div className="info-admin-home">
          <p>Seleccione uno de los sistemas que desea administrar.</p>
        </div>
        <form className="form-admin-home">
          <select
            className="admin-select-system"
            value={linkSelected}
            onChange={(e) => setLinkSelected(e.target.value)}
          >
            <option value=""></option>
            {titles.map((title, index) => (
              <option key={index} value={linksTables[index]}>
                {title}
              </option>
            ))}
          </select>
          {linkSelected && (
            <Link
              className="admin-select-system"
              style={{ color: "white" }}
              to={linkSelected}
            >
              <button style={{ cursor: "pointer", color: "white" }}>
                Seleccionar
              </button>
            </Link>
          )}
        </form>
      </div>
    </>
  );
};
