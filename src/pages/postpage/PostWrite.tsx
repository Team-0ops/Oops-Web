export const PostWrite = () => {
  return (
    <div className="px-[82px] pt-[60px] gap-20 rounded-[30px] bg-[#FDFDFD] flex flex-col justify-center">
      {/* 첫번째 섹션 글작성 ~ 글내용입력 */}
      <section className="flex flex-col gap-10">
        <div>글 작성하기</div>
        <input
          className="border-[3px] border-solid placeholder:text-[#B3B3B3] border-[#F5E9D6] p-[30px] rounded-[12px]"
          required
          placeholder="제목을 입력해주세요.(필수)"
        />
        <textarea
          className="bodrder-[3px] border-solid placeholder:text-[#B3B3B3] border-[#F5E9D6] p-[30px] rounded-[12px]"
          required
          placeholder="실패담의 내용을 입력해주세요.(필수)"
        />
      </section>
    </div>
  );
};
