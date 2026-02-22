import { axiosInstance } from "./axios";
import type { LuckyCard } from "../types/lucky";

interface LuckyDrawResponse {
  result: LuckyCard;
}

interface UserProfileResponse {
  result: {
    point: number;
  };
}

export const requestLuckyDraw = async (): Promise<LuckyDrawResponse> => {
  const { data } = await axiosInstance.post("/lucky-draw");
  return data;
};

export const getUserProfile = async (): Promise<UserProfileResponse> => {
  const { data } = await axiosInstance.get("/my-page/profile");
  return data;
};
