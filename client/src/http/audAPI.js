import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const getAuds = async ()=>{
    const {data} = await $host.get('api/auditorium')
    return data
}

export const getJoinedAuds = async ()=>{
    const {data} = await $host.get('api/auditorium/joined')
    return data
}

export const deleteAud = async (id)=>{
    const {data} = await $host.delete(`api/auditorium/${id}`);
    return data
}

export const CreateAud = async (number, capacity, typeListId)=>{
    const {data} = await $host.post('api/auditorium ',{number, capacity, typeListId});
    return data
}
