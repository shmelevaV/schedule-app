import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const getTeachers = async ()=>{
    const {data} = await $host.get('api/teacher/joined')
    return data
}

export const deleteTeacher= async (id)=>{
    const {data} = await $host.delete(`api/teacher/${id}`);
    return data
}

export const CreateTeacher = async (surname_N_P, positionListId, departmentListId)=>{
    const {data} = await $host.post('api/teacher ',{surname_N_P, positionListId, departmentListId});
    return data
}