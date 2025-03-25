import { AxiosError, isAxiosError } from "axios";

export function handleError(error: unknown): Error | AxiosError | DOMException {
  // Обработка разных типов ошибок
  if (error instanceof DOMException && error.name === "AbortError") {
    console.log("Запрос был отменен");
    return error;
  }

  if (isAxiosError(error)) {
    const message = error.response?.data?.message || "Ошибка сервера";
    console.error("Error: ", message);
    return error;
  } else {
    console.error("Неизвестная ошибка:", error);
  }
  if (error instanceof Error) {
    return error;
  }
  return new Error(String(error)); // Приводим к Error, если тип неизвестен
}
