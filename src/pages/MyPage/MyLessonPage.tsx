import { useMemo, useState } from "react";
import MyPostCard from "../../components/MyPage/MyPostsPage/MyPostCard";
import MyLessonCard from "../../components/MyPage/MyLessonPage/MyLessonCard";
import { useMyLessons } from "../../hooks/mypage/useMyLesson";
import { lessonToPost } from "../../components/MyPage/MyLessonPage/lessonToPost";

// 우선 피그마 상 존재하는 태그 선언
//TODO: 나중에 +클릭하면 태그를 생성할 수 있게 하기
//TODO: 페이지네이션 기능
const TAGS = ["멘탈", "친구", "인간관계", "배움", "위로"] as const;

const MyLessonPage = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    data: lessons,
    isLoading,
    isError,
  } = useMyLessons({
    tag: selectedTags.length ? selectedTags : undefined,
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const list = useMemo(() => lessons ?? [], [lessons]);

  return (
    <section className="w-full flex flex-col">
      <div className="mb-[2.5rem] font-semibold">내 교훈</div>
      {/* 상단 태그 */}
      <div className="flex flex-wrab gap-[1.25rem]">
        {TAGS.map((t) => {
          const active = selectedTags.includes(t);
          return (
            <button
              key={t}
              type="button"
              onClick={() => toggleTag(t)}
              className={[
                "h-[2.5rem] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] px-[0.88rem] rounded-[0.5rem] border-[0.06rem] text-[0.85rem]",
                active
                  ? "bg-[#B3E378] border-[#83d378]  text-[#111] font-semibold"
                  : "bg-[#E6F3D7] border-[#b3e378] text-[#111]",
              ].join(" ")}
            >
              {t}
            </button>
          );
        })}

        {/* 스샷에 있는 + 버튼 느낌 */}
        <button
          type="button"
          className="h-[2rem] w-[2rem] rounded-[0.5rem] border-[0.06rem] border-[#d2d2d2] text-[#666]"
          // 추후 태그 추가 UI로 확장 가능
          onClick={() => {}}
        >
          +
        </button>
      </div>

      {/* 목록 */}
      {isLoading ? (
        <div className="py-10 text-center text-[#b2b2b2]">불러오는 중...</div>
      ) : isError ? (
        <div className="py-10 text-center text-[#b2b2b2]">불러오기 실패</div>
      ) : list.length === 0 ? (
        <div className="py-10 text-center text-[#b2b2b2]">
          작성한 교훈이 없어요.
        </div>
      ) : (
        <div className="w-full">
          {list.map((lesson) => (
            <div key={lesson.lessonId} className="w-full">
              <MyPostCard post={lessonToPost(lesson)} />

              <MyLessonCard lesson={lesson} />
            </div>
          ))}
        </div>
      )}

      {/* 페이지네이션은 추후 */}
      {/* <Pagination /> */}
    </section>
  );
};

export default MyLessonPage;
