import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Categories } from "../../types/Common";
import Star from "../../assets/icons/Star.svg?react";
import RightArrow from "../../assets/icons/RightArrow.svg?react";
import {
  setCategoryBookmark,
  unsetCategoryBookmark,
  getBookmarkedCategories,
} from "../../apis/categories";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 즐겨찾기 카테고리 목록 가져오기
  useEffect(() => {
    if (isOpen) {
      const fetchBookmarkedCategories = async () => {
        try {
          setIsLoading(true);
          const response = await getBookmarkedCategories();
          if (response.isSuccess && Array.isArray(response.result)) {
            const categoryIds = response.result.map((cat) => cat.categoryId);
            setFavorites(categoryIds);
          }
        } catch (error) {
          console.error("즐겨찾기 카테고리 조회 실패:", error);
        } finally {
          setIsLoading(false);
        }
      };

      void fetchBookmarkedCategories();
    }
  }, [isOpen]);

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/category-feed/${categoryId}`);
    onClose();
  };

  const handleFavoriteToggle = async (e: React.MouseEvent, categoryId: number) => {
    e.stopPropagation();
    e.preventDefault();
    
    const isCurrentlyFavorite = favorites.includes(categoryId);
    
    try {
      if (isCurrentlyFavorite) {
        // 즐겨찾기 해제
        await unsetCategoryBookmark(categoryId);
        setFavorites((prev) => prev.filter((id) => id !== categoryId));
      } else {
        // 즐겨찾기 설정
        await setCategoryBookmark(categoryId);
        setFavorites((prev) => [...prev, categoryId]);
      }
      
      // 즐겨찾기 목록 다시 불러오기
      const response = await getBookmarkedCategories();
      if (response.isSuccess && Array.isArray(response.result)) {
        const categoryIds = response.result.map((cat) => cat.categoryId);
        setFavorites(categoryIds);
      }
    } catch (error) {
      console.error("카테고리 즐겨찾기 설정 실패:", error);
    }
  };

  const favoriteCategories = favorites
    .map((id) => ({ id, name: Categories[id - 1] }))
    .filter((cat) => cat.name);

  const allCategories = Categories.map((name, index) => ({
    id: index + 1,
    name,
    isFavorite: favorites.includes(index + 1),
  }));

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .star-empty-button:hover .star-empty path {
          stroke: #B3E378 !important;
        }
        .star-filled-button:hover svg {
          opacity: 0.7;
        }
      `}</style>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* 사이드바 */}
      <div className="fixed left-0 top-0 h-full w-[400px] bg-white z-50 shadow-lg overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-[#E4E4E4]">
            <h2 className="text-[24px] font-bold text-[#262627]">카테고리</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-[#6F6F6F] hover:bg-[#F6F6F6] rounded"
            >
              ✕
            </button>
          </div>

          {/* 즐겨찾기 섹션 - 상단 고정 */}
          {favoriteCategories.length > 0 && (
            <div className="p-6 border-b border-[#E4E4E4] shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-[#262627]" />
                <h3 className="text-[20px] font-semibold text-[#262627]">
                  즐겨찾기
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                {favoriteCategories.map(({ id, name }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between p-3 hover:bg-[#F6F6F6] rounded cursor-pointer group"
                    onClick={() => handleCategoryClick(id)}
                  >
                    <span className="text-[16px] text-[#262627]">{name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleFavoriteToggle(e, id)}
                        className="transition-colors"
                      >
                        <Star className="w-5 h-5 fill-[#B3E378] text-[#B3E378]" />
                      </button>
                      <RightArrow className="w-5 h-5 text-[#6F6F6F]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 전체 카테고리 섹션 */}
          <div className="flex-1 p-6">
            <h3 className="text-[20px] font-semibold text-[#262627] mb-4">
              전체 카테고리
            </h3>
            <div className="flex flex-col gap-2">
              {allCategories.map(({ id, name, isFavorite }) => (
                <div
                  key={id}
                  className="flex items-center justify-between p-3 hover:bg-[#F6F6F6] rounded"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        void handleFavoriteToggle(e, id);
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      className="flex-shrink-0 cursor-pointer p-1 -m-1 relative z-20"
                    >
                      <Star
                        className="w-5 h-5"
                        style={
                          isFavorite
                            ? { fill: "#B3E378" }
                            : { fill: "none", stroke: "#D2D2D2", strokeWidth: "2" }
                        }
                      />
                    </button>
                    <span
                      className="text-[16px] text-[#262627] flex-1 cursor-pointer"
                      onClick={() => handleCategoryClick(id)}
                    >
                      {name}
                    </span>
                  </div>
                  <RightArrow
                    className="w-5 h-5 text-[#6F6F6F] flex-shrink-0 cursor-pointer"
                    onClick={() => handleCategoryClick(id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
