import { useNavigate } from "react-router-dom";
import { useRecommendPosts } from "../../../hooks/post/postviewhook/useRecommendPosts";

type RecommendCardProps = {
  postId: number;
  categoryName: string;
};

export default function RecommendCard({ postId, categoryName }: RecommendCardProps) {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useRecommendPosts(postId);

  const list = Array.isArray(data?.similarPosts) ? data.similarPosts : [];

  if (isLoading) {
    return <div className="py-6 text-center text-[#b2b2b2]">추천글 불러오는 중...</div>;
  }

  if (isError) {
    return <div className="py-6 text-center text-[#b2b2b2]">추천글 불러오기 실패</div>;
  }

  if (list.length === 0) {
    return <div className="py-6 text-center text-[#b2b2b2]">추천글이 없어요.</div>;
  }

  return (
    <section className="w-full">
      <h3 className="text-[1rem] font-semibold text-[#111]">
        {categoryName} 카테고리 추천글
      </h3>

      <ul className="w-full">
        {list.map((post, idx) => (
          <li key={post.postId ?? idx}>
            <button
              type="button"
              className="w-full text-left py-[1.25rem] text-[#111] cursor-pointer"
              onClick={() => navigate(`/posts/${post.postId}`)}
            >
              {post.title}
            </button>

         <hr className="border-[#e4e4e4]" />
          </li>
        ))}
      </ul>
    </section>
  );
}
