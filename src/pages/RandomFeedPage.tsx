import { useState, useMemo } from "react";
import { FeedPage } from "./FeedPage";
import { useGetRandomTopicFeed } from "../hooks/post/useGetRandomTopicFeed";
import DiceIcon from "../assets/icons/Vector.svg?react";

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

export const RandomFeedPage = () => {
  const [activeTab, setActiveTab] = useState<SituationType>("웁스 중");
  const [sortOrder, setSortOrder] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(0);

  // API 파라미터
  const apiParams = useMemo(
    () => ({
      situation: situationMap[activeTab],
      page: currentPage,
      limit: 10,
      sort: sortMap[sortOrder] || "LATEST",
    }),
    [activeTab, currentPage, sortOrder]
  );

  // API 호출
  const { data, isLoading, error } = useGetRandomTopicFeed(apiParams);

  // 안전하게 배열로 변환
  const posts = Array.isArray(data?.result?.posts) ? data.result.posts : [];
  const randomTopic = data?.result?.comment || "발표";
  const hasNextPage = !data?.result?.last;

  const icon = useMemo(
    () => <DiceIcon className="w-[40px] h-[40px]" />,
    []
  );

  return (
    <FeedPage
      title={`이번 주 랜덤 주제 : ${randomTopic}`}
      icon={icon}
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

export default RandomFeedPage;
