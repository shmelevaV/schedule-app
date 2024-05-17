import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const getGroups = async ()=>{
    const {data} = await $host.get('api/group')
    return data
}
