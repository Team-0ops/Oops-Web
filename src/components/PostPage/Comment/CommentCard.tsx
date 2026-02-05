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

  return (
    <div
      className="
        w-full h-[65rem]
        px-[6.75rem] py-[3.13rem]
        bg-[#F6F6F6]
        rounded-[0.5rem]"
    >
      <CommentHeader
        count={comments?.length ?? 0}
        sortType={sortType}
        onChangeSortType={setSortType}
        onSubmit={(content) => submitComment({ content, parentId: null })}
        isSubmitting={isSubmitting}
      />

      <CommentListSection
        comments={comments}
        onOpenReport={onOpenCommentReport}
      />
    </div>
  );
};

export default CommentCard;
