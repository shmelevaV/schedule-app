import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const getPositions = async ()=>{
    const {data} = await $host.get('api/position')
    return data
}

export const deletePosition= async (id)=>{
    const {data} = await $host.delete(`api/position/${id}`);
    return data
}

export const CreatePosition= async (name, short_name)=>{
    const {data} = await $host.post('api/position',{name, short_name});
    return data
}