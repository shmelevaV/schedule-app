import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const getTypes = async ()=>{
    const {data} = await $host.get('api/type')
    return data
}
