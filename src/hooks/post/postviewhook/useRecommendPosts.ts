import { useQuery } from "@tanstack/react-query";
import { getRecommend } from "../../../apis/Post/getRecommend";

export const RECOMMEND_QUERY_KEYS = {
  recommend: (postId: number) => ["recommendPosts", postId] as const,
};

export const useRecommendPosts = (postId: number) => {
  return useQuery({
    queryKey: RECOMMEND_QUERY_KEYS.recommend(postId),
    queryFn: () => getRecommend(postId),
    enabled: Number.isFinite(postId) && postId > 0,
  });
};
