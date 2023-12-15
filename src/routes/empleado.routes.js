import { Router } from "express";
import { authRequired, isPropietario } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createEmpleSchema } from "../schemas/emple.schema.js";
import { createEmpleado, deleteEmpleado, getEmpleados,cambiarEstadoEmpleado, updateEmpleado, getEmpleado } from "../controllers/empleado.controller.js";

const router = Router();

router.get("/empleados", authRequired, getEmpleados);

router.post("/empleados", authRequired, validateSchema(createEmpleSchema), createEmpleado);

router.get("/empleados/:id",authRequired, getEmpleado);

router.put("/empleados/:id", authRequired, updateEmpleado);

router.delete("/empleados/:id", authRequired, deleteEmpleado);

router.put("/empleados/:empleadoId/estado", cambiarEstadoEmpleado);

export default router;
