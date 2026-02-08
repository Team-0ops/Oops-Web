import {
  RequestSignInDto,
  ResponseSignInDto,
  ResponseMyInfoDto,
} from "../types/Auth.ts";
import { axiosInstance } from "./axios.ts";

export const postLogIn = async (body: RequestSignInDto): Promise<ResponseSignInDto> => {
  const { data } = await axiosInstance.post("/auth/login", body)
  return data;
};

export const postLogOut = async ():Promise<void> => {
  await axiosInstance.post("/auth/logout", null)
};

export const getMyInfo = async () :Promise<ResponseMyInfoDto> => {
  const {data} = await axiosInstance.get("/my-page/profile");

  return data;
}

// 인증번호 발송 API
// export const sendVerificationCode = async (email: string): Promise<void> => {
//   TODO: 인증번호 발송 API 구현
// };

// 인증번호 확인 API
// export const verifyCode = async (email: string, code: string): Promise<boolean> => {
  // TODO: 인증번호 확인 API 구현
  // return true; // true 또는 false 반환
// };