import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { createProduct, deleteProduct, getAllProducts, getSingleproduct, updateProduct } from "../controllers/product.controller";
import { UserRole } from "../entities/User.entity";

const productRoutes = Router()

// productRoutes.use(authenticate)


productRoutes.post('/create',createProduct)
productRoutes.get('/all',getAllProducts)
productRoutes.get('/:id',getSingleproduct)
productRoutes.delete('/delete/:id',deleteProduct)
productRoutes.put('/update/:id',updateProduct)

export default productRoutes
