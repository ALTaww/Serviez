import { $userHost } from ".";
import { IUser } from "../types/database";

class UserApi {
  getUsers = async (signal: AbortSignal): Promise<IUser[]> => {
    const { data } = await $userHost.get(`/`, {
      signal,
    });
    return data;
  };

  getUser = async (id: string, signal: AbortSignal): Promise<IUser[]> => {
    const { data } = await $userHost.get(`/${id}`, {
      signal,
    });
    return data;
  };

  changeEmail = async (
    newEmail: string,
    signal: AbortSignal
  ): Promise<IUser[]> => {
    const { data } = await $userHost.patch(
      `/email`,
      { newEmail },
      {
        signal,
      }
    );
    return data;
  };

  changePassword = async (
    oldPassword: string,
    newPassword: string,
    signal: AbortSignal
  ): Promise<IUser[]> => {
    const { data } = await $userHost.patch(
      `/password`,
      { oldPassword, newPassword },
      {
        signal,
      }
    );
    return data;
  };

  changeRole = async (role: string, signal: AbortSignal): Promise<IUser[]> => {
    const { data } = await $userHost.patch(
      `/role`,
      { role },
      {
        signal,
      }
    );
    return data;
  };
}

export default new UserApi();
