import X from "../../../assets/icons/X.svg?react";


const Lesson = () => {
  return (
    <div
      className="
   w-[55.25rem] h-[41.3125rem]
   flex flex-col justify-center items-center 
   p-[1.88rem] rounded-[0.5rem]
   bg-[#fff] shadow-[0_0_9px_0_rgba(0,0,0,0.25)]"
    >
        {/* 제목, x */}
      <div className="flex justify-end gap-[20.38rem] mb-[1.88rem]">
        <span>교훈작성</span>
        <X />
      </div>
        {/* 제목 작성 */}
      <div className="flex flex-col justify-center gap-[1rem]">
        <span>교훈 제목</span>
        <input 
        className="
        rounded-[0.5rem] border-[0.06rem] border-[#e4e4e4]
        px-[1.25rem] py-[1rem]
        w-[45.0625rem] h-[3.5rem] bg-[#fafafa]
        placholder:text-[#6f6f6f]"  
        placeholder="면접 꿀팁"
        />
      </div>
      {/* 본문 작성 */}
      <div className="flex flex-col justify-center gap-[1rem]">
        <span>교훈 내용</span>
        <textarea 
        className="
        rounded-[0.5rem] border-[0.06rem] border-[#e4e4e4]
        px-[1.25rem] py-[1rem]
        w-[45.0625rem] h-[9rem] bg-[#fafafa]"
        />
      </div>
      {/* 교훈 태그 */}
    </div>
  );
};

export default Lesson;
