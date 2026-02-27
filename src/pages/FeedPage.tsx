import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RandomFeedPostCard } from "../components/RandomFeedPage/RandomFeedPostCard";
import Write from "../assets/icons/Write.svg?react";
import RightArrow from "../assets/icons/RightArrow.svg?react";

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
  activeTab?: SituationType;
  sortOrder?: string;
  sortOptions?: Array<{ label: string; value: string }>;
  onTabChange?: (tab: SituationType) => void;
  onSortChange?: (sort: string) => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
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
  activeTab: externalActiveTab,
  sortOrder: externalSortOrder,
  sortOptions: externalSortOptions,
  onTabChange,
  onSortChange,
  onPageChange,
  currentPage: externalCurrentPage,
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
    navigate("/post");
  }, [navigate]);

  const handleTabChange = useCallback(
    (tab: SituationType) => {
      if (onTabChange) {
        onTabChange(tab);
      } else {
        setInternalActiveTab(tab);
      }
    },
    [onTabChange]
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      if (onSortChange) {
        onSortChange(sort);
      } else {
        setInternalSortOrder(sort);
      }
      setIsSortDropdownOpen(false);
    },
    [onSortChange]
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
          <div className="flex gap-[30px] items-center justify-center pt-[60px]">
            <div className="flex gap-[30px] items-center">
              {/* 이전 */}
              {currentPage > 0 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="w-6 h-6 flex items-center justify-center rotate-180"
                >
                  <RightArrow className="w-6 h-6" />
                </button>
              )}

              {/* 현재 페이지 */}
              <button className="w-[46px] h-[46px] bg-[#B3E378] rounded-[23px] flex items-center justify-center text-[18px] font-semibold text-[#262627]">
                {currentPage + 1}
              </button>

              {/* 다음 */}
              {hasNextPage && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <RightArrow className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FeedPage;
