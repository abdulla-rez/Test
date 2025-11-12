import { NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { SalesEntry } from "../entities/SalesEntry.entity";

export const salerepo = AppDataSource.getRepository(SalesEntry)

export const saleProduct = async(req:any,res:any,next:NextFunction)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}