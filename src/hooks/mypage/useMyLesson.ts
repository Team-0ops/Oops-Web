import { useQuery } from "@tanstack/react-query";
import { getMyLessons } from "../../apis/mypage";
import { myPageKeys } from "./queryKey";
import type { GetMyLessonsParams } from "../../types/MyPage";

export const useMyLessonsQuery = (params: GetMyLessonsParams) => {
  return useQuery({
    queryKey: myPageKeys.lessons(params),
    queryFn: () => getMyLessons(params),
    enabled: true,
  });
};