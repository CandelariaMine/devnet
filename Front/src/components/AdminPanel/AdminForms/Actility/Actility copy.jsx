import { useState, useEffect, useNavigate } from "react";
import axios from "axios";
import { Navbar } from "../../../Navbar/Navbar";
import {
  BASE_API_URL,
  getDataActility,
} from "../../../../utils/Api-candelaria/api";
import { NewActility } from "./NewActility";
import { IoIosAddCircle } from "react-icons/io";
import "./Actility.css";

export function Actility() {
  const [actilityData, setActilityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showDataElem, setShowDataElem] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [idElem, setIdElem] = useState("");
  const [dataElem, setDataElem] = useState({});
  const [newDataElem, setNewDataElem] = useState({});
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageForm, setMessageForm] = useState("");
  const token = localStorage.getItem("jwtToken");

  const fetchData = async () => {
    try {
      if (!token) {
        const navigate = useNavigate();
        navigate("/login");
        return;
      }
      const data = await getDataActility();
      setActilityData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener el listado de Actility:", error);
      return error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openPopUpMessage = async (idActil) => {
    setShowPopUp(true);
    setShowButtons(true);
    await getDataFromElementSelected(idActil);
  };

  const showEditElementData = async () => {
    setShowDataElem(true);
    setShowButtons(false);
  };

  const getDataFromElementSelected = async (idActil) => {
    setIdElem(idActil);
    try {
      const response = await axios.get(`${BASE_API_URL}/actility/${idActil}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setDataElem(response.data);
      }
    } catch (error) {
      console.error("Error al obtener datos del elemento:", error);
    }
  };

  const handleChange = (e) => {
    setDataElem({
      ...dataElem,
      [e.target.name]: e.target.value,
    });
  };

  const cancelForm = () => {
    setShowPopUp(false);
    setShowDataElem(false);
    setShowDeleteConfirm(false);
    setIdElem("");
    setShowButtons(false);
    setDataElem({});
    fetchData();
    setShowMessageForm(false);
    setMessageForm("");
    setShowNewForm(false);
  };

  const editElement = async () => {
    if (
      !dataElem.name ||
      !dataElem.eui ||
      !dataElem.device ||
      !dataElem.longitude ||
      !dataElem.latitude
    ) {
      if (
        !dataElem.name ||
        !dataElem.eui ||
        !dataElem.device ||
        !dataElem.longitude ||
        !dataElem.latitude
      ) {
        setShowMessageForm(true);
        setMessageForm("Por favor, completa todos los campos");
        return;
      }
      try {
        const response = await axios.put(
          `${BASE_API_URL}/actility/edit/${idElem}`,
          dataElem,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response);
        if (response.status === 200) {
          setShowPopUp(false);
          setShowDataElem(false);
          setShowButtons(false);
          setDataElem({});
          fetchData();
          setShowMessageForm(false);
          setMessageForm("");
        }
      } catch (error) {
        console.error("Error al editar el elemento:", error);
      }
    }

    const deleteElement = async () => {
      try {
        const response = await axios.delete(
          `${BASE_API_URL}/actility/remove/${idElem}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          cancelForm();
        }
      } catch (error) {
        console.error("Error al ELIMINAR el elemento:", error);
      }
    };

    const selectDeleteOption = () => {
      setShowDeleteConfirm(true);
      setShowButtons(false);
    };

    const openNewElement = () => {
      setShowPopUp(true);
      setNewDataElem(true);
      setShowNewForm(true);
    };

    return (
      <div>
        <Navbar title={"Datos Actility"} />
        <IoIosAddCircle
          title={"Nuevo"}
          size={"3rem"}
          color="green"
          style={{ position: "absolute", cursor: "pointer" }}
          onClick={() => openNewElement()}
        />
        {showPopUp && (
          <div className="popup-message-actility">
            {showMessageForm && (
              <p
                style={{
                  color: "white",
                  backgroundColor: "black",
                  textAlign: "center",
                }}
              >
                {messageForm}
              </p>
            )}

            {showNewForm && (
              <>
                <p onClick={() => cancelForm()} className="close-form-actility">
                  Cerrar Formulario
                </p>
                <NewActility
                  setShowPopUp={setShowPopUp}
                  BASE_API_URL={BASE_API_URL}
                  fetchData={fetchData}
                  setShowMessageForm={setShowMessageForm}
                  setMessageForm={setMessageForm}
                  setShowNewForm={setShowNewForm}
                />
              </>
            )}
            {showButtons && (
              <div className="buttons-container-popup">
                <p onClick={() => cancelForm()} className="close-form-actility">
                  Cerrar Formulario
                </p>
                <button
                  onClick={() => showEditElementData()}
                  className="edit-actility-button"
                >
                  Editar
                </button>
                <button
                  onClick={() => selectDeleteOption()}
                  className="delete-actility-button"
                >
                  Eliminar
                </button>
              </div>
            )}
            {showDeleteConfirm && (
              <div className="container-form-delete-actility">
                <p onClick={() => cancelForm()} className="close-form-actility">
                  Cerrar Formulario
                </p>
                <h2>{`¿Estás seguro de eliminar`}</h2>
                <h2>{`${dataElem.name}?`}</h2>
                <button
                  onClick={() => deleteElement()}
                  className="confirm-edit-actility"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => cancelForm()}
                  className="cancel-edit-actility"
                >
                  Cancelar
                </button>
              </div>
            )}
            {showDataElem && (
              <div className="white-box">
                <p onClick={() => cancelForm()} className="close-form-actility">
                  Cerrar Formulario
                </p>
                <div className="container-form-actility">
                  <h2>Editar Elemento</h2>
                  <form className="edit-actility-form">
                    <label htmlFor="">NOMBRE</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={dataElem.name}
                      onChange={handleChange}
                    />
                    <label htmlFor="">EUI</label>
                    <input
                      type="text"
                      name="eui"
                      id="eui"
                      value={dataElem.eui}
                      onChange={handleChange}
                    />
                    <label htmlFor="">DISPOSITIVO</label>
                    <input
                      type="text"
                      name="device"
                      id="device"
                      value={dataElem.device}
                      onChange={handleChange}
                    />
                    <label htmlFor="">LONGITUD</label>
                    <input
                      type="number"
                      name="longitude"
                      id="longitude"
                      value={dataElem.longitude}
                      onChange={handleChange}
                    />
                    <label htmlFor="">LATITUD</label>
                    <input
                      type="number"
                      name="latitude"
                      id="latitude"
                      value={dataElem.latitude}
                      onChange={handleChange}
                    />
                  </form>
                  <section className="edit-cancel-actility-container">
                    <button
                      onClick={() => editElement()}
                      className="confirm-edit-actility"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => cancelForm()}
                      className="cancel-edit-actility"
                    >
                      Cancelar
                    </button>
                  </section>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="container-actility-table">
          <table className="actility-table">
            <thead>
              <tr>
                <th>NOMBRE</th>
                <th>EUI</th>
                <th>DISPOSITIVO</th>
                <th>LONGITUD</th>
                <th>LATITUD</th>
              </tr>
            </thead>
            <tbody>
              {actilityData.map((item) => (
                <tr
                  onClick={() => getDataFromElementSelected(item.id)}
                  key={item.id}
                >
                  <td
                    style={{ color: "rgb(0, 0, 148)", cursor: "pointer" }}
                    onClick={() => openPopUpMessage(item.id)}
                  >
                    {item.name}
                  </td>
                  <td>{item.eui}</td>
                  <td>{item.device}</td>
                  <td>{item.longitude}</td>
                  <td>{item.latitude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
}
