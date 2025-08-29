import { useEffect, useState } from "react";
import "./Maquinas.css";
import { getVmDevnetStatus } from "../../../utils/Api-candelaria/api";
import PuffLoader from "react-spinners/PuffLoader";

export function Maquinas() {
  const [vm, setVm] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVmStatus = async () => {
      try {
        const data = await getVmDevnetStatus();
        setVm(data.vmData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching VM status:", error);
        setLoading(false);
      }
    };
    fetchVmStatus();
  }, []);

  return (
    <div className="maquinas-container">
      <div className="maquinas-table">
        <table>
          <thead>
            <tr>
              <th>Máquina</th>
              <th>Sensor</th>
              <th>Estado</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>
                  <div style={{ display: "grid", placeContent: "center" }}>
                    <PuffLoader color="red" />
                  </div>
                </td>
              </tr>
            ) : (
              vm.map((virtualMachine, index) =>
                virtualMachine.sensors.length > 0 ? (
                  virtualMachine.sensors.map((sensor, sensorIndex) => (
                    <tr key={`${index}-${sensorIndex}`}>
                      <td>{virtualMachine.name}</td>
                      <td>{sensor.sensor}</td>
                      <td>{sensor.status}</td>
                      <td>{sensor.lastvalue}</td>
                    </tr>
                  ))
                ) : (
                  <tr key={index}>
                    <td>{virtualMachine.name}</td>
                    <td colSpan={3}>No hay sensores</td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
