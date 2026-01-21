import React, { useState, useEffect, useMemo } from "react";
import { getMyPosts } from "../../apis/Post/postMy";
import { MyPost } from "../../types/post";

type ActiveStatus = "OOPS" | "OVERCOMING" | "OVERCOME";

type Props = {
  active: ActiveStatus;
  setActive: React.Dispatch<React.SetStateAction<ActiveStatus>>;
};

const PAGE_SIZE = 3;

const ProgressSection = ({ active, setActive }: Props) => {
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  // 탭에 따라 게시물 불러오기
  const displaySituation = useMemo<MyPost["situation"]>(() => {
    if (active === "OVERCOMING") return "OOPS";
    if (active === "OVERCOME") return "OVERCOMING";
    return "OOPS";
  }, [active]);

  // 마운트 시 내 게시물 불러오기
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setLoading(true);
        const res = await getMyPosts();

        setPosts(res.result);
        console.log(res.result);
      } catch (e) {
        console.error(e);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

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
      <div className="w-full rounded-[1rem] border border-[#e4e4e4] bg-white overflow-hidden">
        {loading ? (
          <div className="h-[18rem] flex items-center justify-center text-[#777]">
            불러오는 중...
          </div>
        ) : filtered.length === 0 ? (
          <div className="h-[18rem] flex items-center justify-center text-[#777]">
            작성된 게시물이 없습니다
          </div>
        ) : (
          <>
            <ul className="divide-y divide-[#eaeaea]">
              {paged.map((post) => (
                <li
                  key={post.postId}
                  className="flex justify-between gap-6 p-6"
                >
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="text-[1.05rem] font-semibold truncate">
                      {post.title}
                    </div>

                    <div className="text-[#666] text-[0.9rem] leading-6 line-clamp-2">
                      {post.content}
                    </div>

                    <div className="mt-2">
                      <span className="inline-flex items-center justify-center px-4 py-1 rounded-full border border-[#b3e378] text-[0.85rem] text-[#5a7d2b] bg-[#f3ffe3]">
                        {post.categoryName}
                      </span>
                    </div>
                  </div>

                  <div className="w-[120px] h-[84px] rounded-[0.5rem] overflow-hidden bg-[#f2f2f2] flex-shrink-0">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>

            {/* 페이지네이션 */}
            <div className="flex items-center justify-center gap-6 py-4 bg-white">
              <button
                onClick={goPrev}
                disabled={safePage === 1}
                className={`w-9 h-9 rounded-full border border-[#e4e4e4] flex items-center justify-center ${
                  safePage === 1
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                ‹
              </button>

              <div className="text-[#666] text-[0.9rem]">
                {safePage} / {totalPages}
              </div>

              <button
                onClick={goNext}
                disabled={safePage === totalPages}
                className={`w-9 h-9 rounded-full border border-[#e4e4e4] flex items-center justify-center ${
                  safePage === totalPages
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                ›
              </button>
            </div>
          </>
        )}
      </div>
      )}
    </section>
  );
};

export default React.memo(ProgressSection);
