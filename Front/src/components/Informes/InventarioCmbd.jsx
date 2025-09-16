import { Navbar } from "../Navbar/Navbar";
import "./InventarioCmbd.css";
import { useState } from "react";
import { Modal } from "../Modal/Modal"; // importa tu Modal

export const InventarioCmbd = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    content: "",
    buttons: [],
    errorMess: "",
  });

  // función de validación simple con regex
  const validateEmail = (value) => {
    if (!value) return "El correo es obligatorio";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? "" : "Correo inválido";
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError(validateEmail(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSent(true);
    // modal de éxito con advertencia del tiempo
    setModalData({
      title: "Solicitud enviada ✅",
      content: (
        <p>
          El proceso de generación del inventario puede tardar <strong>varios minutos</strong>. Cuando finalice, el
          archivo CSV será enviado al correo <strong>{email}</strong>. Puedes cerrar esta ventana sin problema.
        </p>
      ),
      buttons: [
        {
          label: "Entendido",
          type: "primary",
          onClick: () => setModalOpen(false),
        },
      ],
      errorMess: "",
    });
    setModalOpen(true);

    if (error || !email) return;
    try {
      await fetch("http://10.224.116.78:3030/api/candelaria/informes/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      // modal de error
      setModalData({
        title: "Error",
        content: <p>Hubo un problema al solicitar el inventario.</p>,
        buttons: [
          {
            label: "Cerrar",
            type: "danger",
            onClick: () => setModalOpen(false),
          },
        ],
        errorMess: err.message,
      });
      setModalOpen(true);
    }
  };

  return (
    <>
      <Navbar title={"Inventario CMDB"} />
      <main className="inventario-form-email-main">
        <div className="info-inventario-cmbd">
          <p>Este inventario genera un archivo CSV con los datos de los elementos que conforman la red Candelaria:</p>
          <br />
          <ul>
            <li>
              <strong>Access Points</strong>
            </li>
            <li>
              <strong>Controladoras Inalámbricas</strong>
            </li>
            <li>
              <strong>Firewalls</strong>
            </li>
            <li>
              <strong>Magic Info (TV)</strong>
            </li>
            <li>
              <strong>Routers</strong>
            </li>
            <li>
              <strong>Servidores</strong>
            </li>
            <li>
              <strong>Switches</strong>
            </li>
            <li>
              <strong>Cámaras</strong>
            </li>
          </ul>
          <br />
          <p>Las columnas incluidas en este formato son: Nombre, Categoría, Número Serial y Fecha de instalación.</p>
          <br />
          <p>
            El proceso puede tardar algunos minutos mientras se descarga toda la información de los servidores, por lo
            que el reporte será enviado al <strong>correo registrado</strong> cuando se complete.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="inventario-form-email">
          {error && (
            <span style={{ margin: "0px" }} className="error-message-inventario-form">
              {error}
            </span>
          )}
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="tu-correo@ejemplo.com"
            required
            className="email-input-inventario"
          />

          <button disabled={error || !email || sent} type="submit" className={error || !email ? "empty-input-button" : "submit-inventario-button"}>
            Enviar
          </button>
        </form>
      </main>

      {/* Modal dinámico */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalData.title}
        content={modalData.content}
        buttons={modalData.buttons}
        errorMess={modalData.errorMess}
      />
    </>
  );
};
