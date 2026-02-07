import { axiosInstance } from "../axios";
import type { ReportResponse } from "../../types/post";

type ReportPostParams = {
  postId: number;
  content: string;
};

export const reportPost = async ({
  postId,
  content,
}: ReportPostParams): Promise<ReportResponse> => {
  const { data } = await axiosInstance.post(`posts/${postId}/reports`, {
    content,
  });
  return data;
};
