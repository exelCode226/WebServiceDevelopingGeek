import { Router } from "express";
import { authRequired, isAdminOPropietario, isAdministrador, isGerente, isGerenteOPropietario, isPropietario } from "../middlewares/validateToken.js";
import {getClientes, getIdCliente, updateClient, deleteClient, createClient} from '../controllers/clientes.controllers.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createClienteSchema } from "../schemas/cliente.shema.js";

const router = Router()
router.get('/clientes', getClientes)
router.get('/clientes/:id' , getIdCliente)
router.post('/clientes', createClient);
router.put('/clientes/:id', updateClient);
router.delete('/clientes/:id' , deleteClient);


export default router;

