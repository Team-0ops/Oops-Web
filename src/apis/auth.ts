import {
  RequestSignInDto,
  ResponseSignInDto,
  ResponseMyInfoDto,
} from "../types/Auth.ts";
import { axiosInstance } from "./axios.ts";

export const postSignIn = async (body: RequestSignInDto): Promise<ResponseSignInDto> => {
  const { data } = await axiosInstance.post("/auth/login", body)
  console.log(data);
  return data;
};

export const getMyInfo = async () :Promise<ResponseMyInfoDto> => {
  const {data} = await axiosInstance.get("/my-page/profile");
  console.log(data);
  return data;
}