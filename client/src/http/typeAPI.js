import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const getTypes = async ()=>{
    const {data} = await $host.get('api/type')
    return data
}

export const deleteType= async (id)=>{
    const {data} = await $host.delete(`api/type/${id}`);
    return data
}

export const CreateType= async (name)=>{
    const {data} = await $host.post('api/type',{name});
    return data
}