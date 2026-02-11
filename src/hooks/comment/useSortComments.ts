import { useQuery } from "@tanstack/react-query";
import { Comment } from "../../types/comment";
import { CommentSortType } from "../../types/comment";
import { getPostComments } from "../../apis/Comment/getPostComment";

export const COMMENT_QUERY_KEYS = {
  sortComments: (postId: number, sortType: CommentSortType) =>
    ["postComments", postId, sortType] as const,
};

export const useSortComments = (postId: number, sortType: CommentSortType) => {
  return useQuery<Comment[]>({
    queryKey: COMMENT_QUERY_KEYS.sortComments(postId, sortType),
    queryFn: () => getPostComments({ postId, sortType }),
    enabled: !!postId,
    staleTime: 0,
    retry: 1,
  });
};
