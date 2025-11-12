import { NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product.entity";
import { fetchAllProducts, findProductById, findProductByName } from "../services/product.service";
import { ApiError } from "../utils/apiError";


interface ProductBody {
  product_name: string;
  price: number;
  currentStock: number;
  taxPercentage?: number;
}


export const productRepo = AppDataSource.getRepository(Product)

export const createProduct = async(req: any,res:any,next:NextFunction)=>{
    try {
        const {product_name,price,currentStock,taxPercentage} = req.body
        const {image} = req.file

        const productExists = await findProductByName(product_name)

        if(productExists){
            throw new ApiError("Product already exixts",409)
        }

        const uuid = crypto.randomUUID();

        const newProduct = productRepo.create({
            product_name,
            price,
            currentStock,
            taxPercentage,
            image,
            SKU:uuid
        })


        await productRepo.save(newProduct)

        res.status(200).json({
            success:true,
            message:"New Product created successfully",
            data:newProduct
        })

    } catch (error) {
        next(error)
    }
}

export const getAllProducts = async(req:any,res:any,next:NextFunction)=>{
    try {
        const allProducts = await fetchAllProducts()

        if(allProducts.length === 0){
            res.status(200).json({
                message:"No product added yet"
            })
        }

        res.status(200).json(
            {
                succes:true,
                message:"All products fetched",
                data:allProducts
            }
        )
    } catch (error) {
        next(error)
    }
}


export const deleteProduct = async(req:any,res:any,next:NextFunction)=>{
    try {
        const {p_Id} = req.body

        const product = await findProductById(p_Id)

        if(product){
            throw new ApiError("Product not found",404)
        }

        await productRepo.delete(product.product_id)
        res.status(200).json({
            success:true,
            message:"Product deleted",
            deletdProduct:product
        })
    } catch (error) {
        next(error)
    }
}


export const getSingleproduct = async(req:any,res:any,next:NextFunction)=>{
    try {
        const {pId} = req.params.id

        const product = await findProductById(pId)

        if(!product){
            throw new ApiError("Product not found",404)
        }

        res.status(200).json({
            success:true,
            message:"Product fetched successfully",
            data:product
        })
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async(req:any,res:any,next:NextFunction)=>{
    try {
        const {product_name,price,currentStock,taxPercentage} = req.body 
        const {image} = req.file

        const productExists = await findProductByName(product_name)

        if(!productExists){
            throw new ApiError("Product not found",404)
        }

        if(product_name) productExists.product_name = product_name
        if(price) productExists.price = price
        if(currentStock) productExists.currentStock = currentStock
        if(taxPercentage) productExists.taxPercentage= taxPercentage
        if(image) productExists.image = image

        await productRepo.save(productExists)

        res.status(200).json({
            success:true,
            message:"Product updated successfully",
            data:productExists
        })
    } catch (error) {
        next(error)
    }
}