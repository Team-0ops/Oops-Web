import { MainBanner } from "./MainBanner";

export const Banner = () => {
  return (
    <div className="w-full flex flex-col gap-7.5">
      {/* 메인 배너 */}
      <MainBanner />

      {/* 하단 버튼 */}
      <div className="flex justify-between gap-6">
        <div className="flex-1 h-47 border border-[#E4E4E4] bg-[#F6F6F6] rounded-[1.25rem] justify-center items-center">
            <div>

            </div>
        </div>
        <div className="flex-1 h-47 border border-[#E4E4E4] bg-[#F6F6F6] rounded-[1.25rem] justify-center items-center">
            <div>

            </div>
        </div>
        <div className="flex-1 h-47 border border-[#E4E4E4] bg-[#F6F6F6] rounded-[1.25rem] justify-center items-center">
            <div>

            </div>
        </div>
      </div>
    </div>
  );
};
