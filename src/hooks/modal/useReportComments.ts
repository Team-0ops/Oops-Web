import { useMutation } from "@tanstack/react-query";
import { postReportComment } from "../../apis/Comment/postReportComment";
import axios from "axios";

export const useReportComments = () => {
  return useMutation({
    mutationFn: async (params: { commentId: number; content: string }) => {
      try {
        return await postReportComment(params);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 400) {
            if (message === "자기 자신의 댓글/게시글은 신고할 수 없습니다.") {
              throw new Error(message);
            }

            if (message === "이미 신고한 댓글/게시글입니다.") {
              throw new Error(message);
            }
          }
        }
        throw new Error("신고 처리 중 오류가 발생했습니다.");
      }
    },
  });
};
