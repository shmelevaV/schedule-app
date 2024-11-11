import {$host,$authHost} from "./hosts";
import { jwtDecode } from "jwt-decode";

// Функция для получения списка типов
export const getTypes = async ()=>{
    // Выполнение GET-запроса к API
    const {data} = await $host.get('api/type')
    // Возвращение полученных данных
    return data
}

// Функция для удаления типа
export const deleteType= async (id)=>{
    // Выполнение DELETE-запроса к API
    const {data} = await $host.delete(`api/type/${id}`);
    // Возвращение полученных данных
    return data
}

// Функция для создания типа
export const CreateType= async (name)=>{
    // Выполнение POST-запроса к API
    const {data} = await $authHost.post('api/type',{name});
    return data
}
