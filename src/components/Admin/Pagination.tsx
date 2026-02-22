import NextArrow from "../../assets/icons/NextArrow.svg?react";
import NextDoubleArrow from "../../assets/icons/NextDoubleArrow.svg?react";
import PreviousArrow from "../../assets/icons/PreviousArrow.svg?react";
import PreviousDoubleArrow from "../../assets/icons/PreviousDoubleArrow.svg?react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handleFirst = () => {
    onPageChange(1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLast = () => {
    onPageChange(totalPages);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    // 최대 5개 페이지 번호 표시
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <>
      <div className="flex justify-center items-center gap-2 py-4">
        {/* 첫 페이지 버튼 - 2페이지 이상일 때 표시 */}
        {totalPages >= 2 && (
          <button
            onClick={handleFirst}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center transition-colors ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-[#F6F6F6]"
            }`}
          >
            <PreviousDoubleArrow />
          </button>
        )}
        
        {/* 이전 페이지 버튼 - 2페이지 이상일 때 표시 */}
        {totalPages >= 2 && (
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center transition-colors ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-[#F6F6F6]"
            }`}
          >
            <PreviousArrow />
          </button>
        )}
        
        {pageNumbers.map((page) => {
          if (typeof page === "number") {
            const isActive = page === currentPage;
            return (
              <button
                key={page}  
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-full body2 transition-colors ${
                  isActive
                    ? "bg-[#B3E378] text-[#262627]"
                    : "text-[#262627] hover:bg-[#F6F6F6]"
                }`}
              >
                {page}
              </button>
            );
          } else {
            // 페이지 번호 사이의 생략 표시 (현재는 사용하지 않음)
            return null;
          }
        })}
        
        {/* 다음 페이지 버튼 - 항상 표시 */}
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className={`w-8 h-8 flex items-center justify-center transition-colors ${
            currentPage >= totalPages
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-[#F6F6F6]"
          }`}
        >
          <NextArrow />
        </button>
        
        {/* 마지막 페이지 버튼 - 항상 표시 */}
        <button
          onClick={handleLast}
          disabled={currentPage >= totalPages}
          className={`w-8 h-8 flex items-center justify-center transition-colors ${
            currentPage >= totalPages
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-[#F6F6F6]"
          }`}
        >
          <NextDoubleArrow />
        </button>
      </div>
    </>
  );
};

export default Pagination;

