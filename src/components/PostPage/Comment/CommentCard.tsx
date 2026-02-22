import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { usePostComment } from "../../../hooks/comment/usePostComment";
import { CommentSortType } from "../../../types/comment";
import {
  useSortComments,
} from "../../../hooks/comment/useSortComments";

import CommentHeader from "../section/CommentCardSection/CommentHeader";
import CommentListSection from "../section/CommentCardSection/CommentListSection";

type CommentCardProps = {
  postId: number;
  onOpenCommentReport: (commentId: number) => void;
};

const CommentCard = ({ postId, onOpenCommentReport }: CommentCardProps) => {
  const qc = useQueryClient();

  const [sortType, setSortType] = useState<CommentSortType>("RECENT");
  const [replyingToId, setReplyingToId] = useState<number | null>(null);

  const { data: comments = [] } = useSortComments(postId, sortType);

  const { submitComment, isSubmitting } = usePostComment({
    postId,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["postComments", postId],
        exact: false,
      });
    },
  });

  const toggleReplying = (commentId: number) => {
    setReplyingToId((prev) => (prev === commentId ? null : commentId));
  };

  // 그냥 댓글달기
  const submitRoot = (content: string) => {
    submitComment({ content, parentId: null });
  };

  // 답글달기
  const submitReply = (parentId: number, content: string) => {
    submitComment({ content, parentId });
    setReplyingToId(null);
  };

  return (
    <div
      className="
        w-full 
        px-[6.75rem] py-[3.13rem]
        bg-[#F6F6F6]
        rounded-[0.5rem]"
    >
      <CommentHeader
        count={comments?.length ?? 0}
        sortType={sortType}
        onChangeSortType={setSortType}
        onSubmit={submitRoot}
        isSubmitting={isSubmitting}
      />

      <CommentListSection
        comments={comments}
        onOpenReport={onOpenCommentReport}
        replyingToId={replyingToId}
        onClickReply={toggleReplying}
        onSubmitReply={submitReply}
        isSubmittingReply={isSubmitting}
      />
    </div>
  );
};

export default CommentCard;
