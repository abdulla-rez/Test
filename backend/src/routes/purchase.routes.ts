import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { addStock, getAllPurchasedBill,  purchaseProducts } from "../controllers/purchase.controller";

const purchaseRoutes = Router()

// purchaseRoutes.use(authenticate)
purchaseRoutes.get('/all',getAllPurchasedBill)
purchaseRoutes.post('/buy',purchaseProducts)
purchaseRoutes.post('/stockAdd',addStock)

export default purchaseRoutes