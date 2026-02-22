import type { AxiosError } from "axios";

export interface CustomAxiosError extends AxiosError {
  response?: AxiosError["response"] & {
    data: {
      message?: string;
    };
  };
}
