import { NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { findProductById } from "../services/product.service";
import { ApiError } from "../utils/apiError";
import { findUserById } from "../services/auth.service";
import { billRepo } from "./purchase.controller";
import { billType } from "../entities/Bill.entity";
import { productRepo } from "./product.controller";
import { fetchSaledBill } from "../services/purchase.service";

import { SalesEntry } from "../entities/SalesEntry.entity";
import { SaleItem } from "../entities/SaleItem.entity";

export const salerepo = AppDataSource.getRepository(SalesEntry);
const saleItemRepo= AppDataSource.getRepository(SaleItem)


export const saleProduct = async (req: any, res: any, next: NextFunction) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      throw new ApiError("No items ", 404);
    }

    let subTotalSum = 0;
    const saleItemData = [];

    for (const item of items) {
      console.log("Product Id - ",item.product_id)
      const product = await productRepo.findOne({
        where: { product_id: item.product_id }
      });
      console.log("Product from database",product)

      if (!product) {
        throw new ApiError(`Product not found`, 404);
      }

      if (product.currentStock < item.quantity) {
        throw new ApiError(`Insufficient stock for `, 400);
      }
      product.currentStock -= item.quantity;
      await productRepo.save(product);

      const subTotal = product.price * item.quantity;
      subTotalSum += subTotal;

      saleItemData.push({
        product,
        quantity: item.quantity,
        subTotal
      });
    }


    const discount = Math.floor(subTotalSum / 100);
    const discountedAmount = subTotalSum - (subTotalSum * discount) / 100;

    const tax = Math.floor(discountedAmount / 100) + 4;
    const final_price = discountedAmount + (discountedAmount * tax) / 100;

    const saleEntry = salerepo.create({
      final_price,
      saleItem:saleItemData
    });

    await salerepo.save(saleEntry);

    for (const saleItem of saleItemData) {
      const oneSale = saleItemRepo.create({
        product: saleItem.product,
        quantity: saleItem.quantity,
        subTotal: saleItem.subTotal,
        sale: saleEntry
      });

      await saleItemRepo.save(oneSale);
    }

    const bill = billRepo.create({
      billType: billType.SALE,
      saled_product: saleEntry,
      saleId:saleEntry.sales_id
    });

    await billRepo.save(bill);

    res.status(200).json({
      success: true,
      message: "Sale completed",
      bill,
      saleEntry
    });

  } catch (err) {
    next(err);
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








//  const user = await findUserById(userId);

//     if (!user) {
//       throw new ApiError("User not found", 404);
//     }

//     if(product.currentStock == 0 || product.currentStock < quantity){
//         throw new ApiError("Insufficient stock",404)
//     }

//     const total_price = price * quantity;
//     const taxed_amount = total_price + (total_price * tax) / 100;
//     const discountPrice = taxed_amount - (taxed_amount * discount) / 100;

//     product.currentStock -= quantity
//     await productRepo.save(product)

//     const newSale = salerepo.create({
//       quantity,
//       productId: product.product_id,
//       final_price: discountPrice,
//       tax,
//     });


//     await salerepo.save(newSale);
  
//     const newBill = billRepo.create({
//       saleId:newSale.sales_id,
//       billedSatff: user,
//       billType: billType.SALE,
//     });


//     await billRepo.save(newBill);