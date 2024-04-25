import { makeAutoObservable } from "mobx";

export default class ScheduleViewStore {

    constructor() {
        this._scheduleView="общий";
        makeAutoObservable(this);
    }

    setScheduleView(view) {
        this._scheduleView = view;
    }
    get scheduleView(){
        return this._scheduleView;
    }
}
