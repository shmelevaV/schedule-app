import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const getGroups = async ()=>{
    const {data} = await $host.get('api/group')
    return data
}

export const deleteGroup = async (id)=>{
    const {data} = await $host.delete(`api/group/${id}`);
    return data
}

export const CreateGroup= async (name)=>{
    const {data} = await $host.post('api/group',{name});
    return data
}