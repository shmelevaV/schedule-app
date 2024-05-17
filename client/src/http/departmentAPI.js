import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const getDepartments = async ()=>{
    const {data} = await $host.get('api/department')
    return data
}
