import Pin from "../../assets/icons/Pin.svg?react";
import NextArrow from "../../assets/icons/NextArrow.svg?react";
import { CategoryPostList } from "./CategoryPostList.tsx";
import { useNavigate } from "react-router-dom";
import { Categories } from "../../types/Common";

export const CategoryList = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-end pb-6 border-b border-b-[#D2D2D2]">
          <div className="flex flex-col gap-4">
            <Pin />
            <div className="h1">주제별 피드</div>
          </div>
          <button
            className="body3 flex items-center gap-2 hover:underline text-[#6F6F6F]"
            onClick={() => navigate("/category-feed/1")}
          >
            전체 보기
            <NextArrow />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-22 gap-y-10">
          {Categories.map((categoryName, index) => (
            <CategoryPostList
              key={categoryName}
              categoryId={index + 1}
              categoryName={categoryName}
            />
          ))}
        </div>
      </div>
    </>
  );
};
