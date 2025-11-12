import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { createProduct, deleteProduct, getAllProducts, getSingleproduct, updateProduct } from "../controllers/product.controller";
import { UserRole } from "../entities/User.entity";

const productRoutes = Router()

productRoutes.use(authenticate)
productRoutes.get('/all-products',getAllProducts)
productRoutes.get('/:id',getSingleproduct)



export default productRoutes