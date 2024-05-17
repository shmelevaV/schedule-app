import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const getLessons = async ( start_date,weekNumber, dayOfWeek)=>{
    const {data} = await $host.get('api/schedule', {
        params: {
            start_date: start_date,
            weekNumber: weekNumber,
            dayOfWeek: dayOfWeek
        }
    });
    return data
}

export const getReqLessons = async ()=>{
    const {data} = await $host.get('api/request');
    return data
}

export const getLessons2 = async ()=>{
    const {data} = await $host.get('api/schedule/tbd');
    return data
}

export const createReqLesson = async (number,submissionDate,firstDate,period,lastDate,
    status,teacherListId,disciplineListId,groupListId,auditoriumListId)=>{
    const {data} = await $host.post('api/request', {number,submissionDate,firstDate,period,lastDate,
    status,teacherListId,disciplineListId,groupListId,auditoriumListId});
    return data
}