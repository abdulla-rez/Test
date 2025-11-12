import { NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { PurcharseEntry } from "../entities/PurchaseEntry.entity";
import { findProductById } from "../services/product.service";
import { ApiError } from "../utils/apiError";
import { findUserById } from "../services/auth.service";
import { Bill, billType } from "../entities/Bill.entity";

export const purchaserepo = AppDataSource.getRepository(PurcharseEntry);
export const billRepo = AppDataSource.getRepository(Bill);


export const purchaseProducts = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    console.log(req.body)
    const { pId, quantity } = req.body;
    const userId = req.user.pId;

    const user = await findUserById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    const product = await findProductById(pId);

    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    const total_price = quantity * product.price;
    const taxed_amount =
      total_price + (total_price * product.taxPercentage) / 100;


      const newPurchase = purchaserepo.create({
        quantity,
        total_price:taxed_amount,
        productId:product.product_id,
      })
      const newBill = billRepo.create({
        purchased_product:newPurchase,
        billedSatff:user,
        billType:billType.PURCHASE
      })

      await purchaserepo.save(newPurchase)


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
