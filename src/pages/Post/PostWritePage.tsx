import { useState } from "react";

const PostWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="w-full flex flex-col gap-20">
      {/* 첫번째 섹션 글 제목, 본문 입력 */}
      <section className="w-full flex flex-col gap-10">
        <div>글 작성하기</div>
        <input
          placeholder="제목을 입력해주세요. (필수)"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="w-full flex items-center self-stretch bg-[#FAF6E9] placeholder-[#b3b3b3]
          xl:h-22.5 xl:p-7.5
          border-[3px] border-solid border-[#F5E9D6] rounded-xl"
        />
        <textarea
          placeholder="실패담의 내용을 입력해주세요. (필수)"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className="w-full resize-none flex items-start self-stretch bg-[#faf6e9] placeholder:-[#b3b3b3]
          xl:h-84 xl:p-7.5
          border-[3px] border-solid border-[#f5e9d6] rounded-xl"
        />
      </section>
      {/* 두번째 섹션 진행상황 선택 */}
      <section className="w-full flex felx-col gap-10">
        <div>진행상황 선택</div>
        <div className="flex flex-col gap-4 justify-start items-center">
          <button>웁스 중</button>
          <button>극복 중</button>
          <button>극복 완료</button>
        </div>
      </section>
    </div>
  );
};

export default PostWrite;
