import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || fallback;
  }

  return fallback;
};
