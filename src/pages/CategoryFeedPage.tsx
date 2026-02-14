import { useState, useMemo } from "react";
import { FeedPage } from "./FeedPage";
import { useParams } from "react-router-dom";
import { useGetCategoryFeed } from "../hooks/post/useGetCategoryFeed";
import { Categories } from "../types/Common";

type SituationType = "웁스 중" | "극복 중" | "극복 완료";
type SortType = "LATEST" | "LIKE" | "VIEW" | "COMMENT";

const situationMap: Record<SituationType, "OOPS" | "OVERCOMING" | "OVERCOME"> = {
  "웁스 중": "OOPS",
  "극복 중": "OVERCOMING",
  "극복 완료": "OVERCOME",
};

const sortMap: Record<string, SortType> = {
  "최신순": "LATEST",
  "좋아요순": "LIKE",
  "조회수순": "VIEW",
  "댓글순": "COMMENT",
};

export const CategoryFeedPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [activeTab, setActiveTab] = useState<SituationType>("웁스 중");
  const [sortOrder, setSortOrder] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(0);

  const categoryIdNum = categoryId ? parseInt(categoryId, 10) : 0;
  // 카테고리 ID는 1부터 시작, 배열은 0부터 시작하므로 -1
  const categoryName = categoryIdNum > 0 && categoryIdNum <= Categories.length
    ? Categories[categoryIdNum - 1]
    : "카테고리";

  // API 파라미터
  const apiParams = useMemo(
    () => {
      if (categoryIdNum <= 0) {
        return { categoryId: 0, situation: "OOPS" as const, page: 0, limit: 10, sort: "LATEST" as const };
      }
      return {
        categoryId: categoryIdNum,
        situation: situationMap[activeTab],
        page: currentPage,
        limit: 10,
        sort: sortMap[sortOrder] || "LATEST",
      };
    },
    [categoryIdNum, activeTab, currentPage, sortOrder]
  );

  // API 호출
  const { data, isLoading, error } = useGetCategoryFeed(apiParams);

  // 안전하게 배열로 변환
  const posts = Array.isArray(data?.result?.posts) ? data.result.posts : [];
  const hasNextPage = !data?.result?.last;

  return (
    <FeedPage
      title={categoryName}
      showWriteButton={true}
      posts={posts}
      isLoading={isLoading}
      error={error}
      hasNextPage={hasNextPage}
      activeTab={activeTab}
      sortOrder={sortOrder}
      currentPage={currentPage}
      onTabChange={setActiveTab}
      onSortChange={setSortOrder}
      onPageChange={setCurrentPage}
    />
  );
};

export default CategoryFeedPage;
