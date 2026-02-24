import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { Comment } from "../../../../types/comment";
import CommentItem from "../../Comment/CommentItem";

type Props = {
  comments?: Comment[];
  onOpenReport: (commentId: number) => void;

  replyingToId: number | null;
  onClickReply: (commentId: number) => void;

  onSubmitReply: (parentId: number, content: string) => void;
  isSubmittingReply?: boolean;
};

type Thread = {
  root: Comment;
  replies: Comment[];
};

const PAGE_SIZE = 5; // 한 페이지에 보여줄 "루트댓글(스레드)" 개수

export default function CommentListSection({
  comments,
  onOpenReport,
  replyingToId,
  onClickReply,
  onSubmitReply,
  isSubmittingReply,
}: Props) {
  const listTopRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(1);

  /** 1) 루트/대댓글 스레드 구성 */
  const threads: Thread[] = useMemo(() => {
    if (!comments) return [];

    const map = new Map<number, Comment[]>();
    const roots: Comment[] = [];

    for (const c of comments) {
      if (c.parentId == null) {
        roots.push(c);
      } else {
        const arr = map.get(c.parentId) ?? [];
        arr.push(c);
        map.set(c.parentId, arr);
      }
    }

    return roots.map((root) => ({
      root,
      replies: map.get(root.commentId) ?? [],
    }));
  }, [comments]);

  /** 2) 총 페이지 계산 + 현재 페이지 보정 */
  const totalPages = Math.max(1, Math.ceil(threads.length / PAGE_SIZE));

  useEffect(() => {
    // 댓글 수가 줄어들어 page가 범위 밖이면 보정
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  /** 3) 현재 페이지에 해당하는 스레드만 렌더 */
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const visibleThreads = threads.slice(start, end);

  /** 4) 페이지 변경 시 리스트 상단으로 이동 */
  useEffect(() => {
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  if (!comments || comments.length === 0) {
    return (
      <div className="py-10 text-center text-[#b2b2b2]">댓글이 없어요.</div>
    );
  }

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const goPrev = () => canPrev && setPage((p) => p - 1);
  const goNext = () => canNext && setPage((p) => p + 1);

  return (
    <section className="mt-[2.5rem] flex flex-col">
      <ul className="flex flex-col flex-1 overflow-hidden">
        {visibleThreads.map(({ root, replies }) => (
          <Fragment key={root.commentId}>
            <CommentItem
              comment={root}
              onOpenReport={onOpenReport}
              onClickReply={onClickReply}
              isReplying={replyingToId === root.commentId}
              onSubmitReply={onSubmitReply}
              isSubmittingReply={isSubmittingReply}
            />

            {replies.map((child) => (
              <CommentItem
                key={child.commentId}
                comment={child}
                onOpenReport={onOpenReport}
                onClickReply={onClickReply}
                isReplying={replyingToId === child.commentId}
                onSubmitReply={onSubmitReply}
                isSubmittingReply={isSubmittingReply}
                indent
              />
            ))}
          </Fragment>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="mt-auto pt-[1rem] flex items-center justify-center gap-[1.25rem]">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          className="w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center disabled:opacity-30"
          aria-label="이전 페이지"
        >
          <span className="text-[1.2rem] leading-none">‹</span>
        </button>

        <div className="text-[0.95rem] text-[#6f6f6f]">
          {page} / {totalPages}
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          className="w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center disabled:opacity-30"
          aria-label="다음 페이지"
        >
          <span className="text-[1.2rem] leading-none'">›</span>
        </button>
      </div>
    </section>
  );
}
