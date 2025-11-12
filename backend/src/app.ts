import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import purchaseRoutes from "./routes/purchase.routes";
import saleRoutes from "./routes/sale.routes";
import cors from "cors"


const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express");
});

app.use(express.json())
app.use(cors({origin:"http://localhost:5173"}));
 app.use(express.urlencoded({ extended: true })); 
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/sell", saleRoutes);
app.use(errorHandler);

export default app;
