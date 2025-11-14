import { NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { PurcharseEntry } from "../entities/PurchaseEntry.entity";
import { findProductById } from "../services/product.service";
import { ApiError } from "../utils/apiError";
import { findUserById } from "../services/auth.service";
import { Bill, billType } from "../entities/Bill.entity";
import { productRepo } from "./product.controller";
import { fetchAllPurchasedBill } from "../services/purchase.service";

export const purchaserepo = AppDataSource.getRepository(PurcharseEntry);
export const billRepo = AppDataSource.getRepository(Bill);


export const purchaseProducts = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    console.log("hiii")
    const { pId, quantity } = req.body;
const userId = req.user.id;

    const user = await findUserById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    const product = await findProductById(pId);
   console.log(product)

    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    
    const total_price = quantity * product.price;
    console.log(product.price)
    const taxed_amount =
      total_price + (total_price * product.taxPercentage) / 100;
      console.log(taxed_amount)

      product.currentStock += quantity
      await productRepo.save(product)

      const newPurchase = purchaserepo.create({
        quantity,
        total_price:taxed_amount,
        productId:product.product_id,
      })
      await purchaserepo.save(newPurchase)
      const newBill = billRepo.create({
        purchased_product:newPurchase,
        billedStaff:user,
        billType:billType.PURCHASE
      })



      await billRepo.save(newBill)

      res.status(200).json({
        success:true,
        message:"New product added",
        purchased:newPurchase,
        newBill
      })
  } catch (error) {
    next(error);
  }
};

export const addStock = async (req:any,res:any,next:NextFunction) =>{
  try {
      const {pId,quantity} =  req.body


      const product = await findProductById(pId)

      if(!product){
        throw new ApiError("Product not found",404)
      }

      product.currentStock += quantity

      await productRepo.save(product)

      res.status(200).json({
        success:true,
        message:"Stock increased",
        product
      })
  } catch (error) {
    next(error)
  }
}


export const getAllPurchasedBill= async(req:any,res:any,next:NextFunction)=>{
  try {
      const getAllPurchases = await fetchAllPurchasedBill()

      res.status(200).json({
        success:true,
        message:"Purchases fetched successfully",
        data:getAllPurchases
      })
  } catch (error) {
    next(error)
  }
}