import { axiosInstance } from "../axios";
import { CommonResponse } from "../../types/Common";
import { PostDetailResponse } from "../../types/post";

export const getPostDetail = async (postId: number): Promise<PostDetailResponse> => {
  const res = await axiosInstance.get<CommonResponse<PostDetailResponse>>(
    `/posts/${postId}`
  );
  return res.data.result;
}