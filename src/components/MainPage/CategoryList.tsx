import { CategoryPostList } from "./CategoryPostList";

export const CategorytList = () => {
  return (
    <>
      <div className="flex flex-col gap-[1.25rem]">
        <span className="h2 text-[#262626]">카테고리 목록</span>

        <CategoryPostList />
        <CategoryPostList />
        <CategoryPostList />
        <CategoryPostList />
      </div>
    </>
  );
};
