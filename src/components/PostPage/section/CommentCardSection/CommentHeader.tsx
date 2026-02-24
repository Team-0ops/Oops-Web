import { useState } from "react";
import { CommentSortType } from "../../../../types/comment";
import CommentInput from "./CommentInput";

type CommentHeaderProps = {
  count: number;
  sortType: CommentSortType;
  onChangeSortType: (next: CommentSortType) => void;

  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
};

export default function CommentHeader({
  count,
  sortType,
  onChangeSortType,
  onSubmit,
  isSubmitting = false,
}: CommentHeaderProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const content = input.trim();
    if (!content) return;
    onSubmit(content);
    setInput("");
  };

  return (
    <section className="flex flex-col gap-[1.25rem]">
      <div className="flex justify-between items-center">
        <div>댓글 {count}개</div>

        <div className="flex gap-[1rem]">
          <button
            type="button"
            onClick={() => onChangeSortType("LIKE")}
            className={sortType === "LIKE" ? "text-black cursor-pointer" : "text-[#999999] cursor-pointer"}
          >
            좋아요순
          </button>
          <button
            type="button"
            onClick={() => onChangeSortType("RECENT")}
            className={sortType === "RECENT" ? "text-black cursor-pointer" : "text-[#999999] cursor-pointer"}
          >
            시간순
          </button>
        </div>
      </div>

      <CommentInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        placeholder="댓글을 입력하세요."
        submitLabel="작성"
        disabled={isSubmitting}
      />
    </section>
  );
}
