import { Router } from "express";
import express from "express";
import { authRequired, isAdminOPropietario, isAdministrador, isGerente, isGerenteOPropietario, isPropietario } from "../middlewares/validateToken.js";
import {getProgramacion, getIdProgramacion, updateProgramacion, deleteProgramacion, createProgramacion} from '../controllers/programacion.controller.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProgramacionSchema } from "../schemas/programacion.shema.js";

const router = express.Router()
router.get('/programaciones',[authRequired],  getProgramacion)
router.get('/programaciones/:id' ,[authRequired], getIdProgramacion)
router.post('/programaciones',[authRequired],validateSchema(createProgramacionSchema), createProgramacion);
router.put('/programaciones/:id',[authRequired, isGerenteOPropietario], updateProgramacion);
router.delete('/programaciones/:id',[authRequired, isGerenteOPropietario], deleteProgramacion);
router.put('/programaciones/:id', [authRequired, isGerenteOPropietario], updateProgramacion);


export default router;