//Report 모달을 게시글과 댓글에서 재사용이 가능하기 위헤서는 부모컨테이너에서 type별로 분기를 나눠줘야함ㅁ
// src/components/Report/ReportModalContainer.tsx
import Report from "./Report";
import { ReportTarget } from "../../../types/post";

import { useReportComments } from "../../../hooks/modal/useReportComments";
import { useReportPost } from "../../../hooks/modal/useReportPost";

type Props = {
  isOpen: boolean;
  target: ReportTarget | null;
  onClose: () => void;
};

export default function ReportModalContainer({
  isOpen,
  target,
  onClose,
}: Props) {
  const reportPost = useReportPost();
  const reportComment = useReportComments();

  if (!isOpen || !target) return null;

  const handleSubmit = (payload: {
    content: string;
  }) => {
    if (target.type === "POST") {
      reportPost.mutate(
        { postId: target.postId, ...payload },
        { onSuccess: onClose }
      );
      return;
    }

    reportComment.mutate(
      { commentId: target.commentId, ...payload },
      { onSuccess: onClose }
    );
  };

  return (
    <Report
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      target={target}
      isSubmitting={reportPost.isPending || reportComment.isPending}
    />
  );
}
