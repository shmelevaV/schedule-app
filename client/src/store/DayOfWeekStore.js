// Импорт функции makeAutoObservable из библиотеки mobx
import { makeAutoObservable } from "mobx";
// Экспорт класса DayOfWeekStore
export default class DayOfWeekStore {

    // Конструктор класса
    constructor() {
        // Инициализация дня недели значением "Понедельник"
        this._dayOfWeek="Понедельник";
        // Применение функции makeAutoObservable к текущему экземпляру класса
        makeAutoObservable(this);
    }

    // Метод для установки дня недели
    setDayOfWeek(day) {
        // Установка нового значения дня недели
        this._dayOfWeek = day;
    }
    // Геттер для получения дня недели
    get dayOfWeek(){
        // Возвращение значения дня недели
        return this._dayOfWeek;
    }
}