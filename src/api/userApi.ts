import { $authHost, $host } from ".";

class UserApi {
  deleteUser = async (
    id: number | string,
    signal: AbortSignal
  ): Promise<IUsers> => {
    const { data } = await $authHost.delete(`/user/${id}`, {
      signal,
    });
    return data;
  };
}

export default new UserApi();
