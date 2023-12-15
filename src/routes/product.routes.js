import express from "express";
import { authRequired, isGerenteOPropietario } from "../middlewares/validateToken.js";

const router = express.Router()

import { createProducts, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products.controller.js";

router.get("/products",authRequired, getProducts)
router.post("/products",authRequired, createProducts)
router.get("/products/:id",authRequired, getProduct)
router.delete("/products/:id",authRequired, deleteProduct)
router.put("/products/:id", [authRequired], updateProduct)



export default router
