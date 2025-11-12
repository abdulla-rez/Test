import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { addStock, purchaseProducts } from "../controllers/purchase.controller";

const purchaseRoutes = Router()

purchaseRoutes.use(authenticate)
purchaseRoutes.post('/buy',purchaseProducts)
purchaseRoutes.post('/stockAdd',addStock)

export default purchaseRoutes