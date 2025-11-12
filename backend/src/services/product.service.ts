import { productRepo } from "../controllers/product.controller"

export const findProductByName = async(name:string)=>{
    return await productRepo.findOne({where:{product_name:name}})
}


export const fetchAllProducts = async() =>{
    return await productRepo.find()
}

export const findProductById = async(id:number) =>{
    return await productRepo.findOne({where:{product_id:id}})
}