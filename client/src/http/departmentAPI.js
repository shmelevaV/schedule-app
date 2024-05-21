import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const getDepartments = async ()=>{
    const {data} = await $host.get('api/department')
    return data
}

export const deleteDepartment = async (id)=>{
    const {data} = await $host.delete(`api/department/${id}`);
    return data
}

export const CreateDepartment= async (name)=>{
    const {data} = await $host.post('api/department',{name});
    return data
}