import {
  RequestSignInDto,
  ResponseSignInDto,
  ResponseMyInfoDto, RequestSendVerifyEmailDto, ResponseSendVerificationEmailDto, RequestVerifyCodeDto,
  ResponseVerifyCodeDto, RequestSetNewPassword,
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

export const postSendEmailVarify = async (body: RequestSendVerifyEmailDto):Promise<ResponseSendVerificationEmailDto> => {
  const {data} = await axiosInstance.post("/auth/email/send", body)
  return data;
}

export const postVerifyCode = async (body: RequestVerifyCodeDto):Promise<ResponseVerifyCodeDto> => {
  const {data} = await axiosInstance.post("/auth/email/verify", body)
  return data;
}

export const postNewPassword = async (body: RequestSetNewPassword ):Promise<{data: string}> => {
  const {data} = await axiosInstance.post("/auth/reset-password", body)
  return data;
}
