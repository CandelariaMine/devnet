const express = require("express");
const router = express.Router();
const { createUpsSchema, editUpsSchema } = require("../schemas/ups.schema");
const { validateData } = require("../middlewares/validator.handler");
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const { UpsService } = require("../controllers/ups");

const Ups = new UpsService();

// Obtener todos las Ups
router.get("/", async (req, res, next) => {
  try {
    const response = await Ups.getUps();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});
// Obtener kpi Ups
router.get("/kpi", async (req, res, next) => {
  try {
    const ups = await Ups.getUps();
    const response = await Ups.getUpsKpi(ups.data);
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

// router.get("/:ip", async (req, res, next) => {
//   try {
//     const ip = req.params.ip;
//     const ups = await getOneUps(ip);
//     res.status(ups.status).json({
//       status: ups.status,
//       message: ups.message,
//       error: ups.error,
//       data: ups.data,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post(
//   "/new",
//   passport.authenticate("jwt", { session: false }),
//   checkRoles("admin", "staff"),
//   validateData(createUpsSchema),
//   async (req, res, next) => {
//     try {
//       const data = req.body;
//       const newUps = await createUps(data);
//       res.status(newUps.status).json({
//         status: newUps.status,
//         message: newUps.message,
//         error: newUps.error,
//         data: newUps.data,
//       });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );

// router.put(
//   "/edit/:id",
//   passport.authenticate("jwt", { session: false }),
//   checkRoles("admin", "staff"),
//   validateData(editUpsSchema),
//   async (req, res, next) => {
//     try {
//       const id = req.params.id;
//       const changes = req.body;
//       const upsEdit = await editOneUps(id, changes);
//       res.status(upsEdit.status).json({
//         status: upsEdit.status,
//         message: upsEdit.message,
//         error: upsEdit.error,
//         data: upsEdit.data,
//       });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );

// router.delete(
//   "/remove/:ip",
//   passport.authenticate("jwt", { session: false }),
//   checkRoles("admin", "staff"),
//   async (req, res, next) => {
//     try {
//       const ip = req.params.ip;
//       const upsDeleted = await deleteUps(ip);
//       res.status(upsDeleted.status).json({
//         status: upsDeleted.status,
//         message: upsDeleted.message,
//         error: upsDeleted.error,
//         data: upsDeleted.data,
//       });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );

module.exports = router;
