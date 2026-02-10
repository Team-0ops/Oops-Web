import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetLessonResult } from "../../types/post";
import { getLesson } from "../../apis/Post/getLessons";

export const useGetLesson = (postId: number) => {
  return useQuery<GetLessonResult | null>({
    queryKey: ["postLesson", postId],
    queryFn: async () => {
      try {
        const res = await getLesson(postId);
        return res.result; //{title, content, tagNames}
      } catch (e) {
        // 교훈이 없으면 404로 내려오는 케이스를 "없음(null)"로 처리
        if (axios.isAxiosError(e) && e.response?.status === 404) return null;
        throw e;
      }
    },
    enabled: typeof postId === "number",
    retry: false,
    staleTime: 1000 * 30,
  });
};
