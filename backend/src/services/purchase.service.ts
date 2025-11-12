import { IsNull, Not } from "typeorm";
import { billRepo, purchaserepo } from "../controllers/purchase.controller";

export const fetchAllPurchasedBill = async () => {
  return await billRepo.find({
    where: {
      purchaseId: Not(IsNull()), 
      saleId: IsNull(),
    },relations:['purchased_product','purchased_product.purchasedProduct']
  });
};



export const fetchSaledBill = async () => {
  return await billRepo.find({
    where: {
      purchaseId: IsNull(), 
      saleId: Not(IsNull()),
    },relations:['saled_product','saled_product.saledProduct']
  });
};
