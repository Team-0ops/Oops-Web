//Report 모달을 게시글과 댓글에서 재사용이 가능하기 위헤서는 부모컨테이너에서 type별로 분기를 나눠줘야함ㅁ
import { useState, useEffect } from "react";

import Report from "./Report";
import { ReportTarget } from "../../../types/post";

import { useReportComments } from "../../../hooks/modal/useReportComments";
import { useReportPost } from "../../../hooks/modal/useReportPost";

type Props = {
  isOpen: boolean;
  target: ReportTarget | null;
  onClose: () => void;
};

type ErrorState = {
  isError: boolean;
  message: string;
};

export default function ReportModalContainer({
  isOpen,
  target,
  onClose,
}: Props) {
  const reportPost = useReportPost();
  const reportComment = useReportComments();

  const [error, setError] = useState<ErrorState>({
    isError: false,
    message: "",
  });

  useEffect(() => {
    if (isOpen) {
      setError({ isError: false, message: "" });
    }
  }, [isOpen, target]);

  if (!isOpen || !target) return null;

  const handleSubmit = (payload: { content: string }) => {
    setError({ isError: false, message: "" });

    if (target.type === "POST") {
      reportPost.mutate(
        { postId: target.postId, ...payload },
        {
          onSuccess: () => {
            setError({ isError: false, message: "" });
            onClose();
          },
          onError: (err) => {
            if (err instanceof Error) {
              setError({
                isError: true,
                message: err.message,
              });
              return;
            }

            setError({
              isError: true,
              message: "신고 처리 중 오류가 발생했습니다.",
            });
          },
        }
      );
      return;
    }

    if (target.type === "COMMENT") {
      reportComment.mutate(
        { commentId: target.commentId, ...payload },
        {
          onSuccess: () => {
            setError({ isError: false, message: "" });
            onClose();
          },
          onError: (err) => {
            if (err instanceof Error) {
              setError({
                isError: true,
                message: err.message,
              });
              return;
            }

            setError({
              isError: true,
              message: "신고 처리 중 오류가 발생했습니다.",
            });
          },
        }
      );
      return;
    }
  };
  return (
    <Report
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      target={target}
      isSubmitting={reportPost.isPending || reportComment.isPending}
      error={error}
      onClearError={() => setError({ isError: false, message: "" })}
    />
  );
}
