export const LuckyDrawPage = () => {
  const handleDraw = () => {
    // TODO: 행운 부적 추첨 로직 구현
    console.log("행운 부적 추첨하기");
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-[60px] py-[60px]">
        {/* 제목 섹션 */}
        <div className="flex flex-col gap-[24px] items-center">
          <h1 className="text-[34px] font-bold text-[#262627] text-center leading-[100%]">
            행운 부적 추첨
          </h1>
          <p className="text-[20px] font-normal text-[#464646] text-center leading-[34px]">
            나에게 행운을 가져다 줄 행운 부적을 뽑아보세요!
          </p>
        </div>

        {/* 행운 부적 그리드 및 버튼 */}
        <div className="flex flex-col gap-[60px] items-center">
          {/* 3x3 그리드 */}
          <div className="grid grid-cols-3 gap-y-[20px] gap-x-[40px]">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className={`bg-[#B3E378] ${
                  index === 3 || index === 4 || index === 5
                    ? "h-[147px]"
                    : "h-[146px]"
                } w-[104px] rounded-[4px]`}
              />
            ))}
          </div>

          {/* 추첨하기 버튼 */}
          <button
            onClick={handleDraw}
            className="bg-[#B3E378] h-[60px] px-[69px] py-[18px] rounded-[8px] flex items-center justify-center"
          >
            <span className="text-[20px] font-semibold text-[#262627] leading-[100%]">
              행운 부적 추첨하기
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default LuckyDrawPage;

