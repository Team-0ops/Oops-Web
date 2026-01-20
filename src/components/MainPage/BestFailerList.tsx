import { PostCard } from "../common/PostCard";
import BestFailer from "../../assets/icons/BestFailer.svg?react";

export const BestFailerList = () => {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <BestFailer/>
            <div className="h1">베스트 Failer</div>
            <div className="body2">가장 웁스스러운 글들이 모여있는 명예의 전당</div>
          </div>
          <button className="body3 flex hover:underline">
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
