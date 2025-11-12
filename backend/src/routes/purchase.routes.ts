import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { purchaseProducts } from "../controllers/purchase.controller";

const purchaseRoutes = Router()

purchaseRoutes.use(authenticate)
purchaseRoutes.post('/buy',purchaseProducts)

export default purchaseRoutes