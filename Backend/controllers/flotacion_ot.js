const { FlotacionOt } = require("../models/flotacion_ot");

class FlotacionOtService {
  async getDataFlotacionOt() {
    try {
      const data = await FlotacionOt.findAll();
      return {
        statusCode: 200,
        message: "Información del Flotacion OT tetra obtenida exitosamente",
        data: data,
      };
    } catch (error) {
        console.error(error);
      throw new Error("Error al obtener la información del Flotacion OT tetra");
    }
  }

  async getDataFlotacionOtUpDown() {
    try {
      const response = await FlotacionOt.findAll();
      const upElements = [];
      const downElements = [];

      response.forEach((item) => {
        const status = item.status.toLowerCase();
        if (status.includes("up")) {
          upElements.push(item);
        } else if (status.includes("down")) {
          downElements.push(item);
        }
      });

      const totalElements = upElements.length + downElements.length;
      const upPorcent = totalElements
        ? (upElements.length / totalElements) * 100
        : 0;

      const data = {
        upElements,
        downElements,
        upPorcent: parseFloat(upPorcent.toFixed(1)),
      };

      return {
        statusCode: 200,
        message: "Información del Anillo tetra obtenida exitosamente Up Down",
        data: data,
      };
    } catch (error) {
        console.error(error);
      throw new Error("Error al obtener la información del Anillo tetra Up Down");
    }
  }
}

module.exports = { FlotacionOtService };
