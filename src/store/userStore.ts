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

  login(data: IUser) {
    this.data = data;
    this.isAuth = true;
  }

  logout() {
    this.data = null;
    this.isAuth = false;
  }
}

const userStore = new UserStore();
export default userStore;
