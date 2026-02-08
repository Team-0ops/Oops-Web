import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postCommentCheers } from "../../apis/Comment/postCommentCheers";

type UsePostCommentCheersArgs = {
  commentId: number;
  initialLikes: number;
  initialCheered?: boolean; // 서버가 내려주면 넣어주기
};

export const useCommentCheers = ({
  commentId,
  initialLikes,
  initialCheered = false,
}: UsePostCommentCheersArgs) => {
  const [isCheered, setIsCheered] = useState<boolean>(initialCheered);
  const [likes, setLikes] = useState<number>(initialLikes);

  const mutation = useMutation({
    mutationFn: () => postCommentCheers({ commentId }),

    onMutate: async () => {
      // optimistic ui
      setIsCheered((prev) => !prev);
      setLikes((prev) => (isCheered ? prev - 1 : prev + 1));
    },

    onError: () => {
      // rollback
      setIsCheered((prev) => !prev);
      setLikes((prev) => (isCheered ? prev + 1 : prev - 1));
    },
  });

  const toggleCheer = () => {
    if (mutation.isPending) return;
    mutation.mutate();
  };

  return useMemo(
    () => ({
      isCheered,
      likes,
      toggleCheer,
      isPending: mutation.isPending,
    }),
    [isCheered, likes, mutation.isPending]
  );
};
