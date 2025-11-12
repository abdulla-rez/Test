import { NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { SalesEntry } from "../entities/SalesEntry.entity";
import { findProductById } from "../services/product.service";
import { ApiError } from "../utils/apiError";
import { findUserById } from "../services/auth.service";
import { billRepo } from "./purchase.controller";
import { billType } from "../entities/Bill.entity";
import { productRepo } from "./product.controller";
import { fetchSaledBill } from "../services/purchase.service";

export const salerepo = AppDataSource.getRepository(SalesEntry);

export const saleProduct = async (req: any, res: any, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const { pId, quantity, tax, price, discount } = req.body;

    const product = await findProductById(pId);

    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    const user = await findUserById(userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    if(product.currentStock == 0 || product.currentStock < quantity){
        throw new ApiError("Insufficient stock",404)
    }

    const total_price = price * quantity;
    const taxed_amount = total_price + (total_price * tax) / 100;
    const discountPrice = taxed_amount - (taxed_amount * discount) / 100;

    product.currentStock -= quantity
    await productRepo.save(product)

    const newSale = salerepo.create({
      quantity,
      productId: product.product_id,
      final_price: discountPrice,
      tax,
    });

    await salerepo.save(newSale);
  
    const newBill = billRepo.create({
      saleId:newSale.sales_id,
      billedSatff: user,
      billType: billType.SALE,
    });


    await billRepo.save(newBill);

    res.status(200).json({
      success: true,
      message: "Product sold",
      saled: newSale,
      newBill,
    });
  } catch (error) {
    next(error);
  }
};


export const getAllSaledBill= async(req:any,res:any,next:NextFunction)=>{
  try {
      const getAllSales = await fetchSaledBill()
      console.log("getAllPurchases",getAllSales)
      res.status(200).json({
        success:true,
        message:"Purchases fetched successfully",
        data:getAllSales
      })
  } catch (error) {
    next(error)
  }
}