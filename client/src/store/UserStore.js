import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = 0
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(int) {
        this._isAuth = int
    }
    setUser(user){
        this._user = user
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}