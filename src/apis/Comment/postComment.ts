import { axiosInstance } from "../axios";
import { CommonResponse } from "../../types/Common";

type CommentPostParams = {
  postId: number;
  content: string;
  parentId: number | null;
};

export const postComment = async ({
  postId,
  content,
  parentId,
}: CommentPostParams): Promise<CommonResponse<null>> => {
  const { data } = await axiosInstance.post<CommonResponse<null>>(
    `/posts/${postId}/comments`,
    {
      content,
      parentId,
    },
  );
  return data;
};
