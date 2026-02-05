import { axiosInstance } from "../axios";
import { ReportResponse } from "../../types/post";

type CheerPostParams = {
  postId: number;
};

export const postCheers = async ({
  postId,
}: CheerPostParams): Promise<ReportResponse> => {
  const { data } = await axiosInstance.post(`posts/${postId}/cheers`);
  console.log("응원하기 완료!", postId);
  return data;
};
