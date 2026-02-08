import { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePostDetail } from "../../hooks/post/usePostDetail";
import type { Situation, PostDetail } from "../../types/post";
import { ReportTarget } from "../../types/post";

import { useGetLesson } from "../../hooks/modal/useGetLesson";

import PostViewCard from "../../components/PostPage/PostView/PostViewCard";
import CommentCard from "../../components/PostPage/Comment/CommentCard";
import ReportModalContainer from "../../components/PostPage/modal/ReportContainer";
import RecommendCard from "../../components/PostPage/PostView/RecommendCard";
import Lesson from "../../components/PostPage/modal/Lesson";

const LABEL: Record<Situation, string> = {
  OOPS: "웁스 중",
  OVERCOMING: "극복 중",
  OVERCOME: "극복 완료",
};

type StageKey = Situation;

export default function PostDetailPage() {
  const myUserId = Number(localStorage.getItem("userId"));
  const safeMyUserId = Number.isFinite(myUserId) ? myUserId : undefined;
  
  const navigate = useNavigate();
  const { postId } = useParams();
  const numericPostId = Number(postId);

  const [selectedPostId, setSelectedPostId] = useState<number>(numericPostId);

  const { data, loading, error } = usePostDetail(selectedPostId);

    // 교훈 조회 
  const {data:lesson, isLoading: isLessonLoading} = useGetLesson(selectedPostId);


  //stage별 게시글 매핑
  const stageMap = useMemo(() => {
    if (!data) return null;
    return {
      OOPS: data.postFailure,
      OVERCOMING: data.postOvercoming,
      OVERCOME: data.postOvercome,
    } as Record<StageKey, PostDetail | null>;
  }, [data]);

  const [activeStage, setActiveStage] = useState<StageKey>("OOPS");

  //URL이 바뀌면 selectedPostId 동기화
  useEffect(() => {
    if (!Number.isNaN(numericPostId)) {
      setSelectedPostId(numericPostId);
    }
    console.log("현재 postID", selectedPostId);
  }, [numericPostId]);

  //selectedPostId가 어느 stage인지 찾아서 탭 동기화
  useEffect(() => {
    if (!stageMap) return;

    const found: StageKey | null =
      stageMap.OOPS?.postId === selectedPostId
        ? "OOPS"
        : stageMap.OVERCOMING?.postId === selectedPostId
          ? "OVERCOMING"
          : stageMap.OVERCOME?.postId === selectedPostId
            ? "OVERCOME"
            : null;

    if (found) setActiveStage(found);
  }, [stageMap, selectedPostId]);

  const post = stageMap?.[activeStage] ?? null;

  // 탭 disabled 여부
  const isDisabled = (s: StageKey) => !stageMap?.[s];

  const tabBase =
    "flex w-full items-center justify-center rounded-[1.88rem] py-[0.69rem] px-[1.25rem] transition-colors";
  const tabActive =
    "bg-[#b3e378] text-[#111] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] cursor-pointer";
  const tabIdle = "bg-[#FAF6E9] ";
  const tabDisabled = "bg-[#FAF6E9] text-[#b2b2b2]";

  // 신고 대상 상태 관리
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null);

  const openPostReport = (postId: number) =>
    setReportTarget({ type: "POST", postId });

  const openCommentReport = (commentId: number) =>
    setReportTarget({ type: "COMMENT", commentId });

  const closeReport = () => setReportTarget(null);

    // 교훈 모달 상태관리
    const [isLessonOpen, setIsLessonOpen] = useState(false);
  
  if (loading && !data)
    return (
      <div className="py-10 text-center text-[#b2b2b2]">불러오는 중...</div>
    );
  if (error || !data || !stageMap)
    return (
      <div className="py-10 text-center text-[#b2b2b2]">불러오기 실패</div>
    );


  return (
    <div className="w-full flex flex-col px-[3.63rem] gap-[2.5rem]">
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

                const nextId = stageMap?.[s]?.postId;
                if (nextId) {
                  setSelectedPostId(nextId);
                  navigate(`/posts/${nextId}`, { replace: true });
                }
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
        <>
          <div className="px-[3.12rem]">
            <PostViewCard
              key={post.postId}
              post={post}
              categoryName={data.category.name}
              onOpenPostReport={openPostReport}
              onClickLesson={() => setIsLessonOpen(true)}
              lesson={lesson ?? null}
              isLessonLoading={isLessonLoading}
              currentUserId={safeMyUserId}
            />
          </div>
          <div className="mt-[1.25rem]">
            <CommentCard
              postId={post.postId}
              onOpenCommentReport={openCommentReport}
            />
          </div>
          <div className="mt-[10rem] px-[3.12rem]">
            <RecommendCard
              postId={post.postId}
              categoryName={data.category.name}
            />
          </div>
          <ReportModalContainer
            isOpen={!!reportTarget}
            target={reportTarget}
            onClose={closeReport}
          />
          {isLessonOpen && <Lesson postId={selectedPostId} onClose={() => setIsLessonOpen(false)} />}
        </>
      )}
    </div>
  );
}
