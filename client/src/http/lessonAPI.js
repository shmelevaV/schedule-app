import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const getLessons = async ( start_date,weekNumber, dayOfWeek)=>{

    let st="2024-02-05";
    const {data} = await $host.get('api/schedule', {
        params: {
            start_date: start_date,
            weekNumber: weekNumber,
            dayOfWeek: dayOfWeek
        }
    });
    console.log(data)
    return data
}