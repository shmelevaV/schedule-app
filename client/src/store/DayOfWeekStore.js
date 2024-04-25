import { makeAutoObservable } from "mobx";

export default class DayOfWeekStore {

    constructor() {
        this._dayOfWeek="Понедельник";
        makeAutoObservable(this);
    }

    setDayOfWeek(day) {
        this._dayOfWeek = day;
    }
    get dayOfWeek(){
        return this._dayOfWeek;
    }
}