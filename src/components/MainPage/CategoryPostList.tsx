import {CategoryListPostCard} from "./CategoryListPostCard.tsx";
import NextArrow from "../../assets/icons/NextArrow.svg?react";

export const CategoryPostList = () => {
  return (
    <>
      <div className="flex flex-col items-start gap-7.5 pb-6 flex-1 border-b border-[#D2D2D2]">
        <div className="flex w-full items-center justify-between">
          <span className="body1 flex-1">카테고리 이름</span>
          <NextArrow />
        </div>
        <CategoryListPostCard/>
      </div>
    </>
  );
};
