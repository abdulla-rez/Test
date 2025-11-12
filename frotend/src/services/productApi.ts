import commonAPI, { baseURL } from "./CommonApi";


export const getAllProducts = async()=>{
    return await commonAPI('GET',`${baseURL}/product/all`)
}


export const deleteproduct = async(id:number)=>{
    console.log("hiii")
    return await commonAPI('DELETE',`${baseURL}product/delete`,{id})
}

export const createProduct = async (FormData:any)=>{
    console.log("FOrmdata in service")
return await commonAPI('POST',`${baseURL}/product/create`,FormData)
}
