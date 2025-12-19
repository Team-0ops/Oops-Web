import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true, // 쿠키 사용을 위한 withCredentials 허용
});

