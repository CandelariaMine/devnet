import { useEffect, useState } from "react";
import { getDefaultRoute } from "../../../utils/Api-candelaria/api";
import "./Bgp.css";

export function RouteDefaultTable() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await getDefaultRoute();
        setRoutes(res.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <>
      {/* Botón flotante arriba derecha */}
      <button
        className="toggle-btn"
        onClick={() => setVisible(!visible)}
      >
        {visible ? "Cerrar" : "Ver Rutas"}
      </button>

      {/* Tabla flotante */}
      {visible && (
        <div className="route-default-overlay">
          <div className="route-default-container">
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <table className="route-default-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Switch</th>
                    <th>Red</th>
                    <th>IP Switch</th>
                    <th>Vía BGP</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((route) => (
                    <tr key={route.id}>
                      <td>{route.id}</td>
                      <td>{route.name_switch}</td>
                      <td>{route.red}</td>
                      <td>{route.ip_switch}</td>
                      <td
                        className={
                          route.via_bgp === "true"
                            ? "kpi-green"
                            : "kpi-red"
                        }
                      >
                        {route.via_bgp === "true" ? "Sí" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
}
