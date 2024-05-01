import { makeAutoObservable } from "mobx";

export default class NumberOfAudStore {

    constructor() {
        this._numberOfAud="1-204";
        makeAutoObservable(this);
    }

    setNumberOfAud(number) {
        this._numberOfAud = number;
    }
    get numberOfAud(){
        return this._numberOfAud;
    }
}