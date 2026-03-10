import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCategoryFeed } from "../../hooks/post/useGetCategoryFeed";
import { CategoryListPostCard } from "./CategoryListPostCard.tsx";
import NextArrow from "../../assets/icons/NextArrow.svg?react";

type Props = {
  categoryId: number;
  categoryName: string;
};

export const CategoryPostList = ({ categoryId, categoryName }: Props) => {
  const navigate = useNavigate();
  const apiParams = useMemo(
    () => ({
      categoryId,
      situation: "OOPS" as const,
      page: 0,
      limit: 1,
      sort: "LATEST" as const,
    }),
    [categoryId]
  );
  const { data } = useGetCategoryFeed(apiParams);
  const firstPost = data?.result?.posts?.[0] ?? null;

  return (
    <div className="flex flex-col items-start gap-7.5 pb-6 flex-1 border-b border-[#D2D2D2]">
      <button
        type="button"
        onClick={() => navigate(`/category-feed/${categoryId}`)}
        className="flex w-full items-center justify-between hover:underline cursor-pointer"
      >
        <span className="body1 flex-1 text-left">{categoryName}</span>
        <NextArrow />
      </button>
      <CategoryListPostCard
        categoryName={categoryName}
        post={firstPost}
      />
    </div>
  );
};
