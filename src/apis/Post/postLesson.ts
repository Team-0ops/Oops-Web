import { axiosInstance } from "../axios";
import { CommonResponse } from "../../types/Common";

export type LessonPostParams = {
  postId: number;
  title: string;
  content: string;
  tags: string[];
};

export const postLesson = async ({
  postId,
  title,
  content,
  tags,
}: LessonPostParams): Promise<CommonResponse<null>> => {
  const { data } = await axiosInstance.post<CommonResponse<null>>(
    `/posts/${postId}/lessons`,
    {
      title,
      content,
      tags,
    }
  );
  return data;
};
