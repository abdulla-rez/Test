import commonAPI, { baseURL } from "./CommonApi";


export const getAllProducts = async()=>{
    return await commonAPI('GET',`${baseURL}/product/all`)
}


export const deleteproduct = async(id:number)=>{
    return await commonAPI('DELETE',`http://localhost:4000/product/delete/${id}`)
}

export const createProduct = async (FormData:any)=>{
    console.log("FOrmdata in service")
return await commonAPI('POST',`${baseURL}/product/create`,FormData)
}


export const fetchAllPurchasedBill = async () =>{
    return await commonAPI ('GET',`${baseURL}/purchase/all`)
}

export const addStock = async(data:any)=>{
    return await commonAPI(`POST`,`http://localhost:4000/purchase/stockAdd`,data)
}

export const updateProduct = async(id:any,data:any)=>{
    console.log("Hiii")
    return await commonAPI(`PUT`,`http://localhost:4000/product/update/${id}`,data)
}

export const createSale = async(payload:any)=>{
    console.log("PAYLOAD FROM SERVICE",payload)
    return await commonAPI('POST',`http://localhost:4000/sell/sale`,{payload})
}