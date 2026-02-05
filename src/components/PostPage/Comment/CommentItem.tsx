// src/components/PostPage/Comment/CommentItem.tsx
import type { Comment } from "../../../types/comment";
import { formatYYMD } from "../../../utils/date";

import LikeIcon from "../../../assets/icons/LikeIcon.svg?react";
import LikedIcon from "../../../assets/icons/LikedIcon.svg?react";
import ReportIcon from "../../../assets/icons/ReportIcon.svg?react";

import { useCommentCheers } from "../../../hooks/comment/useCommentCheers";

type Props = {
  comment: Comment;
  onOpenReport: (commentId: number) => void;
};

function CommentItem({ comment, onOpenReport }: Props) {
  const { isCheered, likes, toggleCheer, isPending } = useCommentCheers({
    commentId: comment.commentId,
    initialLikes: comment.likes,
    initialCheered: comment.liked, // 네 타입에 맞게
  });

  return (
    <li className="py-[1.25rem] w-full">
      <div className="flex justify-between gap-[3rem] items-start w-full">
        <div className="flex flex-col gap-[1rem] min-w-0 w-full">
          <div className="flex items-center gap-[0.62rem]">
            <div>이미지url</div>
            <div className="text-[0.95rem]">{comment.userName}</div>
          </div>

          <div className="text-[0.95rem] leading-[1.5] break-words">
            {comment.content}
          </div>

          <div className="flex items-center gap-[1rem]">
            <div className="text-[0.85rem] text-[#6f6f6f]">
              {formatYYMD(comment.createdAt)}
            </div>
            <button>답글쓰기</button>
          </div>
        </div>

        <div className="flex items-start gap-[1.25rem] text-[#999999] shrink-0">
          <button
            type="button"
            onClick={() => onOpenReport(comment.commentId)}
            aria-label="댓글 신고"
          >
            <ReportIcon />
          </button>

          <button
            type="button"
            onClick={toggleCheer}
            disabled={isPending}
            className="flex flex-col justify-center items-center"
          >
            {isCheered ? <LikedIcon /> : <LikeIcon />}
            <span className="text-[0.85rem]">{likes}</span>
          </button>
        </div>
      </div>

      <hr className="mt-[1.25rem] border-[#e4e4e4]" />
    </li>
  );
}

export default CommentItem;
