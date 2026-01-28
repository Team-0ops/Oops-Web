import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostDetail } from "../../hooks/post/usePostDetail";
import type { Situation, PostDetail } from "../../types/post";

import LikeIcon from "../../assets/icons/LikeIcon.svg?react";
import CommentIcon from "../../assets/icons/CommentIcon.svg?react";
import ViewIcon from "../../assets/icons/ViewIcon.svg?react";
import LessonButtonIcon from "../../assets/icons/LessonButtonIcon.svg?react";
import ReportIcon from "../../assets/icons/ReportIcon.svg?react";
import ShareIcon from "../../assets/icons/ShareIcon.svg?react";

const LABEL: Record<Situation, string> = {
  OOPS: "웁스 중",
  OVERCOMING: "극복 중",
  OVERCOME: "극복 완료",
};

type StageKey = Situation;

export default function PostDetailPage() {
  const { postId } = useParams();
  const numericPostId = Number(postId);

  const { data, loading, error } = usePostDetail(numericPostId);

  //stage별 게시글 매핑
  const stageMap = useMemo(() => {
    if (!data) return null;
    return {
      OOPS: data.postFailure,
      OVERCOMING: data.postOvercoming,
      OVERCOME: data.postOvercome,
    } as Record<StageKey, PostDetail | null>;
  }, [data]);

  // 기본 선택 탭: 존재하는 것 중 가장 앞 단계
  const defaultStage: StageKey = useMemo(() => {
    if (!stageMap) return "OOPS";
    if (stageMap.OOPS) return "OOPS";
    if (stageMap.OVERCOMING) return "OVERCOMING";
    if (stageMap.OVERCOME) return "OVERCOME";
    return "OOPS";
  }, [stageMap]);

  const [activeStage, setActiveStage] = useState<StageKey>("OOPS");
  const [imgIdx, setImgIdx] = useState(0);

  // data가 로드되면 기본 stage로 맞추기
  useEffect(() => {
    setActiveStage(defaultStage);
    setImgIdx(0);
  }, [defaultStage]);

  const post = stageMap?.[activeStage] ?? null;

  // 이미지 배열 정규화
  const images = (post?.images ?? []) || [];
  const hasImages = images.length > 0;

  // 탭 disabled 여부
  const isDisabled = (s: StageKey) => !stageMap?.[s];

  const tabBase =
    "flex w-full items-center justify-center rounded-[1.88rem] py-[0.69rem] px-[1.25rem] transition-colors";
  const tabActive =
    "bg-[#b3e378] text-[#111] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] cursor-pointer";
  const tabIdle = "bg-[#FAF6E9] ";
  const tabDisabled = "bg-[#FAF6E9] text-[#b2b2b2]";

  if (loading)
    return (
      <div className="py-10 text-center text-[#b2b2b2]">불러오는 중...</div>
    );
  if (error || !data || !stageMap)
    return (
      <div className="py-10 text-center text-[#b2b2b2]">불러오기 실패</div>
    );

  return (
    <div className="w-full flex flex-col gap-[2.5rem]">
      {/* 상단 탭 */}
      <div className="flex w-full gap-[2.12rem] rounded-[1.88rem] border-[0.06rem] border-solid border-[#e4e4e4] bg-[#FAFAFA] px-[0.56rem] py-[0.5rem] h-[3.75rem]">
        {(["OOPS", "OVERCOMING", "OVERCOME"] as StageKey[]).map((s) => {
          const disabled = isDisabled(s);
          const active = activeStage === s;

          return (
            <button
              key={s}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                setActiveStage(s);
                setImgIdx(0);
              }}
              className={[
                tabBase,
                disabled ? tabDisabled : active ? tabActive : tabIdle,
              ].join(" ")}
            >
              {LABEL[s]}
            </button>
          );
        })}
      </div>

      {/* 게시글 카드 */}
      {!post ? (
        <div className="py-10 text-center text-[#b2b2b2]">
          작성된 게시물이 없습니다
        </div>
      ) : (
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
                {data.category?.name ?? "카테고리"}
              </div>
            </div>

            {/* 제목 */}
            <div className="text-[2.125rem] font-semibold text-[#262626]">
              {post.title}
            </div>

            {/* 작성자/메타 */}
            <div className="flex justify-between items-center ">
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
                    <LikeIcon /> {post.likes}
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
                <button>
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
          
          {/* 이미지 영역 (여러 장이면 슬라이드) */}
          <section>
          <div className="w-full max-h-[53.8125rem] rounded-[0.5rem] overflow-hidden">
            {hasImages ? (
              <div className="relative">
                <img
                  src={images[imgIdx]}
                  alt=""
                  className="w-full h-full"
                />

                {/* 좌우 버튼: 2장 이상일 때만 */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setImgIdx((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1,
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
            ) : ""}
          </div>
          </section>

          {/* 이미지 아래 좋아요, 조회수, 댓글 수 */}
          <section className="flex justify-between items-center" >
            <div className="flex items-center justify-start gap-[1.25rem]">
              <div className="flex gap-[0.62rem]">
                {/* 좋아요 클릭 시 반영되어야됨. 색 변동 */}
                <LikeIcon /> {post.likes}
              </div>
              <div className="flex gap-[0.62rem]">
                <CommentIcon /> {post.comments.length}
              </div>
              <div className="flex gap-[0.62rem]">
                <ViewIcon /> {post.watching}
              </div>
            </div>

            <div className="flex gap-[1.25rem] justify-center items-center">
              {/* 신고 및 공유 버튼 각자 모달 만들어야됨 */}
              <button>
                <ReportIcon />
              </button>
              <button>
                <ShareIcon />
              </button>
            </div>
          </section>

          {/* 댓글 영역은 나중에 컴포넌트로 분리 예정이라 placeholder만 */}
          <div className="mt-6 text-[#b2b2b2]">댓글 영역(추후 컴포넌트)</div>
        </section>
      )}
    </div>
  );
}
