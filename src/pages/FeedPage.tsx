import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { RandomFeedPostCard } from "../components/RandomFeedPage/RandomFeedPostCard";
import Write from "../assets/icons/Write.svg?react";
import RightArrow from "../assets/icons/RightArrow.svg?react";
import NextArrow from "../assets/icons/NextArrow.svg?react";
import NextDoubleArrow from "../assets/icons/NextDoubleArrow.svg?react";
import PreviousArrow from "../assets/icons/PreviousArrow.svg?react";
import PreviousDoubleArrow from "../assets/icons/PreviousDoubleArrow.svg?react";

type SituationType = "웁스 중" | "극복 중" | "극복 완료";

const DEFAULT_SORT_OPTIONS = [
  { label: "최신순", value: "최신순" },
  { label: "조회수순", value: "조회수순" },
  { label: "좋아요순", value: "좋아요순" },
  { label: "댓글순", value: "댓글순" },
] as const;

interface FeedPageProps {
  title: string;
  icon?: React.ReactNode;
  showWriteButton?: boolean;
  showTitleSection?: boolean;
  showTabs?: boolean;
  posts?: any[];
  isLoading?: boolean;
  error?: Error | null;
  hasNextPage?: boolean;
  totalPages?: number;
  activeTab?: SituationType;
  sortOrder?: string;
  sortOptions?: Array<{ label: string; value: string }>;
  onTabChange?: (tab: SituationType) => void;
  onSortChange?: (sort: string) => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  preselectedCategoryId?: number;
  preselectedTopicName?: string;
}

