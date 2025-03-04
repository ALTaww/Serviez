import { makeAutoObservable } from "mobx";
import { IUsers } from "../types/database";

class UserStore {
  isAuth = false;
  data: IUsers | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setData(data: IUsers | null) {
    this.data = data;
  }
}

const userStore = new UserStore();
export default userStore;
