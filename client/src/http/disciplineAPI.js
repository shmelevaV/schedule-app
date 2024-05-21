import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const getDisciplines = async ()=>{
    const {data} = await $host.get('api/discipline')
    return data
}

export const deleteDiscipline= async (id)=>{
    const {data} = await $host.delete(`api/discipline/${id}`);
    return data
}

export const CreateDiscipline = async (name, short_name)=>{
    const {data} = await $host.post('api/discipline ',{name, short_name});
    return data
}
