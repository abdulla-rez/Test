import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import purchaseRoutes from "./routes/purchase.routes";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express");
});

app.use(express.json())
 app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/purchase", purchaseRoutes);



app.use(errorHandler);


export default app;
