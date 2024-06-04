// Импорт функции makeAutoObservable из библиотеки mobx
import { makeAutoObservable } from "mobx";
// Экспорт класса NumberOfWeekStore
export default class NumberOfWeekStore {
    // Конструктор класса
    constructor() {
        // Инициализация номера недели значением 1
        this._numberOfWeek=1;
        // Применение функции makeAutoObservable к текущему экземпляру класса
        makeAutoObservable(this);
    }

    // Метод для установки номера недели
    setNumberOfWeek(nOfWeek) {
        // Установка нового значения номера недели
        this._numberOfWeek = nOfWeek;
    }
    // Геттер для получения номера недели
    get numberOfWeek(){
        // Возвращение значения номера недели
        return this._numberOfWeek;
    }
}