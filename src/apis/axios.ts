import axios, { InternalAxiosRequestConfig } from "axios";
import { postLogOut } from "./auth.ts";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<void> | null = null;

export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true, // 쿠키 사용을 위한 withCredentials 허용
});

//리프레시 토큰 사용을 위해 401에러가 났을 경우 interceptor 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest: CustomInternalAxiosRequestConfig = err.config;
    const status = err.response?.status;
    const url = originalRequest?.url ?? "";

    // vercel에서는 비밀번호가 틀려도 홈화면으로 이동하는 문제점발생
    // 로그인 실패의 401과 로그인 후 인증 만료 401의 구분이 필요
    // 인터셉터의 refresh 재시도는 이미 로그인된 사용자의 토큰 만료인 상황에서만 실행
    // 따라서 아래 url 경로를 따로 빼서 if문 조건문에 포함
    const isAuthRoute =
      url === "/auth/login" ||
      url === "/auth/join" ||
      url === "/auth/refresh" ||
      url === "/auth/reset-password";

    if (status === 401 && !originalRequest._retry && !isAuthRoute) {
      // refreshToken 요청 실패면 로그아웃
      if (url === "/auth/refresh") {
        await postLogOut();
        return Promise.reject(err);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = axiosInstance
          .post("/auth/refresh")
          .then(()=>{})
          .catch(async (refreshError) => {
            await postLogOut();
            return Promise.reject(refreshError);
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;
      return axiosInstance(originalRequest);
    }

    return Promise.reject(err);
  }
);