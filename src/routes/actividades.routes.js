import express from "express";
const router = express.Router()
import { authRequired, isAdminOPropietario, isAdministrador, isGerente, isGerenteOPropietario, isPropietario } from "../middlewares/validateToken.js";
import { createActividad, deleteActividad, getActividad, getActividades, updateActividad } from "../controllers/actividades.controller.js";

router.get("/actividades",authRequired, getActividades)
router.post("/actividades",authRequired, createActividad)
router.get("/actividades/:id",authRequired, getActividad)
router.delete("/actividades/:id",authRequired, deleteActividad)
router.put("/actividades/:id",authRequired, updateActividad)



export default router


