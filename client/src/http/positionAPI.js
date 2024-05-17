import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const getPositions = async ()=>{
    const {data} = await $host.get('api/position')
    return data
}
