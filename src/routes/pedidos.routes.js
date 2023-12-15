import { Router } from "express";
import {authRequired, isGerenteOPropietario} from "../middlewares/validateToken.js";
import {
    createPedido,
    getIdPedido,
    getPedidos,
    updatePedido,
    deletePedido,

} from '../controllers/pedidos.controller.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPedidoSchema } from "../schemas/pedidos.schema.js";

const router = Router()

router.get('/pedidos',authRequired,getPedidos)
router.get('/pedidos/:id',authRequired, getIdPedido)
router.post('/pedidos',authRequired,validateSchema(createPedidoSchema),createPedido)
router.put('/pedidos/:id',[authRequired, isGerenteOPropietario], updatePedido);
router.delete('/pedidos/:id', [authRequired, isGerenteOPropietario], deletePedido)

export default router

