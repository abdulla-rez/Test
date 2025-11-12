import commonAPI, { baseURL } from "./CommonApi";

export interface Registerbody {
  name: string;
  email: string;
  password: string;
}

export interface LoginBody{
    email:string;
    password:string
}

export const registerAPI = async (data:Registerbody) => {
    console.log("hii")
  return await commonAPI("POST", `${baseURL}/auth/register`, data);
};

export const loginAPI = async (data: LoginBody) => {
  return await commonAPI("POST", `${baseURL}/auth/login`, data);
}
