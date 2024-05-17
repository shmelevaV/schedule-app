import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const getDisciplines = async ()=>{
    const {data} = await $host.get('api/discipline')
    return data
}
