import type { GetMyLessonsResponse } from "../../../types/MyPage";

export default function MyLessonCard({
  lesson,
}: {
  lesson: GetMyLessonsResponse;
}) {
  return (
    <section className="w-[31.875rem] h-[5.8125rem] mt-[1.88rem]">
      <div className="w-full bg-[#B3E378] rounded-[0.5rem] px-[1.25rem] py-[1rem]">
        <div className="text-[0.9rem] font-semibold text-[#111]">
          {lesson.title}
        </div>
        <div className="mt-[0.38rem] text-[0.85rem] text-[#111] leading-[1.5]">
          {lesson.content}
        </div>
      </div>
    </section>
  );
}
