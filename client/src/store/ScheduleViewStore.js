// Импорт функции makeAutoObservable из библиотеки mobx
import { makeAutoObservable } from "mobx";
// Экспорт класса ScheduleViewStore
export default class ScheduleViewStore {

    // Конструктор класса
    constructor() {
        // Инициализация представления расписания значением "общий"
        this._scheduleView="общий";
        // Применение функции makeAutoObservable к текущему экземпляру класса
        makeAutoObservable(this);
    }
    // Метод для установки представления расписания
    setScheduleView(view) {
        // Установка нового значения представления расписания
        this._scheduleView = view;
    }
    // Геттер для получения представления расписания
    get scheduleView(){
        // Возвращение значения представления расписания
        return this._scheduleView;
    }
}