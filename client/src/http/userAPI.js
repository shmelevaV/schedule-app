import { $authHost, $host } from "./index";

export const registration = async (login, password, teacherListId)=>{
    const response = await $host.post('api/user/registration',{login,password, role: 'ADMIN',teacherListId})
    return response
}

export const logIn = async (login, password)=>{
    const response = await $host.post('api/user/login',{login,password})
    return response
}

export const check = async ()=>{
    const response = await $host.post('api/user/registration',)
    return response
}