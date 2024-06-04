// Импорт функции makeAutoObservable из библиотеки mobx
import {makeAutoObservable} from "mobx";
// Экспорт класса UserStore
export default class UserStore {
    // Конструктор класса
    constructor() {
        // Инициализация состояния аутентификации и пользователя
        this._isAuth = 0
        this._user = {}
        // Применение функции makeAutoObservable к текущему экземпляру класса
        makeAutoObservable(this)
    }
    // Метод для установки состояния аутентификации
    setIsAuth(int) {
        this._isAuth = int
    }
    // Метод для установки пользователя
    setUser(user){
        this._user = user
    }
    // Геттер для получения состояния аутентификации
    get isAuth() {
        return this._isAuth
    }
    // Геттер для получения пользователя
    get user() {
        return this._user
    }
}