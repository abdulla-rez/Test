import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { addStock, getAllPurchasedBill,  purchaseProducts } from "../controllers/purchase.controller";

const purchaseRoutes = Router()

purchaseRoutes.use(authenticate)
purchaseRoutes.post('/buy',purchaseProducts)
purchaseRoutes.post('/stockAdd',addStock)
purchaseRoutes.get('/all',getAllPurchasedBill)

export default purchaseRoutes