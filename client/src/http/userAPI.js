// Импорт экземпляров axios и функции для декодирования JWT
import { $authHost, $host } from "./hosts";
import { jwtDecode } from "jwt-decode";

// Функция для регистрации пользователя
export const registration = async (login, password, teacherListId)=>{
    // Выполнение POST-запроса к API для регистрации пользователя
    const {data} = await $host.post('api/user/registration',{login,password, role: 'USER',teacherListId})
    // Сохранение токена в локальное хранилище
    localStorage.setItem('token', data.token)
    // Декодирование и возвращение данных из токена
    return jwtDecode(data.token)
}

// Функция для входа пользователя
export const logIn = async (login, password)=>{
    // Выполнение POST-запроса к API для входа пользователя
    const {data} = await $host.post('api/user/login',{login,password})
    // Сохранение токена в локальное хранилище
    localStorage.setItem('token', data.token)
    // Декодирование и возвращение данных из токена
    return jwtDecode(data.token)
}

// Функция для получения списка пользователей
export const getUsers = async ()=>{
    // Выполнение GET-запроса к API для получения списка пользователей
    const {data} = await $host.get('api/user')
    // Возвращение полученных данных
    return data
}

// Функция для удаления пользователя
export const deleteUser= async (id)=>{
    // Выполнение DELETE-запроса к API для удаления пользователя
    const {data} = await $host.delete(`api/user/${id}`);
    // Возвращение полученных данных
    return data
}

// Функция для проверки авторизации пользователя
export const check = async ()=>{
    try{
        // Выполнение GET-запроса к API для проверки авторизации пользователя
        const {data} = await $authHost.get('api/user/auth')
        // Сохранение токена в локальное хранилище
        localStorage.setItem('token', data.token)
        // Декодирование и возвращение данных из токена
        return jwtDecode(data.token)
    }catch(e){
        // Обработка возможных ошибок
    }
}
