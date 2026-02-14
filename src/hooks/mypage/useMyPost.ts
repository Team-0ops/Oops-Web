import { useQuery } from "@tanstack/react-query";
import { getMyPosts } from "../../apis/mypage";
import { myPageKeys } from "./queryKey";
import type { GetMyPostsParams } from "../../types/MyPage";

// 내 실패담 조회 쿼리훅
export const useMyPosts = (params: GetMyPostsParams) => {
  return useQuery({
    queryKey: myPageKeys.posts(params),
    queryFn: () => getMyPosts(params),
    enabled: true, // 필요하면 조건 걸어도 됨
  });
};