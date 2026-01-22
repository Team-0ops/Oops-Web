import { PostCard } from "../common/PostCard";
import BestFailer from "../../assets/icons/BestFailer.svg?react";

export const BestFailerList = () => {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-end pb-6 border-b border-b-[#D2D2D2]">
          <div className="flex flex-col gap-4">
            <BestFailer/>
            <div className="flex flex-col gap-2">
              <div className="h1">베스트 Failer</div>
              <div className="body2 text-[#464646]">가장 웁스스러운 글들이 모여있는 명예의 전당</div>
            </div>
          </div>
          <button className="body3 flex hover:underline text-[#6F6F6F]">
            전체 보기
          </button>
        </div>
        <div className="flex flex-col gap-7.5">
          <PostCard />
          <PostCard />
        </div>
      </div>
    </>
  );
};
