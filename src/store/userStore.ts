import { makeAutoObservable } from "mobx";
import { IUser } from "../types/database";

class UserStore {
  isAuth = false;
  data: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setData(data: IUser | null) {
    this.data = data;
  }
}

const userStore = new UserStore();
export default userStore;
