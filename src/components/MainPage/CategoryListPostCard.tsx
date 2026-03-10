import { useNavigate } from "react-router-dom";
import Like from "../../assets/icons/Like.svg?react";
import Comment from "../../assets/icons/Comment.svg?react";
import type { Post } from "../../types/post";

type Props = {
  categoryName?: string;
  post?: Post | null;
};

export const CategoryListPostCard = ({ categoryName, post }: Props) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (post) navigate(`/posts/${post.postId}`);
  };

  const title = post?.title ?? "아직 게시글이 없어요";
  const content = post?.content ?? "해당 카테고리의 첫 글을 작성해 보세요!";
  const likes = post?.likes ?? 0;
  const comments = post?.comments ?? 0;
  const isClickable = !!post;

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? handleCardClick : undefined}
      onKeyDown={
        isClickable
          ? (e) => e.key === "Enter" && handleCardClick()
          : undefined
      }
      className={`flex flex-col gap-7.5 ${isClickable ? "cursor-pointer hover:opacity-80" : ""}`}
    >
      <div className="flex flex-col gap-3.75 text-[#262627]">
        <div className="h3">{title}</div>
        <div className="body3 line-clamp-2">{content}</div>
      </div>
      <div className="caption3 flex justify-between items-center self-stretch">
        <div className="flex gap-7.5 items-center">
          <div className="flex gap-2.5 items-center">
            <div className="w-8 h-8 bg-[#D2D2D2] rounded-[3.125rem]" />
            <span>닉네임최대</span>
          </div>
          <div className="flex gap-5">
            <div className="flex items-center gap-2.5">
              <Like />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Comment />
              <span>{comments}</span>
            </div>
          </div>
        </div>
        <span className="caption1 px-4 py-2 rounded-[1.875rem] border border-[#B3E378] bg-[#E6F3D7]">
          {categoryName ?? "카테고리"}
        </span>
      </div>
    </div>
  );
};