import { useMutation } from "@tanstack/react-query";
import { postReportComment } from "../../apis/Comment/postReportComment";

type Variables = {
    commentId : number;
    content: string;
}

export const useReportComments = () => {
    return useMutation({
        mutationFn:({commentId, content}:Variables) => postReportComment({commentId, content})
    });
};