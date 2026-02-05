import type { PostDetail } from "../../../../types/post";

import LikeIcon from "../../../../assets/icons/LikeIcon.svg?react";
import LikedIcon from "../../../../assets/icons/LikedIcon.svg?react";
import CommentIcon from "../../../../assets/icons/CommentIcon.svg?react";
import ViewIcon from "../../../../assets/icons/ViewIcon.svg?react";
import ReportIcon from "../../../../assets/icons/ReportIcon.svg?react";
import ShareIcon from "../../../../assets/icons/ShareIcon.svg?react";

import ShareModal from "../../modal/ShareModal";

import { usePostCheers } from "../../../../hooks/post/postviewhook/usePostCheers";

type Props = {
  post: PostDetail;
  shareRef: React.RefObject<HTMLDivElement | null>;
  isShareOpen: boolean;
  onToggleShare: () => void;
  onCloseShare: () => void;
  onOpenReport: () => void;
};

export default function PostFooterSection({
  post,
  shareRef,
  isShareOpen,
  onToggleShare,
  onCloseShare,
  onOpenReport,
}: Props) {
  const postId = post.postId;

  const initialCheered = post.liked;

  const { isCheered, likes, toggleCheer, isPending } = usePostCheers({
    postId,
    initialLikes: post.likes,
    initialCheered,
  });

  return (
    <section className="flex justify-between items-center">
      <div className="flex items-center justify-start gap-[1.25rem]">
        <button
          type="button"
          onClick={toggleCheer}
          disabled={isPending}
          className="flex gap-[0.62rem] items-center cursor-pointer disabled:opacity-60"
          aria-pressed={isCheered}
        >
          {isCheered ? <LikedIcon /> : <LikeIcon />}
          {likes}
        </button>
        <div className="flex gap-[0.62rem]">
          <CommentIcon /> {post.comments.length}
        </div>
        <div className="flex gap-[0.62rem]">
          <ViewIcon /> {post.watching}
        </div>
      </div>

      <div className="flex gap-[1.25rem] justify-center items-center">
        <button className="cursor-pointer" type="button" onClick={onOpenReport}>
          <ReportIcon />
        </button>

        <div className="relative" ref={shareRef}>
          <button
            className="cursor-pointer"
            type="button"
            onClick={onToggleShare}
          >
            <ShareIcon />
          </button>

          <ShareModal
            isOpen={isShareOpen}
            onClose={onCloseShare}
            url={window.location.href}
          />
        </div>
      </div>
    </section>
  );
}
