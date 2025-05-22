import axios, { AxiosRequestConfig } from "axios";
import API_BASE_URL from "../config/apiConfig";

const axiosInstance = axios.create({
    baseURL : API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

export const request = async <T> (config : AxiosRequestConfig) : Promise<T> => {
    try {
        //successfuly send and return the data from the request that we sent
        const response = await axiosInstance.request<T>(config);
        return response.data;
    }
    catch(error: any){
        if(error.response) {
            //request was sent,server threw an error or we log that an error occured
            const errorMsg = error.response.data?.message || "An error occured";
            throw new Error(errorMsg);
        }
        else if(error.request){
            //request was send but no response
            throw new Error("No response from server");
        }
        else {
            //request wasn't sent
            throw new Error("Error in the request");
        }
    }
}

export const get = <T> (url: string,params?: any): Promise<T> =>{ 
    return request<T>({method: 'GET',url,params});
}

export const post = <T> (url : string, data ?: any): Promise<T> => {
    return request<T>({method: 'POST',url,data});
}

export const put = <T> (url: string , data ?: any ): Promise<T> => {
    return request<T>({method: 'PUT',url,data});
}

export const del = <T> (url: string): Promise<T> =>{
     return request<T>({ method: 'DELETE', url});
}

export const patch = <T>(url : string , data ?: any): Promise<T> =>{
    return request<T>({method: 'PUT',url,data});
}