import { axiosInstance } from "../axios";
import { CommonResponse } from "../../types/Common";

type CheerCommentParams = {
  commentId: number;
};

export const postCommentCheers = async ({
  commentId,
}: CheerCommentParams): Promise<CommonResponse<null>> => {
  const { data } = await axiosInstance.post(`comments/${commentId}/cheers`);
  console.log("댓글 응원하기 완료!", commentId);
  return data;
};
