import { useMemo, useState, useEffect } from "react";
import type { PostDetail } from "../../../types/post";

import LikedIcon from "../../../assets/icons/LikedIcon.svg?react";
import CommentIcon from "../../../assets/icons/CommentIcon.svg?react";
import ViewIcon from "../../../assets/icons/ViewIcon.svg?react";
import LessonButtonIcon from "../../../assets/icons/LessonButtonIcon.svg?react";
import ReportIcon from "../../../assets/icons/ReportIcon.svg?react";
import ShareIcon from "../../../assets/icons/ShareIcon.svg?react";

import Report from "../modal/Report";
import ShareModal from "../modal/ShareModal";

type Props = {
  post: PostDetail;
  categoryName?: string;
};

export default function PostViewCard({ post, categoryName }: Props) {
  const [imgIdx, setImgIdx] = useState(0);

  //신고
  const [isReportOpen, setIsReportOpen] = useState(false);
  //공유
  const [isShareOpen, setIsShareOpen] = useState(false);

  // 이미지 배열 정규화
  const images = useMemo(() => (post?.images ?? []) || [], [post]);
  const hasImages = images.length > 0;

  // post가 바뀌면(탭 변경) 이미지 인덱스 초기화
  useEffect(() => {
    setImgIdx(0);
  }, [post?.postId]); // postId 필드명이 다르면 여길 수정

  return (
    <>
      <section className="w-full flex flex-col gap-[2.5rem]">
        {/* 카테고리 */}
        <section className="flex flex-col gap-[1.25rem]">
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

            {/* 교훈 작성버튼 */}
            <div className="flex items-center justify-center">
              <button type="button">
                <LessonButtonIcon />
              </button>
            </div>
          </div>

          <hr className="border-[0.06rem] border-[#d2d2d2]" />
        </section>

        {/* 본문 */}
        <section>
          <div className="whitespace-pre-wrap text-[#333] leading-7">
            {post.content}
          </div>
        </section>

        {/* 이미지 영역 */}
        <section>
          <div className="w-full max-h-[53.8125rem] rounded-[0.5rem] overflow-hidden">
            {hasImages ? (
              <div className="relative">
                <img src={images[imgIdx]} alt="" className="w-full h-full" />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setImgIdx((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 bottom-3 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center"
                      aria-label="prev image"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setImgIdx((prev) => (prev + 1) % images.length)
                      }
                      className="absolute right-3 bottom-3 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center"
                      aria-label="next image"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </section>

        {/* 이미지 아래 좋아요, 조회수, 댓글 수 */}
        <section className="flex justify-between items-center">
          <div className="flex items-center justify-start gap-[1.25rem]">
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

          <div className="flex gap-[1.25rem] justify-center items-center">
            <button className="cursor-pointer" type="button" onClick={() => setIsReportOpen(true)}>
              <ReportIcon />
            </button>
            <button className="cursor-pointer" type="button" onClick={()=>setIsShareOpen(true)}>
              <ShareIcon />
            </button>
          </div>
        </section>
      </section>
      <Report
        isOpen={isReportOpen}
        postId={post.postId}
        onClose={() => setIsReportOpen(false)}
      />
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={window.location.href}
        />
    </>
  );
}
