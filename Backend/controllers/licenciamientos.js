const moment = require("moment");
const { Licenciamientos } = require("../models/licenciamientos");

class LicenciamientosService {
  async getLicenciamientos() {
    try {
      const data = await Licenciamientos.findAll();
      data.forEach((element) => {
        if (element.expiracion !== "Perpetuas") {
          const expirationDate = moment(element.expiracion, "D/MM/YYYY");
          const currentDate = moment();
          const days = expirationDate.diff(currentDate, "days");
          element.dataValues.daysRemaining = days;
          if (45 <= days && days < 90) {
            element.dataValues.status = "Warning";
          } else if (days < 45) {
            element.dataValues.status = "Down";
          } else {
            element.dataValues.status = "Up";
          }
        } else {
          element.dataValues.daysRemaining = "N/A";
          element.dataValues.status = "Up";
        }
      });
      const dataPlain = data.map(item => item.get({ plain: true }));
      const total = dataPlain.length;
      const licenciamientosDown = dataPlain.filter(e => e.status === "Down").length;
      const kpiUp = Number((((total - licenciamientosDown) / total) * 100).toFixed(2));
      
      return {
        statusCode: 200,
        message: "Información de los licenciamientos obtenida exitosamente",
        data: {
          kpi: kpiUp,
          data
        },
      };
    } catch (error) {
      console.error(error)
      throw new Error("Error al obtener la información de los licenciamientos");
    }
  }

  async createLicenciamiento(data) {
    try {
      const existingLicenciamiento = await Licenciamientos.findOne({
        where: { serial: data.serial },
      });

      if (!existingLicenciamiento) {
        const newLicenciamiento = await Licenciamientos.create({
          equipo: data.equipo,
          marca: data.marca,
          serial: data.serial,
          expiracion: data.expiracion,
          expiracion_soporte: data.expiracion_soporte,
        });

        return {
          statusCode: 201,
          message: "Licenciamiento creado exitosamente.",
          data: newLicenciamiento,
        };
      }

      return {
        statusCode: 409,
        message: "El licenciamiento ya existe en la base de datos.",
      };
    } catch (error) {
      console.error("log del error al crer el licenciamiento ===========>", error);
    }
  }

  async editOneLicenciamiento(id, changes) {
    try {
      const licenciamiento = await Licenciamientos.findByPk(id);
      if (licenciamiento) {
        await Licenciamientos.update(
          {
            equipo: changes.equipo,
            marca: changes.marca,
            serial: changes.serial,
            expiracion: changes.expiracion,
            expiracion_soporte: changes.expiracion_soporte,
          },
          { where: { id: id } }
        );
        const licenciamientoUpdated = await Licenciamientos.findByPk(id);
        return {
          statusCode: 200,
          message: "El Licenciamiento ha sido modificado exitosamente.",
          data: licenciamientoUpdated,
        };
      }
      return {
        statusCode: 404,
        message: "El Licenciamiento no existe en la base de datos.",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error al editar el licenciamiento");
    }
  }

  async deleteLicenciamiento(id) {
    try {
      const licenciamiento = await Licenciamientos.findOne({ where: { id: id } });
      if (licenciamiento !== null) {
        await Licenciamientos.destroy({ where: { id: licenciamiento.id } });
        const checkLicenciamientoIsDeleted = await Licenciamientos.findByPk(licenciamiento.id);
        if (checkLicenciamientoIsDeleted === null) {
          return {
            status: 200,
            message: "El Licenciamiento ha sido eliminado exitosamente",
          };
        } else {
          throw error;
        }
      }
      return {
        status: 404,
        message: "El Licenciamiento no existe en la base de datos",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el licenciamiento");
    }
  }
}

module.exports = { LicenciamientosService };
