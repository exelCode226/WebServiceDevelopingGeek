import express from "express";
const router = express.Router()
import { authRequired, isAdminOPropietario, isAdministrador, isGerente, isGerenteOPropietario, isPropietario } from "../middlewares/validateToken.js";
import { createActividad, deleteActividad, getActividad, getActividades, updateActividad } from "../controllers/actividades.controller.js";

router.get("/actividades", getActividades)
router.post("/actividades", createActividad)
router.get("/actividades/:id",, getActividad)
router.delete("/actividades/:id", deleteActividad)
router.put("/actividades/:id", updateActividad)



export default router