export const FeedPage = ({
  title,
  icon,
  showWriteButton = true,
  showTitleSection = true,
  showTabs = true,
  posts = [],
  isLoading = false,
  error = null,
  hasNextPage = false,
  totalPages,
  activeTab: externalActiveTab,
  sortOrder: externalSortOrder,
  sortOptions: externalSortOptions,
  onTabChange,
  onSortChange,
  onPageChange,
  currentPage: externalCurrentPage,
  preselectedCategoryId,
  preselectedTopicName,
}: FeedPageProps) => {
  const navigate = useNavigate();
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  
  // 내부 상태
  const [internalActiveTab, setInternalActiveTab] = useState<SituationType>("웁스 중");
  const [internalSortOrder, setInternalSortOrder] = useState("최신순");
  const [internalCurrentPage, setInternalCurrentPage] = useState(0);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // 외부 제어 시 props 사용
  const activeTab = externalActiveTab ?? internalActiveTab;
  const sortOrder = externalSortOrder ?? internalSortOrder;
  const currentPage = externalCurrentPage ?? internalCurrentPage;

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };

    if (isSortDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortDropdownOpen]);

  const handleWriteClick = useCallback(() => {
    if (preselectedCategoryId) {
      navigate("/post", { state: { categoryId: preselectedCategoryId } });
    } else if (preselectedTopicName) {
      navigate("/post", { state: { topicName: preselectedTopicName } });
    } else {
      navigate("/post");
    }
  }, [navigate, preselectedCategoryId, preselectedTopicName]);

  const handleTabChange = useCallback(
    (tab: SituationType) => {
      if (onTabChange) {
        onTabChange(tab);
      } else {
        setInternalActiveTab(tab);
      }
      if (onPageChange) {
        onPageChange(0);
      } else {
        setInternalCurrentPage(0);
      }
    },
    [onTabChange, onPageChange]
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      if (onSortChange) {
        onSortChange(sort);
      } else {
        setInternalSortOrder(sort);
      }
      if (onPageChange) {
        onPageChange(0);
      } else {
        setInternalCurrentPage(0);
      }
      setIsSortDropdownOpen(false);
    },
    [onSortChange, onPageChange]
  );

  const sortOptions = externalSortOptions || DEFAULT_SORT_OPTIONS;

  const handlePageChange = useCallback(
    (page: number) => {
      if (onPageChange) {
        onPageChange(page);
      } else {
        setInternalCurrentPage(page);
      }
    },
    [onPageChange]
  );

  const pagination = useMemo(() => {
    const currentPage1 = currentPage + 1; // 1-based
    const knownTotal = typeof totalPages === "number" && totalPages > 0 ? totalPages : undefined;

    const blockStart = Math.floor((currentPage1 - 1) / 5) * 5 + 1;
    const blockEnd = knownTotal ? Math.min(blockStart + 4, knownTotal) : blockStart + 4;

    const pageNumbers: number[] = [];
    for (let p = blockStart; p <= blockEnd; p++) pageNumbers.push(p);

    const canFirst = currentPage1 > 1;
    const canPrev5 = currentPage1 > 1;
    const canNext5 = knownTotal ? currentPage1 < knownTotal : hasNextPage;
    const canLast = knownTotal ? currentPage1 < knownTotal : false;

    const goToPage1 = (page1: number) => {
      const clamped = knownTotal ? Math.max(1, Math.min(knownTotal, page1)) : Math.max(1, page1);
      handlePageChange(clamped - 1); // back to 0-based
    };

    return {
      currentPage1,
      knownTotal,
      pageNumbers,
      canFirst,
      canPrev5,
      canNext5,
      canLast,
      goFirst: () => goToPage1(1),
      goPrev5: () => goToPage1(currentPage1 - 5),
      goNext5: () => goToPage1(currentPage1 + 5),
      goLast: knownTotal ? () => goToPage1(knownTotal) : undefined,
      goToPage1,
    };
  }, [currentPage, totalPages, hasNextPage, handlePageChange]);

  return (
    <>
      <div className="w-full flex flex-col gap-[40px]">
        {/* 제목 */}
        {showTitleSection && (
          <div className="flex flex-col gap-[24px]">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-[16px]">
                {icon && <div className="w-[40px] h-[40px] flex items-center justify-center">{icon}</div>}
                <h1 className="text-[34px] font-bold text-[#262627] leading-[100%]">
                  {title}
                </h1>
              </div>
              {showWriteButton && (
                <button
                  onClick={handleWriteClick}
                  className="bg-[#E6F3D7] border border-[#B3E378] rounded-[8px] px-[14px] py-[10px] flex items-center gap-[10px]"
                >
                  <Write className="w-6 h-6" />
                  <span className="text-[18px] font-semibold text-[#262627]">
                    글 작성하기
                  </span>
                </button>
              )}
            </div>
            <hr className="border-t-2 border-[#D2D2D2]" />
          </div>
        )}

        {/* 탭·정렬 */}
        {(showTabs || onSortChange) && (
          <div className="flex items-start justify-between">
            {showTabs ? (
              <div className="flex gap-[30px] items-center">
                <button
                  onClick={() => handleTabChange("웁스 중")}
                  className={`h-[44px] px-[26px] py-[10px] rounded-[30px] text-[20px] font-semibold text-[#464646] transition-colors ${
                    activeTab === "웁스 중"
                      ? "bg-[#B3E378]"
                      : "bg-[#F6F6F6] border border-[#E4E4E4]"
                  }`}
                >
                  웁스 중
                </button>
                <button
                  onClick={() => handleTabChange("극복 중")}
                  className={`h-[44px] px-[26px] py-[10px] rounded-[30px] text-[20px] font-semibold text-[#464646] transition-colors ${
                    activeTab === "극복 중"
                      ? "bg-[#B3E378]"
                      : "bg-[#F6F6F6] border border-[#E4E4E4]"
                  }`}
                >
                  극복 중
                </button>
                <button
                  onClick={() => handleTabChange("극복 완료")}
                  className={`h-[44px] px-[26px] py-[10px] rounded-[30px] text-[20px] font-semibold text-[#464646] transition-colors ${
                    activeTab === "극복 완료"
                      ? "bg-[#B3E378]"
                      : "bg-[#F6F6F6] border border-[#E4E4E4]"
                  }`}
                >
                  극복 완료
                </button>
              </div>
            ) : (
              <div></div>
            )}
            {onSortChange && (
              <div className="relative sort-dropdown" ref={sortDropdownRef}>
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="bg-[#F6F6F6] border border-[#E4E4E4] rounded-[4px] h-[40px] px-[16px] py-[4px] flex items-center justify-between w-[113px] cursor-pointer"
                >
                  <span className="text-[14px] font-semibold text-[#464646] whitespace-nowrap">
                    {sortOrder}
                  </span>
                  <RightArrow className={`w-6 h-6 shrink-0 transition-transform ${isSortDropdownOpen ? '-rotate-90' : 'rotate-90'}`} />
                </button>
                
                {/* 드롭다운 */}
                {isSortDropdownOpen && (
                  <div className="absolute top-[50px] right-0 bg-[#F6F6F6] border border-[#E4E4E4] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.17)] py-[14px] px-[8px] min-w-[193px] z-50">
                    <div className="flex flex-col gap-0">
                      {sortOptions.map((option, index) => (
                        <div key={option.value}>
                          <button
                            onClick={() => handleSortChange(option.value)}
                            className={`w-full text-left px-[10px] py-[6px] text-[14px] font-semibold ${
                              sortOrder === option.value
                                ? "text-[#464646]"
                                : "text-[#8F8F8F]"
                            } hover:text-[#464646] transition-colors`}
                          >
                            {option.label}
                          </button>
                          {index < sortOptions.length - 1 && (
                            <hr className="border-t border-[#E4E4E4] my-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 리스트 */}
        <div className="flex flex-col gap-[30px]">
          {isLoading ? (
            <div className="text-center text-[#6F6F6F] py-[60px]">
              불러오는 중...
            </div>
          ) : error ? (
            <div className="text-center text-[#6F6F6F] py-[60px]">
              오류가 발생했습니다.
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center text-[#6F6F6F] py-[60px]">
              게시물이 없습니다.
            </div>
          ) : (
            posts.map((post) => (
              <RandomFeedPostCard
                key={post.postId}
                postId={post.postId}
                title={post.title}
                content={post.content}
                image={post.image}
                likes={post.likes}
                comments={post.comments}
                views={post.views}
                category={post.categoryOrTopicName || post.category}
                author={post.author}
                date={post.date}
              />
            ))
          )}
        </div>

        {/* 페이지네이션 */}
        {posts.length > 0 && (
          <div className="flex justify-center items-center gap-2 pt-[60px]">
            {/* 처음 */}
            <button
              onClick={pagination.goFirst}
              disabled={!pagination.canFirst}
              className={`w-10 h-10 flex items-center justify-center transition-colors ${
                pagination.canFirst ? "cursor-pointer hover:bg-[#F6F6F6]" : "opacity-50 cursor-not-allowed"
              }`}
              aria-label="첫 페이지"
            >
              <PreviousDoubleArrow />
            </button>

            {/* -5 */}
            <button
              onClick={pagination.goPrev5}
              disabled={!pagination.canPrev5}
              className={`w-10 h-10 flex items-center justify-center transition-colors ${
                pagination.canPrev5 ? "cursor-pointer hover:bg-[#F6F6F6]" : "opacity-50 cursor-not-allowed"
              }`}
              aria-label="이전 5페이지"
            >
              <PreviousArrow />
            </button>

            {/* 1~5 */}
            {pagination.pageNumbers.map((page) => {
              const isActive = page === pagination.currentPage1;
              return (
                <button
                  key={page}
                  onClick={() => pagination.goToPage1(page)}
                  className={`w-10 h-10 rounded-full body2 transition-colors ${
                    isActive ? "bg-[#B3E378] text-[#262627]" : "text-[#262627] hover:bg-[#F6F6F6]"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* +5 */}
            <button
              onClick={pagination.goNext5}
              disabled={!pagination.canNext5}
              className={`w-10 h-10 flex items-center justify-center transition-colors ${
                pagination.canNext5 ? "cursor-pointer hover:bg-[#F6F6F6]" : "opacity-50 cursor-not-allowed"
              }`}
              aria-label="다음 5페이지"
            >
              <NextArrow />
            </button>

            {/* 마지막 (totalPages 있을 때만) */}
            <button
              onClick={pagination.goLast}
              disabled={!pagination.canLast || !pagination.goLast}
              className={`w-10 h-10 flex items-center justify-center transition-colors ${
                pagination.canLast && pagination.goLast ? "cursor-pointer hover:bg-[#F6F6F6]" : "opacity-50 cursor-not-allowed"
              }`}
              aria-label="마지막 페이지"
            >
              <NextDoubleArrow />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FeedPage;
