import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { purchaseProducts } from "../controllers/purchase.controller";
import { saleProduct } from "../controllers/sale.controller";

const saleRoutes = Router()

saleRoutes.use(authenticate)
saleRoutes.post('/sale',saleProduct)


export default saleRoutes