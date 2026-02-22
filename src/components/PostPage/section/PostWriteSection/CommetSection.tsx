import React from "react";
import { wantedCommentType, wantedCommentTypeMap } from "../../../../types/Common";
import Check from "../../../../assets/icons/Check.svg?react";


type Props = {
  commentTypes: wantedCommentTypeMap;
  toggleCommentType: (type: wantedCommentType) => void;
};

const CommentSection = ({ commentTypes, toggleCommentType }: Props) => {
  return (
    <div className="flex gap-[5rem]">
      <div className="flex items-center whitespace-nowrap">댓글 종류 선택</div>

      <div className="w-full flex items-center gap-[3.12rem]">
        {/* 조언 */}
        <button
          type="button"
          onClick={() => toggleCommentType("ADVICE")}
          className="flex items-center gap-[1.12rem]"
        >
          <span
            className={`w-[2.5rem] h-[2.5rem] rounded-[0.33rem] border-[0.08rem] flex items-center justify-center transition-colors
            ${
              commentTypes.ADVICE
                ? "bg-[#b3e378] border-[#b3e378]"
                : "bg-[#e6e6e6] border-[#b3e378]"
            }`}
            aria-hidden
          >
            {commentTypes.ADVICE && (
              <Check />
            )}
          </span>
          <span>조언</span>
        </button>

        {/* 공감 */}
        <button
          type="button"
          onClick={() => toggleCommentType("EMPATHY")}
          className="flex items-center gap-[1.12rem]"
        >
          <span
            className={`w-[2.5rem] h-[2.5rem] rounded-[0.33rem] border-[0.08rem] flex items-center justify-center transition-colors
            ${
              commentTypes.EMPATHY
                ? "bg-[#b3e378] border-[#b3e378]"
                : "bg-[#e6e6e6] border-[#b3e378]"
            }`}
            aria-hidden
          >
            {commentTypes.EMPATHY && (
              <Check />
            )}
          </span>
          <span>공감</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(CommentSection);
