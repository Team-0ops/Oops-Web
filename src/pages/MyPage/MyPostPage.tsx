import SituationTabs from "../../components/MyPage/MyPostsPage/SituationTabs";
import MyPostCard from "../../components/MyPage/MyPostsPage/MyPostCard";
import { useMyPostsPage } from "../../hooks/mypage/useMyPostsPage";
import { Categories, getCategoryId } from "../../types/Common";
import type { CategoryName } from "../../types/Common";
import { useState } from "react";

export default function MyPostsPage() {
  const {
    situation,
    changeSituation,
    changeCategoryId,
    posts,
    isLoading,
    isError,
  } = useMyPostsPage();

  const [selectedCategory, setSelectedCategory] = useState<CategoryName | "">(
    ""
  );

  return (
    <section className="w-full">
      {/* 타이틀 + 카테고리 선택 */}
      <div className="flex items-center justify-between mb-[1.25rem]">
        <h2 className="text-[1rem] font-semibold text-[#111]">내 실패담</h2>

        {/* 카테고리 드롭다운: 카테고리 목록 API 없으니 임시 */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            const v = e.target.value as CategoryName | "";
            setSelectedCategory(v);

            const id = v ? getCategoryId(v) : undefined;
            changeCategoryId(id); //훅에 숫자 id 전달
          }}
          className="h-[2.25rem] px-[0.75rem] rounded-[0.4rem] border border-[#e6e6e6] text-[0.85rem]"
        >
          <option value="">카테고리 선택</option>
          {Categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 탭 */}
      <SituationTabs value={situation ?? "OOPS"} onChange={changeSituation} />

      {/* 리스트 */}
      <div className="mt-[3.12rem]">
        {isLoading ? (
          <div className="py-10 text-center text-[#b2b2b2]">불러오는 중...</div>
        ) : isError ? (
          <div className="py-10 text-center text-[#b2b2b2]">불러오기 실패</div>
        ) : posts.length === 0 ? (
          <div className="py-10 text-center text-[#b2b2b2]">
            게시글이 없어요
          </div>
        ) : (
          posts.map((p) => <MyPostCard key={p.postId} post={p} />)
        )}
      </div>

      {/* 페이지네이션: 현재 타입/응답에 totalPages 같은 정보가 없어서 UI만 자리 */}
      <div className="py-8 flex justify-center text-[#999] text-sm">
        페이지네이션(추가 예정)
      </div>
    </section>
  );
}
