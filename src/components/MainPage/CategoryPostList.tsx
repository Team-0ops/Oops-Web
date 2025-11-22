import { PostCard } from "../common/PostCard";
import { ToSeeButton } from "./ToSeeButton";
import Circle from "../../assets/icons/Circle.svg?react";

export const CategoryPostList = () => {
  return (
    <>
      <div className="flex flex-col gap-[1.25rem]">
        <div className="flex w-full items-center">
          <Circle className="flex-shrink-0 pr-[0.75rem]" />
          <span className="body1 flex-1">카테고리 이름</span>
          <div className="flex-shrink-0">
            <ToSeeButton />
          </div>
        </div>
        {/* TODO: 600화면 일 경우 postcard 1개만 렌더링 되도록 (context API 사용?)*/}
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-[1.5rem] gap-[1.25rem]">
          <PostCard />
          <PostCard />
        </div>
      </div>
    </>
  );
};
