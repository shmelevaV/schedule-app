import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const registration = async (login, password, teacherListId)=>{
    const {data} = await $host.post('api/user/registration',{login,password, role: 'ADMIN',teacherListId})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const logIn = async (login, password)=>{
    const {data} = await $host.post('api/user/login',{login,password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const getUsers = async ()=>{
    const {data} = await $host.get('api/user')
    return data
}

export const check = async ()=>{
    try{
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
    }catch(e){
    }
}