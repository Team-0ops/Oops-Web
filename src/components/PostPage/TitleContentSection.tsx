import React from "react";

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

const TitleContentSection = ({ title, setTitle, content, setContent }: Props) => {
  return (
    <section className="w-full flex flex-col gap-[2.5rem]">
      <div>글 작성하기</div>

      <input
        placeholder="제목을 입력해주세요. (필수)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full flex items-center self-stretch bg-[#FAF6E9] placeholder-[#b3b3b3]
          xl:h-22.5 xl:p-7.5
          border-[3px] border-solid border-[#F5E9D6] rounded-xl"
      />

      <textarea
        placeholder="실패담의 내용을 입력해주세요. (필수)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full resize-none flex items-start self-stretch bg-[#faf6e9] placeholder:-[#b3b3b3]
          xl:h-84 xl:p-7.5
          border-[3px] border-solid border-[#f5e9d6] rounded-xl"
      />
    </section>
  );
};

export default React.memo(TitleContentSection);
