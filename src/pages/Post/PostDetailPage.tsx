import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostDetail } from "../../hooks/post/usePostDetail";
import type { Situation, PostDetail } from "../../types/post";

import PostViewCard from "../../components/PostPage/PostView/PostViewCard";

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
        <>
        <PostViewCard post={post} categoryName={data.category.name} />

          {/* 댓글 영역은 나중에 컴포넌트로 분리 예정이라 placeholder만 */}
          <div className="mt-6 text-[#b2b2b2]">댓글 영역(추후 컴포넌트)</div>
        </>
      )}
    </div>
  );
}
