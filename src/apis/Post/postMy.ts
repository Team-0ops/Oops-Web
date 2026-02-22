import { axiosInstance } from "../axios";
import { GetMyPostsResponse } from "../../types/post";

export const getMyPosts = async (): Promise<GetMyPostsResponse> => {
  const { data } = await axiosInstance.get("/posts/my");
  return data;
}