import type { Comment } from "../../../../types/comment";
import CommentItem from "../../Comment/CommentItem";

type Props = {
  comments?: Comment[];
  onOpenReport: (commentId: number) => void;
};

function CommentListSection({ comments, onOpenReport }: Props) {
  if (!comments || comments.length === 0) {
    return (
      <div className="py-10 text-center text-[#b2b2b2]">댓글이 없어요.</div>
    );
  }

  console.log("댓글들", comments)
  return (
    <section className="mt-[2.5rem]">
      <ul className="flex flex-col">
        {comments.map((comment) => (
          <CommentItem
            key={comment.commentId}
            comment={comment}
            onOpenReport={onOpenReport}
          />
        ))}
      </ul>
    </section>
  );
}

export default CommentListSection;
