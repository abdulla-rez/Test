import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import purchaseRoutes from "./routes/purchase.routes";
import saleRoutes from "./routes/sale.routes";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express");
});

app.use(express.json())
 app.use(express.urlencoded({ extended: true })); 
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/sell", saleRoutes);
app.use(errorHandler);

export default app;
