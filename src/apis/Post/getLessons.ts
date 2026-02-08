import { axiosInstance } from "../axios";
import { CommonResponse } from "../../types/Common";
import { GetLessonResult } from "../../types/post";

export const getLesson = async (
  postId: number
): Promise<CommonResponse<GetLessonResult>> => {
  const { data } = await axiosInstance.get<CommonResponse<GetLessonResult>>(
    `/posts/${postId}/lessons`
  );
  return data;
};
