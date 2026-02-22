import { MainBanner } from "./MainBanner";
import FailWiki from "../../assets/icons/FailWiki.svg?react";
import RandomFeed from "../../assets/icons/RandomFeed.svg?react";
import RandomAmulet from "../../assets/icons/RandomAmulet.svg?react";
import { useNavigate } from "react-router-dom";

export const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-7.5">
      {/* 메인 배너 */}
      <MainBanner />

      {/* 하단 버튼 */}
      <div className="flex justify-between gap-6">
        <div className="flex flex-col justify-center items-center flex-1 h-47 gap-2.5 px-7 py-6 border border-[#E4E4E4] bg-[#F6F6F6] rounded-[1.25rem]">
            <FailWiki/>
            <span className="h5 ">실패위키</span>
        </div>
        <div 
          className="flex flex-col justify-center items-center flex-1 h-47 gap-2.5 px-7 py-6 border border-[#E4E4E4] bg-[#F6F6F6] rounded-[1.25rem] cursor-pointer"
          onClick={() => navigate("/random-feed")}
        >
            <RandomFeed/>
            <span className="h5 ">랜덤 주제 피드</span>
        </div>
        <div 
          className="flex flex-col justify-center items-center flex-1 h-47 gap-2.5 px-7 py-6 border border-[#E4E4E4] bg-[#F6F6F6] rounded-[1.25rem] cursor-pointer"
          onClick={() => navigate("/lucky-draw")}
        >
            <RandomAmulet/>
            <span className="h5 ">행운 부적 추첨</span>
        </div>
      </div>
    </div>
  );
};
