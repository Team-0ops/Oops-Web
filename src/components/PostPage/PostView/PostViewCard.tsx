import { useRef, useState } from "react";
import type { PostDetail } from "../../../types/post";

import PostHeaderSection from "../section/PostViewSection/PostHeaderSection";
import PostContentSection from "../section/PostViewSection/PostContentSection";
import PostImagesSection from "../section/PostViewSection/PostImageSection";
import PostFooterSection from "../section/PostViewSection/PostFooterSection";

import { useOutsideClick } from "../../../hooks/post/postviewhook/useOutsideClick";

import type { GetLessonResult } from "../../../types/post";

type Props = {
  post: PostDetail;
  categoryName?: string;
  onOpenPostReport: (postId: number) => void;
  onClickLesson: () => void;
  lesson: GetLessonResult | null;
  isLessonLoading:boolean;
};

export default function PostViewCard({
  post,
  categoryName,
  onOpenPostReport,
  onClickLesson,
  lesson,
  isLessonLoading,
}: Props) {
  // 공유
  const [isShareOpen, setIsShareOpen] = useState(false);

  // 공유 바깥 클릭 감지
  const shareRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: shareRef,
    enabled: isShareOpen,
    onOutside: () => setIsShareOpen(false),
  });

  return (
    <>
      <section className="w-full flex flex-col gap-[2.5rem]">
        {/* (카테고리, 제목, 작성자/메타) */}
        <PostHeaderSection
          post={post}
          categoryName={categoryName}
          onClickLesson={onClickLesson}
          lesson={lesson}
          isLessonLoading={isLessonLoading}
        />

        {/* (본문) */}
        <PostContentSection content={post.content} />

        {/* (이미지 영역) */}
        <PostImagesSection postId={post.postId} images={post?.images ?? []} />

        {/* (이미지 아래 액션/카운트) */}
        <PostFooterSection
          post={post}
          shareRef={shareRef}
          isShareOpen={isShareOpen}
          onToggleShare={() => setIsShareOpen((prev) => !prev)}
          onCloseShare={() => setIsShareOpen(false)}
          onOpenReport={onOpenPostReport}
        />
      </section>
    </>
  );
}
