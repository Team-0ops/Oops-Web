import React, { useEffect, useRef, useState } from "react";
import {
  Categories,
  normalizeLabel,
  CategoryIdMap,
  type CategoryName,
} from "../../types/Common";
import UpArrow from "../../assets/icons/UpArrow.svg?react";
import DownArrow from "../../assets/icons/DownArrow.svg?react";

type Props = {
  selectedCategory: CategoryName | null;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<CategoryName | null>
  >;
  locked?: boolean;
};

const CategorySection = ({ selectedCategory, setSelectedCategory, locked }: Props) => {
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex gap-[5.38rem]">
      <div className="flex items-center self-stretch">카테고리 선택</div>

      <div
        className={`
        flex gap-[1.25rem] justify-between items-center relative 
        w-[10.125rem] h-[2.5rem] px-[1.25rem] py-[0.25rem] 
        border-[0.06rem] border-solid rounded-[0.25rem] border-[#e4e4e4] 
        bg-[#f6f6f6] select-none
        ${locked ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        ref={dropdownRef}
      >
        {/* 드롭다운 버튼 */}
        <button
          type="button"
          disabled={locked}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="w-full flex justify-between items-center text-start gap-[0.62rem]"
        >
          <span>{selectedCategory ?? "카테고리"}</span>
          <span className="text-sm cursor-pointer">
            {isDropdownOpen ? <DownArrow /> : <UpArrow />}
          </span>
        </button>

        {/* 드롭다운 리스트 */}
        {isDropdownOpen && (
          <ul
            className="
            absolute bottom-12 right-[0.4px] 
            bg-[#f6f6f6] 
            w-[13.9375rem] 
            rounded-[0.25rem] border-[0.06rem] border-[#e4e4e4] 
            z-20 
            shadow-[0_1px_2px_0_rgba(0,0,0,0.17)]  
            overflow-hidden"
          >
            {Categories.map((label, idx) => {
              const isSelected =
                selectedCategory &&
                normalizeLabel(selectedCategory) === normalizeLabel(label);

              const isLast = idx === Categories.length - 1;

              return (
                <li
                  key={`${label}-${idx}`}
                  onClick={() => {
                    applySelection(label);
                    setIsDropdownOpen(false);
                  }}
                  className={`
                    select-none cursor-pointer
                    px-[0.88rem] py-[0.75rem]
                    text-[1rem] font-medium
                    ${isSelected ? "text-black" : ""}
                    ${isLast ? "" : "border-b border-[#e4e4e4] "}
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
