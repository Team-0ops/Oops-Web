
import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../apis/Comment/postComment";

type UsePostCommentArgs = {
  postId: number;
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
};

type SubmitArgs = {
  content: string;
  parentId?: number | null;
};

export const usePostComment = ({ postId, onSuccess, onError }: UsePostCommentArgs) => {
  const mutation = useMutation({
    mutationFn: ({ content, parentId = null }: SubmitArgs) =>
      postComment({ postId, content, parentId }),
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (e) => {
      onError?.(e);
    },
  });

  return {
    submitComment: mutation.mutate,
    submitCommentAsync: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};
