import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { usePostDetail } from "../../hooks/post/usePostDetail";
import {Situation } from "../../types/post";

const order: Record<Situation, number> = { OOPS: 0, OVERCOMING: 1, OVERCOME: 2 };

const label: Record<Situation, string> = {
  OOPS: "웁스 중",
  OVERCOMING: "극복 중",
  OVERCOME: "극복 완료",
};

export default function PostDetailPage() {
  const { postId } = useParams();
  const numericPostId = Number(postId);

  const { data, loading, error } = usePostDetail(numericPostId);


  if (loading) return <div className="py-10 text-center text-[#b2b2b2]">불러오는 중...</div>;
  if (error || !data) return <div className="py-10 text-center text-[#b2b2b2]">불러오기 실패</div>;

  console.log("data:", data);
  return (
    <div className="w-full max-w-[56rem] mx-auto flex flex-col gap-6 py-8">
      {/* 상단: 카테고리/그룹 */}

      <div className="flex items-center justify-between">
        <div className="text-[1.25rem] font-semibold">{data.category.categoryId}</div>
        {data.postFailure?.content}
      </div>
      </div>
  );
}