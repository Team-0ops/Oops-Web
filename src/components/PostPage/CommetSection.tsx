import React from "react";
import { wantedCommentType, wantedCommentTypeMap } from "../../types/Common";

type Props = {
  commentTypes: wantedCommentTypeMap;
  toggleCommentType: (type: wantedCommentType) => void;
};

const CommentSection = ({ commentTypes, toggleCommentType }: Props) => {
  return (
    <div className="flex flex-col gap-[2.5rem]">
      <a className="flex items-center self-stretch xl:w-[16rem]">댓글 종류 선택</a>

      <div className="w-full flex items-center gap-[3.12rem]">
        {/* 조언 */}
        <button
          type="button"
          onClick={() => toggleCommentType("ADVICE")}
          className="flex items-center gap-4"
        >
          <span
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors
            ${
              commentTypes.ADVICE
                ? "bg-[#b3e378] border-[#b3e378]"
                : "bg-[#e6e6e6] border-[#e6e6e6]"
            }`}
            aria-hidden
          >
            {commentTypes.ADVICE && (
              <span className="text-2xl font-bold leading-none">✓</span>
            )}
          </span>
          <span>조언</span>
        </button>

        {/* 공감 */}
        <button
          type="button"
          onClick={() => toggleCommentType("EMPATHY")}
          className="flex items-center gap-4"
        >
          <span
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors
            ${
              commentTypes.EMPATHY
                ? "bg-[#b3e378] border-[#b3e378]"
                : "bg-[#e6e6e6] border-[#e6e6e6]"
            }`}
            aria-hidden
          >
            {commentTypes.EMPATHY && (
              <span className="text-2xl font-bold leading-none">✓</span>
            )}
          </span>
          <span className="text-[1.125rem]">공감</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(CommentSection);
