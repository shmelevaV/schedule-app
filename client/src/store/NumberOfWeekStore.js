import { makeAutoObservable } from "mobx";

export default class NumberOfWeekStore {

    constructor() {
        this._numberOfWeek=1;
        makeAutoObservable(this);
    }

    setNumberOfWeek(nOfWeek) {
        this._numberOfWeek = nOfWeek;
    }
    get numberOfWeek(){
        return this._numberOfWeek;
    }
}