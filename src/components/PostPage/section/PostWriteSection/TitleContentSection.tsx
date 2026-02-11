import React from "react";
import DraftIcon from "../../../../assets/icons/Draft.svg?react";

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

const TitleContentSection = ({
  title,
  setTitle,
  content,
  setContent,
}: Props) => {
  return (
    <section className="select-none w-full flex flex-col">
      <div className="flex flex-col gap-[1.5rem]">
        <div>글 작성하기</div>
        <hr className="border-[#d2d2d2]"></hr>
      </div>
      {/* 임시저장 버튼 */}
      <div className="flex flex-col gap-[2.5rem] my-[2.5rem] justify-end items-end">
        <button className="cursor-pointer flex justify-center items-center">
          <DraftIcon className="h-[2.5rem]" aria-hidden />
        </button>
      </div>

      <div className="flex flex-col gap-[5rem]">
        <div className="flex flex-col gap-[1.25rem] justify-start items-start">
          <span>제목</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-[3.9375rem] flex items-center self-stretch bg-[#FAF6E9] px-[1.25rem] 
          border-[0.06rem] border-solid border-[#E4E4E4] rounded-[0.5rem]"
          />
        </div>

        <div className="flex flex-col gap-[1.25rem] justify-start items-start">
          <span>내용</span>
          <textarea
            maxLength={3000}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[20.9375rem] resize-none flex items-start self-stretch bg-[#faf6e9]
          border-[0.06rem] border-solid border-[#e4e4e4] rounded-[0.5rem] p-[1.25rem]"
          />
          <div className={`text-[#8f8f8f] ${content.length === 3000 ? "text-red-500" : ""}`}>
            {content.length}/3000
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TitleContentSection);
