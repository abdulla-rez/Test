import { purchaserepo } from "../controllers/purchase.controller"

export const fetchAllPurchases = async() =>{
 await purchaserepo.find({relations:['product']})
}