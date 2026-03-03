import { useState, useMemo } from "react";
import { FeedPage } from "./FeedPage";
import BestFailer from "../assets/icons/BestFailer.svg?react";
import { useGetBestFeed } from "../hooks/post/useGetBestFeed";

type SortType = "BEST" | "LATEST" | "LIKE" | "VIEW" | "COMMENT";

const sortMap: Record<string, SortType> = {
  "베스트순": "BEST",
  "최신순": "LATEST",
  "좋아요순": "LIKE",
  "조회수순": "VIEW",
  "댓글순": "COMMENT",
};

export const BestFeedPage = () => {
  const [sortOrder, setSortOrder] = useState("베스트순");
  const [currentPage, setCurrentPage] = useState(0);

  const apiParams = useMemo(
    () => ({
      page: currentPage,
      limit: 10,
      sort: sortMap[sortOrder] || "BEST",
    }),
    [currentPage, sortOrder]
  );

  const { data, isLoading, error } = useGetBestFeed(apiParams);

  const posts = Array.isArray(data?.result?.posts) ? data.result.posts : [];
  const hasNextPage = !data?.result?.last;

  return (
    <>
      <div className="w-full flex flex-col gap-[40px]">
        {/* 제목 */}
        <div className="flex flex-col gap-[24px]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-[16px]">
              <BestFailer className="w-[60px] h-[60px]" />
              <div className="flex flex-col gap-[8px]">
                <h1 className="text-[34px] font-bold text-[#262627] leading-[100%]">
                  베스트 Failer
                </h1>
                <p className="text-[20px] font-normal text-[#464646] leading-[34px]">
                  가장 웁스스러운 글들이 모여있는 명예의 전당
                </p>
              </div>
            </div>
          </div>
          <hr className="border-t-2 border-[#D2D2D2]" />
        </div>

        {/* FeedPage 재사용 */}
        <FeedPage
          title=""
          showWriteButton={false}
          showTitleSection={false}
          showTabs={false}
          posts={posts}
          isLoading={isLoading}
          error={error}
          hasNextPage={hasNextPage}
          sortOrder={sortOrder}
          sortOptions={[
            { label: "베스트순", value: "베스트순" },
            { label: "최신순", value: "최신순" },
            { label: "좋아요순", value: "좋아요순" },
            { label: "조회수순", value: "조회수순" },
            { label: "댓글순", value: "댓글순" },
          ]}
          onSortChange={setSortOrder}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default BestFeedPage;
