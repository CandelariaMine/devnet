import { Navbar } from "../Navbar/Navbar"
import "./InventarioCmbd.css"

import { useState } from "react"

export const InventarioCmbd = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  // función de validación simple con regex
  const validateEmail = (value) => {
    if (!value) return "El correo es obligatorio"
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(value) ? "" : "Correo inválido"
  }

  const handleChange = (e) => {
    const value = e.target.value
    setEmail(value)
    setError(validateEmail(value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // si hay error, no envía
    if (error || !email) return

    try {
      const response = await fetch("https://tu-api.com/api/v1/inventario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error("Error en la petición")
      alert("Inventario enviado correctamente")
    } catch (error) {
      alert("Hubo un problema: " + error.message)
    }
  }

  return (
    <>
      <Navbar title={"Inventario CMDB"} />
      <main className="inventario-form-email-main">
        <div className="info-inventario-cmbd">
          <p>
            Este inventario genera un archivo CSV con los datos de los elementos que conforman la red Candelaria:
          </p>
            <br />
          <ul>
            <li><strong>Access Points</strong></li>
            <li><strong>Controladoras Inalámbricas</strong></li>
            <li><strong>Firewalls</strong></li>
            <li><strong>Magic Info (TV)</strong></li>
            <li><strong>Routers</strong></li>
            <li><strong>Servidores</strong></li>
            <li><strong>Switches</strong></li>
            <li><strong>Cámaras</strong></li>
          </ul>
          <br />
          <p>
            Las columnas incluidas en este formato son: Nombre, Categoría, Número Serial y Fecha de instalación.
          </p>
          <br />
          <p>
            El proceso puede tardar algunos minutos mientras se descarga toda la información
            de los servidores, por lo que el reporte será enviado al <strong>correo registrado</strong> cuando se complete.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="inventario-form-email">
          {/* mensaje de error */}
          {error && (
            <span style={{margin: "0px"}} className="error-message-inventario-form">{error}</span>
          )}
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="tu-correo@ejemplo.com"
            required
            className="email-input-inventario"
          />


          <button
            type="submit"
            className={error || !email ? "empty-input-button " : "submit-inventario-button"}
          >
            Enviar
          </button>
        </form>
      </main>
    </>
  )
}
