// Импорт функции makeAutoObservable из библиотеки mobx
import { makeAutoObservable } from "mobx";

// Экспорт класса StartDateStore, который отвечает за дату начала семестра
export default class StartDateStore {

    // Конструктор класса
    constructor() {
        // Инициализация даты начала семестра значением "2024-09-02"
        this._startDate=new Date("2024-09-02");
        // Применение функции makeAutoObservable к текущему экземпляру класса
        makeAutoObservable(this);
    }

    // Метод для установки даты начала семестра
    setstartDate(date) {
        // Установка нового значения даты начала семестра
        this._startDate = date;
    }
    // Геттер для получения даты начала семестра
    get startDate(){
        // Возвращение значения даты начала семестра
        return this._startDate;
    }
}
