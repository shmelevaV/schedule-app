import { makeAutoObservable } from "mobx";

export default class StartDateStore { //дата начала семестра

    constructor() {
        this._startDate=new Date("2024-02-05");
        makeAutoObservable(this);
    }

    setstartDate(date) {
        this._startDate = date;
    }
    get startDate(){
        return this._startDate;
    }
}