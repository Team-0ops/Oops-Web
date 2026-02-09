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

