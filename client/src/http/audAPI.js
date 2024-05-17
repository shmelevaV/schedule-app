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
