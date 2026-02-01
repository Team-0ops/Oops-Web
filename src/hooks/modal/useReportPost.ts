import { useMutation } from "@tanstack/react-query";
import { reportPost } from "../../apis/Post/reportPost"; 

type Variables = {
  postId: number;
  content: string;
};

export const useReportPost = () => {
    return useMutation({
    mutationFn: ({ postId, content }: Variables) => reportPost({ postId, content }),
  });
};
