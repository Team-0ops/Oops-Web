//TODO: PostList 컴포넌트 이름 수정 (공통으로 사용할건지, bestFailer에만 사용할건지)

import { PostCard } from "../common/PostCard";
import { ToSeeButton } from "./ToSeeButton";

export const PostList = () => {
  return (
    <>
      <div className="flex flex-col gap-[1.25rem] xl:gap-[2.5rem]">
        <div className="flex justify-between items-center">
          <div className="h2">000 Failers</div>
          <ToSeeButton />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-[1.5rem] gap-[1.25rem]">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </>
  );
};
