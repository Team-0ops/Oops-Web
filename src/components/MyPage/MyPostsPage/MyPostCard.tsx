import type { GetMyPostsResponse } from "../../../types/MyPage";
import { useNavigate } from "react-router-dom";

export default function MyPostCard({ post }: { post: GetMyPostsResponse }) {
  const img = post.imageUrls?.[0] ?? null;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${post.postId}`);
  };

  return (
    <article
      onClick={handleClick}
      className="w-full cursor-pointer mt-[1.88rem] border-b border-[#d2d2d2] pb-[1.88rem] flex justify-between gap-[3.12rem]"
    >
      <div className="flex flex-col flex-1">
        <div className="text-[0.95rem] font-semibold text-[#111] mb-[0.94rem] line-clamp-1">
          {post.title}
        </div>

        <div className="text-[0.85rem] min-h-[2.125rem] text-[#666] leading-[1.5] line-clamp-2">
          {post.content}
        </div>

        <div className="mt-[1.88rem] flex justify-end">
          <span
            className="inline-flex items-center justify-center w-[6.25rem] h-[2.25rem] rounded-[1.88rem]
                             bg-[#E6F3d7] border-[0.06rem] border-[#b3e378] text-[#111] text-[0.75rem] font-semibold"
          >
            {post.categoryOrTopicName}
          </span>
        </div>
      </div>

      <div className="w-[10.625rem] h-[10.625rem] rounded-[0.25rem] bg-[#f3f3f3] overflow-hidden shrink-0">
        {img ? (
          <img src={img} alt="" className="w-full h-full object-cover" />
        ) : null}
      </div>
    </article>
  );
}
