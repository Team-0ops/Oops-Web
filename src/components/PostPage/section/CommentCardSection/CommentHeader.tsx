import { useState } from "react";
import { CommentSortType } from "../../../../types/comment";

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

        {/* 정렬: 기능은 나중에, UI만 */}
        <div className="flex gap-[1rem]">
          <button
            type="button"
            onClick={() => onChangeSortType("LIKE")}
            className={sortType === "LIKE" ? "text-black" : "text-[#999999]"}
          >
            좋아요순
          </button>
          <button
            type="button"
            onClick={() => onChangeSortType("RECENT")}
            className={sortType === "RECENT" ? "text-black" : "text-[#999999]"}
          >
            시간순
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-[1.25rem] items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="
            w-full h-[3.125rem]
            rounded-[0.5rem] border-[0.06rem] border-[#d2d2d2]
            bg-[#fff]
            px-[1.19rem] py-[1rem]
            placeholder:text-[#464646]"
          placeholder="댓글을 입력하세요."
          disabled={isSubmitting}
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || input.trim().length === 0}
          className="
            flex justify-center items-center
            w-[8.375rem] h-[3.125rem]
            rounded-[0.5rem]
            bg-[#b3e378]
            disabled:opacity-50"
        >
          작성
        </button>
      </div>
    </section>
  );
}
