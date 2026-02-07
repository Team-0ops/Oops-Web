import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RandomFeedPostCard } from "../components/RandomFeedPage/RandomFeedPostCard";
import { FeedPage } from "./FeedPage";
import { useGetCategoryFeed } from "../hooks/post/useGetCategoryFeed";
import { Categories } from "../types/Common";
import Star from "../assets/icons/Star.svg?react";
import RightArrow from "../assets/icons/RightArrow.svg?react";
import { getBookmarkedCategories } from "../apis/categories";

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

export const FavoriteFeedPage = () => {
  const navigate = useNavigate();
  const [favoriteCategories, setFavoriteCategories] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<SituationType>("웁스 중");
  const [sortOrder, setSortOrder] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  // 즐겨찾기 카테고리 로드
  useEffect(() => {
    const fetchBookmarkedCategories = async () => {
      try {
        setIsLoadingFavorites(true);
        const response = await getBookmarkedCategories();
        if (response.isSuccess && Array.isArray(response.result)) {
          const categories = response.result.map((cat) => ({
            id: cat.categoryId,
            name: cat.categoryName,
          }));
          setFavoriteCategories(categories);
          if (categories.length > 0 && activeCategoryId === null) {
            setActiveCategoryId(categories[0].id);
          }
        }
      } catch (error) {
        console.error("즐겨찾기 카테고리 조회 실패:", error);
      } finally {
        setIsLoadingFavorites(false);
      }
    };

    void fetchBookmarkedCategories();
  }, []);

  // API 파라미터
  const apiParams = useMemo(
    () => {
      if (!activeCategoryId) return null;
      return {
        categoryId: activeCategoryId,
        situation: situationMap[activeTab],
        page: currentPage,
        limit: 10,
        sort: sortMap[sortOrder] || "LATEST",
      };
    },
    [activeCategoryId, activeTab, currentPage, sortOrder]
  );

  // API 호출
  const { data, isLoading, error } = useGetCategoryFeed(
    apiParams || { categoryId: 0, situation: "OOPS" }
  );

  // 로딩 중일 때
  if (isLoadingFavorites) {
    return (
      <div className="w-full flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-[16px]">
              <Star className="w-[60px] h-[60px]" />
              <h1 className="text-[34px] font-bold text-[#262627] leading-[100%]">
                즐겨찾기한 카테고리
              </h1>
            </div>
          </div>
        </div>
        <div className="text-center text-[#6F6F6F] py-[60px]">
          불러오는 중...
        </div>
      </div>
    );
  }

  // 안전하게 배열로 변환
  const posts = activeCategoryId && data?.result?.posts
    ? Array.isArray(data.result.posts)
      ? data.result.posts
      : []
    : [];
  const hasNextPage = !data?.result?.last;

  // 즐겨찾기가 없을 때
  if (favoriteCategories.length === 0) {
    return (
      <div className="w-full flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-[16px]">
              <Star className="w-[60px] h-[60px]" />
              <h1 className="text-[34px] font-bold text-[#262627] leading-[100%]">
                즐겨찾기한 카테고리
              </h1>
            </div>
          </div>
        </div>
        <div className="text-center text-[#6F6F6F] py-[60px]">
          즐겨찾기한 카테고리가 없습니다.
          <br />
          사이드바에서 카테고리를 즐겨찾기에 추가해보세요.
        </div>
      </div>
    );
  }

  // 활성 카테고리 이름
  const activeCategoryName =
    favoriteCategories.find((cat) => cat.id === activeCategoryId)?.name ||
    "전체";

  return (
    <>
      <div className="w-full flex flex-col gap-[40px]">
        {/* 제목 섹션 */}
        <div className="flex flex-col gap-[24px]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-[16px]">
              <Star className="w-[60px] h-[60px]" />
              <h1 className="text-[34px] font-bold text-[#262627] leading-[100%]">
                즐겨찾기한 카테고리
              </h1>
            </div>
          </div>
        </div>

        {/* 카테고리 탭 */}
        <div className="border-b-2 border-[#D2D2D2]">
          <div className="flex gap-[50px] items-start px-[40px] pb-0 overflow-x-auto">
            <div className="flex flex-1 gap-[93px] items-center min-w-max">
              {favoriteCategories.map(({ id, name }) => (
                <div
                  key={id}
                  className="flex flex-1 flex-col gap-[20px] items-center cursor-pointer min-w-[100px]"
                  onClick={() => setActiveCategoryId(id)}
                >
                  <p
                    className={`text-[28px] font-bold leading-[100%] text-center ${
                      activeCategoryId === id
                        ? "text-[#464646]"
                        : "text-[#464646]"
                    }`}
                  >
                    {name}
                  </p>
                  {activeCategoryId === id && (
                    <div className="bg-[#B3E378] h-[8px] rounded-tl-[12px] rounded-tr-[12px] w-full" />
                  )}
                </div>
              ))}
            </div>
            <div className="p-[10px] shrink-0">
              <div className="flex items-center justify-center">
                <RightArrow className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* 게시물 리스트 */}
        {activeCategoryId ? (
          <FeedPage
            title={activeCategoryName}
            showWriteButton={false}
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
        ) : (
          <div className="text-center text-[#6F6F6F] py-[60px]">
            카테고리를 선택해주세요.
          </div>
        )}
      </div>
    </>
  );
};

export default FavoriteFeedPage;
