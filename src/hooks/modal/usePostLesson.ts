import { useMutation } from "@tanstack/react-query";
import { postLesson, type LessonPostParams } from "../../apis/Post/postLesson";

export const usePostLesson = () => {
  return useMutation({
    mutationFn: (params: LessonPostParams) => postLesson(params),
  });
};
