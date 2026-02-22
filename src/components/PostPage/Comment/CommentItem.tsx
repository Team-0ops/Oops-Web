import { useEffect, useState } from "react";
import type { Comment } from "../../../types/comment";
import { formatYYMD } from "../../../utils/date";

import LikeIcon from "../../../assets/icons/LikeIcon.svg?react";
import LikedIcon from "../../../assets/icons/LikedIcon.svg?react";
import ReportIcon from "../../../assets/icons/ReportIcon.svg?react";

import { useCommentCheers } from "../../../hooks/comment/useCommentCheers";
import CommentInput from "../section/CommentCardSection/CommentInput";

type Props = {
  comment: Comment;
  onOpenReport: (commentId: number) => void;

  onClickReply: (commentId: number) => void;
  isReplying: boolean;

  onSubmitReply: (parentId: number, content: string) => void;
  isSubmittingReply?: boolean;

  indent?: boolean;
};

function CommentItem({
  comment,
  onOpenReport,
  onClickReply,
  isReplying,
  onSubmitReply,
  isSubmittingReply,
  indent,
}: Props) {
  const { isCheered, likes, toggleCheer, isPending } = useCommentCheers({
    commentId: comment.commentId,
    initialLikes: comment.likes,
    initialCheered: comment.liked,
  });

  const [replyContent, setReplyContent] = useState("");

  // 답글 입력창 닫히면 내용 초기화(원하면 제거 가능)
  useEffect(() => {
    if (!isReplying) setReplyContent("");
  }, [isReplying]);

  const submitReply = () => {
    const content = replyContent.trim();
    if (!content) return;
    onSubmitReply(comment.commentId, content);
    setReplyContent("");
  };

  return (
    <li
      className={`py-[1.25rem] w-full ${indent ? "pl-[6.25rem] w-full" : ""}`}
    >
      <div className="flex justify-between gap-[3rem] items-start w-full">
        <div className="flex flex-col gap-[1rem] min-w-0 w-full">
          <div className="flex items-center gap-[0.62rem]">
          <div className="w-[2rem] h-[2rem] rounded-[3.13rem] overflow-hidden bg-[#d2d2d2]">
              {comment.imageUrl ? (
                <img
                  src={comment.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="text-[0.95rem]">{comment.userName}</div>
          </div>

          <div className="text-[0.95rem] leading-[1.5] break-words">
            {comment.content}
          </div>

          <div className="flex items-center gap-[1rem]">
            <div className="text-[0.85rem] text-[#6f6f6f]">
              {formatYYMD(comment.createdAt)}
            </div>
            {comment.parentId == null && (
              <button
                type="button"
                className="text-[0.85rem] text-[#6f6f6f] cursor-pointer"
                onClick={() => onClickReply(comment.commentId)}
              >
                답글쓰기
              </button>
            )}
          </div>
        </div>

        <div className="flex items-start gap-[1.25rem] text-[#999999] shrink-0">
          <button
            type="button"
            onClick={() => onOpenReport(comment.commentId)}
            className="cursor-pointer"
            aria-label="댓글 신고"
          >
            <ReportIcon />
          </button>

          <button
            type="button"
            onClick={toggleCheer}
            disabled={isPending}
            className="cursor-pointer flex flex-col justify-center items-center cursor-pointer"
          >
            {isCheered ? <LikedIcon /> : <LikeIcon />}
            <span className="text-[0.85rem]">{likes}</span>
          </button>
        </div>
      </div>

      {isReplying ? (
        <div className="mt-[1rem] w-full">
          <CommentInput
            value={replyContent}
            onChange={setReplyContent}
            onSubmit={submitReply}
            placeholder="답글을 작성해보세요."
            submitLabel="등록"
            disabled={!!isSubmittingReply}
            multiline
            buttonClassName="w-[6rem]"
            inputClassName="h-[3rem]"
          />
        </div>
      ) : null}

      <hr className="mt-[1.25rem] border-[#e4e4e4]" />
    </li>
  );
}

export default CommentItem;
