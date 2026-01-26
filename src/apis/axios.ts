import axios, { InternalAxiosRequestConfig } from "axios";

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

      if (
          err.response?.status === 401 &&
          !originalRequest._retry
      ) {

        // refreshToken 요청 실패면 로그아웃
        if (originalRequest.url === "/auth/refresh") {
          //TODO : logout 로직 생성
          return Promise.reject(err);
        }

        originalRequest._retry = true;
        if (!refreshPromise) {
          refreshPromise = axiosInstance
              .post("/auth/refresh")
              .catch((error) => {
                //TODO : logOut 로직 작성
                return error;
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
