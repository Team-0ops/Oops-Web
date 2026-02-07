import { useEffect, useRef, useState } from "react";

import type { GetLessonResult } from "../../../../types/post";
import type { PostDetail } from "../../../../types/post";

import LikedIcon from "../../../../assets/icons/LikedIcon.svg?react";
import CommentIcon from "../../../../assets/icons/CommentIcon.svg?react";
import ViewIcon from "../../../../assets/icons/ViewIcon.svg?react";
import LessonButtonIcon from "../../../../assets/icons/LessonButtonIcon.svg?react";

type Props = {
  post: PostDetail;
  categoryName?: string;
  onClickLesson: () => void;
  lesson: GetLessonResult | null;
  isLessonLoading: boolean;
};

export default function PostHeaderSection({
  post,
  categoryName,
  onClickLesson,
  lesson,
  isLessonLoading,
}: Props) {
  const [openPreview, setOpenPreview] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 닫기 (작은 모달)
  useEffect(() => {
    if (!openPreview) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpenPreview(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openPreview]);

  const hasLesson = !!lesson;
  return (
    <section className="flex flex-col gap-[1.25rem]">
      {/* 카테고리 */}
      <div className="flex items-center justify-between">
        <div
          className="
            w-[6.25rem] h-[2.25rem] px-[0.81rem] py-[0.56rem]
            rounded-[1.88rem] border-[0.06rem] border-[#b3e378] bg-[#e6f3d7]
            flex items-center justify-center"
        >
          {categoryName ?? "카테고리"}
        </div>
      </div>

      {/* 제목 */}
      <div className="text-[2.125rem] font-semibold text-[#262626]">
        {post.title}
      </div>

      {/* 작성자/메타 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[1.88rem] justify-start">
          <div className="flex items-center gap-[0.62rem]">
            <div className="w-[2rem] h-[2rem] rounded-[3.13rem] overflow-hidden bg-[#d2d2d2]">
              {post.profileImage ? (
                <img
                  src={post.profileImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="text-[#6f6f6f]">{post.nickname}</div>
          </div>

          <div className="flex items-center justify-center gap-[1.25rem]">
            <div className="flex gap-[0.62rem]">
              <LikedIcon /> {post.likes}
            </div>
            <div className="flex gap-[0.62rem]">
              <CommentIcon /> {post.comments.length}
            </div>
            <div className="flex gap-[0.62rem]">
              <ViewIcon /> {post.watching}
            </div>
          </div>

          <div>{new Date(post.created_at).toLocaleString()}</div>
        </div>

        {/* 교훈 버튼 + (있으면) 아래 미니 모달 */}
        <div
          ref={wrapRef}
          className="relative flex items-center justify-center"
        >
          {isLessonLoading ? null : hasLesson ? (
            <button
              type="button"
              onClick={() => setOpenPreview((p) => !p)}
              className="
                px-[0.88rem] py-[0.63rem]
                rounded-[0.5rem]
                bg-[#B3E378]
                border-[0.06rem] border-[#83e378]
                text-[0.9rem]
              "
            >
              교훈 확인
            </button>
          ) : (
            <button type="button" onClick={onClickLesson}>
              <LessonButtonIcon />
            </button>
          )}

          {/* 버튼 바로 아래에 뜨는 작은 모달 */}
          {hasLesson && openPreview && lesson ? (
            <div
              className="
                absolute right-0 top-[2.8rem]
                w-[26rem]
                rounded-[0.5rem] border-[0.06rem] border-[#b3e378]
                bg-[#B3E378]
                p-[1.13rem]
                shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]
                z-50
              "
            >
              <div className="flex flex-col justify-start gap-[2.12rem]">
                <div className="flex flex-col gap-[0.5rem]">
                  <div className="text-[1rem] font-semibold text-[#111]">
                    {lesson.title}
                  </div>
                  <div className="text-[0.9rem] text-[#111] opacity-90 line-clamp-2">
                    {lesson.content}
                  </div>
                </div>

                {/* tag 하나만 칩으로 표시(원하면 여러 개도 가능) */}
                {lesson.tagNames?.[0] ? (
                  <div className="flex justify-end items-center shrink-0">
                    <span 
                    className="
                    px-[0.88rem] py-[0.63rem] 
                    border-[0.06rem] border-[#b3e378] 
                    bg-[#e6f3d7]
                    rounded-[0.5rem]
                    shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]
                    ">
                      {lesson.tagNames[0]}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <hr className="border-[0.06rem] border-[#d2d2d2]" />
    </section>
  );
}
