// Импорт функции makeAutoObservable из библиотеки mobx
import { makeAutoObservable } from "mobx";
// Экспорт класса NumberOfAudStore
export default class NumberOfAudStore {
    // Конструктор класса
    constructor() {
        // Инициализация номера аудитории значением "1-204"
        this._numberOfAud="1-204";
        // Применение функции makeAutoObservable к текущему экземпляру класса
        makeAutoObservable(this);
    }

    // Метод для установки номера аудитории
    setNumberOfAud(number) {
        // Установка нового значения номера аудитории
        this._numberOfAud = number;
    }
    // Геттер для получения номера аудитории
    get numberOfAud(){
        // Возвращение значения номера аудитории
        return this._numberOfAud;
    }
}
