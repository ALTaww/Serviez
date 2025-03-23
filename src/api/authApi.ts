import { $authHost } from ".";

class AuthApi {
  refreshTokens = async (signal?: AbortSignal) => {
    const { data } = await $authHost.post("/refresh", {}, { signal });
    return data;
  };

  login = async (email: string, password: string, signal: AbortSignal) => {
    const { data } = await $authHost.post(
      "/login",
      { email, password },
      { signal }
    );
    return data;
  };

  logout = async (signal: AbortSignal) => {
    const { data } = await $authHost.post("/logout", {}, { signal });
    return data;
  };

  register = async (
    {
      name,
      surname,
      email,
      password,
    }: { name: string; surname: string; email: string; password: string },
    signal: AbortSignal
  ) => {
    const { data } = await $authHost.post(
      "/register",
      { name, surname, email, password },
      { signal }
    );
    return data;
  };

  sendCode = async (email: string, signal: AbortSignal) => {
    const { data } = await $authHost.post("/send-code", { email }, { signal });
    return data;
  };

  verifyCode = async (email: string, code: string, signal: AbortSignal) => {
    const { data } = await $authHost.post(
      "/verify-code",
      { email, code },
      { signal }
    );
    return data;
  };
}

export default new AuthApi();
