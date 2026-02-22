import { useQuery } from "@tanstack/react-query";
import { getMyLessons } from "../../apis/mypage";
import { myPageKeys } from "./queryKey";
import type { GetMyLessonsParams, GetMyLessonsResponse } from "../../types/MyPage";

export const useMyLessons = (params: GetMyLessonsParams) => {
  return useQuery({
    queryKey: myPageKeys.lessons(params),
    queryFn: () => getMyLessons(params),
    enabled: true,
    select: (res) => {
      const result = res.result;
      return result as GetMyLessonsResponse[];
    }
  });
};