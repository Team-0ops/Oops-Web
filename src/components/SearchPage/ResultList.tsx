import { PostCard } from "../common/PostCard";

export const ResultList = () => {
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-[1.5rem] gap-[1.25rem]">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </>
  );
};
