import { axiosInstance } from "../axios";
import { CommonResponse } from "../../types/Common";

type ReportCommentParams = {
    commentId: number;
    content:string;
};

export const postReportComment = async ({
    commentId,
    content,
}: ReportCommentParams) : Promise<CommonResponse<null>> => {
    const {data} = await axiosInstance.post<CommonResponse<null>>(
        `/posts/${commentId}/comments` ,
        {
            content
        }
    );
    console.log("댓글신고완료!",commentId)
    return data;
}