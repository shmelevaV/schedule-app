import { makeAutoObservable } from "mobx";

export default class NumberOfWeekStore {

    constructor() {
        this._numberOfWeek=1;
        makeAutoObservable(this);
    }

    setNumberOfWeek(day) {
        this._numberOfWeek = day;
    }
    get numberOfWeek(){
        return this._numberOfWeek;
    }
}