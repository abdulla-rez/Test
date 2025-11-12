import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { purchaseProducts } from "../controllers/purchase.controller";
import { getAllSaledBill, saleProduct } from "../controllers/sale.controller";

const saleRoutes = Router()

saleRoutes.use(authenticate)
saleRoutes.post('/sale',saleProduct)
saleRoutes.get('/all',getAllSaledBill)





export default saleRoutes