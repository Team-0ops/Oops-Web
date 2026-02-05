import React, { useState, useEffect, useMemo } from "react";
import useGetMyPosts from "../../../../hooks/post/useGetMyPost";
import { MyPost } from "../../../../types/post";
import { CategoryName } from "../../../../types/Common";

import LeftIcon from "../../../../assets/icons/LeftArrow.svg?react";
import RightIcon from "../../../../assets/icons/RightArrow.svg?react";

type ActiveStatus = "OOPS" | "OVERCOMING" | "OVERCOME";

type Props = {
  active: ActiveStatus;
  setActive: React.Dispatch<React.SetStateAction<ActiveStatus>>;
  selectedPreviousPostId: number | null;
  onSelectPreviousPostId: (postId: number, categoryName: CategoryName) => void;
};

const PAGE_SIZE = 3;

const ProgressSection = ({ active, setActive, selectedPreviousPostId, onSelectPreviousPostId }: Props) => {
  const [page, setPage] = useState<number>(1);

  // 탭에 따라 게시물 불러오기
  const displaySituation = useMemo<MyPost["situation"]>(() => {
    if (active === "OVERCOMING") return "OOPS";
    if (active === "OVERCOME") return "OVERCOMING";
    return "OOPS";
  }, [active]);

  const { posts, loading } = useGetMyPosts();

  // 탭 변경 시 페이지 초기화
  useEffect(() => {
    setPage(1);
  }, [active]);

  const buttonClass =
    "flex w-full cursor-pointer items-center justify-center rounded-[1.88rem] py-[0.69rem] px-[7.75rem] transition-colors";

  const getButtonClass = (type: ActiveStatus) =>
    `${buttonClass} ${active === type ? "bg-[#b3e378]" : "bg-[#faf6e9]"}`;

  const filtered = useMemo(
    () => posts.filter((post) => post.situation === displaySituation),
    [posts, displaySituation],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const goPrev = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const goNext = () => {
    setPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <section className="select-none w-full flex flex-col gap-[1.25rem]">
      <div>진행상황</div>
      <div className="flex gap-[2.12rem] rounded-[1.88rem] border-[0.06rem] border-solid border-[#e4e4e4] justify-between items-center bg-[#FAF6E9]">
        <button
          className={getButtonClass("OOPS")}
          onClick={() => setActive("OOPS")}
        >
          웁스 중
        </button>

        <button
          className={getButtonClass("OVERCOMING")}
          onClick={() => setActive("OVERCOMING")}
        >
          극복 중
        </button>

        <button
          className={getButtonClass("OVERCOME")}
          onClick={() => setActive("OVERCOME")}
        >
          극복 완료
        </button>
      </div>

      {/* 리스트 영역 */}
      {active !== "OOPS" && (
        <div
          className="min-h-[25.3125rem] bg-[#fafafa] w-full 
          border-[#e4e4e4] border-[0.06rem] rounded-[0.5rem]
          px-[2.44rem] pb-[2.5rem]
          flex items-center justify-center 
          overflow-hidden"
        >
          {loading ? (
            <div className="text-[#b2b2b2]">불러오는 중...</div>
          ) : filtered.length === 0 ? (
            <div className="text-[#b2b2b2]">작성된 게시물이 없습니다</div>
          ) : (
            <div className="w-full h-full flex flex-col">
              <ul className="divide-y divide-[#d2d2d2]">
                {paged.map((post) => {
                  const isSelected = selectedPreviousPostId === post.postId;

                  return (
                    <li
                      key={post.postId}
                      onClick={() => onSelectPreviousPostId(post.postId,post.categoryName )}
                      className={`flex justify-between gap-[3.12rem] pb-[1.88rem] pt-[2.5rem] cursor-pointer ${isSelected ? "border-[#b2b2b2] border-[0.06rem]" : ""}`}
                    >
                      <div className={"flex flex-col flex-1 min-w-0 min-h-[10.625rem] justify-between"}>
                        <div>
                          <div>{post.title}</div>
                          <div className="mt-[0.94rem] max-h-[3.75rem] overflow-hidden">
                            {post.content}
                          </div>
                        </div>

                        <div className="mt-[1.88rem] flex justify-end">
                          <span
                            className="
                        items-center inline-flex justify-center
                        px-[0.81rem] py-[0.56rem] 
                        rounded-[1.88rem] border-[0.06rem] border-[#b3e378] 
                        bg-[#f3ffe3] w-[6.25rem] h-[2.25rem]"
                          >
                            {post.categoryName}
                          </span>
                        </div>
                      </div>

                      <div className="w-[10.625rem] h-[10.625rem] rounded-[0.25rem] overflow-hidden bg-[#d2d2d2] flex-shrink-0">
                        {post.imageUrl ? (
                          <img
                            src={post.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <hr className="border-[#d2d2d2]" />
              {/* 페이지네이션 컴포넌트 화 시켜야됨*/}
              <div className="flex items-center justify-between bg-[#fafafa] mt-[2.5rem]">
                <button onClick={goPrev} disabled={safePage === 1}>
                  <LeftIcon />
                </button>

                <div className="text-[#666] text-[0.9rem]">
                  {safePage} / {totalPages}
                </div>

                <button onClick={goNext} disabled={safePage === totalPages}>
                  <RightIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default React.memo(ProgressSection);
