import { MainBanner } from "./MainBanner";

export const Banner = () => {
  return (
    <div className="w-full flex xl:h-[37.8125rem] h-[16.625rem]">
      {/* 메인 배너 */}
      <MainBanner />

      {/* gap 대신 비율 아이템 */}
      <div className="xl:flex-[24] flex-[6]"></div>

      {/* 오른쪽 박스 */}
      {/* TODO: 버튼 컴포넌트 분리하기, ICON 넣기 */}
      <div className="flex flex-col justify-between text-white flex-[58] xl:flex-[261] gap-[0.81rem] xl:gap-[2.06rem]">
        <div className="flex-1 bg-[#262626] rounded-[0.75rem]">실패위키</div>
        <div className="flex-1 bg-[#262626] rounded-[0.75rem]">
          랜덤 주제 피드
        </div>
        <div className="flex-1 bg-[#262626] rounded-[0.75rem]">
          행운 부적 추첨
        </div>
      </div>
    </div>
  );
};
