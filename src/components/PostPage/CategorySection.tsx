import React, { useEffect, useRef, useState } from "react";
import { Categories, normalizeLabel, CategoryIdMap, type CategoryName } from "../../types/Common";
import UpArrow from "../../assets/icons/UpArrow.svg?react";
import DownArrow from "../../assets/icons/DownArrow.svg?react";

type Props = {
  selectedCategory: CategoryName | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryName | null>>;
};

const CategorySection = ({ selectedCategory, setSelectedCategory }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const applySelection = (category: CategoryName) => {
    setSelectedCategory(category);

    const id = CategoryIdMap.get(category);
    if (!id) throw new Error("유효하지 않은 카테고리입니다.");

    console.log("선택된 카테고리:", category, "ID:", id);
  };

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-[2.5rem]">
      <a className="flex items-center self-stretch xl:w-[16rem]">카테고리 선택</a>

      <div
        className="relative xl:w-56 bg-[#e6e6e6] flex py-2 px-4 rounded-t-xl h-12"
        ref={dropdownRef}
      >
        {/* 드롭다운 버튼 */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="w-full flex justify-between items-center text-start gap-[0.62rem]"
        >
          <span>{selectedCategory ?? "카테고리"}</span>
          <span className="text-sm">{isDropdownOpen ? <UpArrow /> : <DownArrow />}</span>
        </button>

        {/* 드롭다운 리스트 */}
        {isDropdownOpen && (
          <ul className="absolute pt-5 top-12 right-[0.4px] bg-[#f3f3f3] w-full h-[180px] rounded-b-[1.25rem] overflow-y-scroll z-20 custom-scroll">
            {Categories.map((label, idx) => {
              const isSelected =
                selectedCategory && normalizeLabel(selectedCategory) === normalizeLabel(label);

              return (
                <li
                  key={`${label}-${idx}`}
                  onClick={() => {
                    applySelection(label);
                    setIsDropdownOpen(false);
                  }}
                  className={`px-5 pb-7 cursor-pointer text-[1.125rem]
                    ${isSelected ? "text-black" : "text-[#999999]"}
                  `}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default React.memo(CategorySection);
