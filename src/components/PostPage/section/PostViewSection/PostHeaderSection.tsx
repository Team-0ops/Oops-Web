import type { PostDetail } from "../../../../types/post";

import LikedIcon from "../../../../assets/icons/LikedIcon.svg?react";
import CommentIcon from "../../../../assets/icons/CommentIcon.svg?react";
import ViewIcon from "../../../../assets/icons/ViewIcon.svg?react";
import LessonButtonIcon from "../../../../assets/icons/LessonButtonIcon.svg?react";

type Props = {
  post: PostDetail;
  categoryName?: string;
};

export default function PostHeaderSection({ post, categoryName }: Props) {
  return (
    <section className="flex flex-col gap-[1.25rem]">
      {/* 카테고리 */}
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
  );
}
