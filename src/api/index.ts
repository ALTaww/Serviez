import axios, { AxiosInstance } from "axios";
import authApi from "./authApi";
import { handleError } from "../utils/handleError";
import userApi from "./userApi";
import serviceApi from "./serviceApi";
import serviceVariantApi from "./serviceVariantApi";
import bookingApi from "./bookingApi";
import workingHoursApi from "./workingHoursApi";

let retryCount = 0;
const createAxiosInstance = (baseURL = "", withAuth = true): AxiosInstance => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const instance = axios.create({
    baseURL: apiUrl + "/api" + baseURL,
  });

  // Перехватчик запросов
  instance.interceptors.request.use(
    (config) => {
      if (config.signal instanceof AbortSignal) {
        const cancelToken = axios.CancelToken.source();
        config.signal.addEventListener("abort", () => {
          cancelToken.cancel("Request was aborted");
        });
        config.cancelToken = cancelToken.token;
      }

      if (withAuth) {
        config.withCredentials = true;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use((response) => {
    console.log(response.config.url, response.data);
    return response;
  });

  // Перехватчик ответов
  if (withAuth) {
    instance.interceptors.response.use(
      (response) => response, // Успешный ответ
      async (error) => {
        const originalRequest = error.config;

        // Проверяем, нужно ли обновить токены
        if (
          error.response &&
          error.response.status === 401 &&
          originalRequest &&
          !retryCount
        ) {
          retryCount = 1; // Устанавливаем флаг, чтобы избежать рекурсии

          try {
            await authApi.refreshTokens(); // Метод для обновления токенов
            return instance.request(originalRequest); // Повторяем запрос
          } catch (error) {
            const err = handleError(error);

            throw err;
          } finally {
            retryCount = 0; // Сбрасываем счетчик
          }
        }

        throw error; // Пробрасываем ошибку, если не удалось обработать
      }
    );
  }

  return instance;
};

const $authHost = createAxiosInstance("/auth", true);
const $userHost = createAxiosInstance("/users", true);
const $serviceHost = createAxiosInstance("/services", true);
const $serviceVariantHost = createAxiosInstance("/services/variants", true);
const $workingHoursHost = createAxiosInstance("/services/working-hours", true);
const $bookingHost = createAxiosInstance("/bookings", true);

export {
  $authHost,
  $userHost,
  $serviceHost,
  $serviceVariantHost,
  $workingHoursHost,
  $bookingHost,
};
export {
  authApi,
  userApi,
  serviceApi,
  serviceVariantApi,
  bookingApi,
  workingHoursApi,
};
