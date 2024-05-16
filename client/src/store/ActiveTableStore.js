import { makeAutoObservable } from "mobx";

export default class ActiveTableStore {

    constructor() {
        this._activeTable="Справочник заявок";
        makeAutoObservable(this);
    }

    setActiveTable(nameOfTable) {
        this._activeTable = nameOfTable;
    }
    get activeTable(){
        return this._activeTable;
    }
}