//게시글에 대한 댓글 조회 api 훅

import { CommentSortType } from "../../types/comment";
import { axiosInstance } from "../axios";

type GetPostCommentsParams = {
    postId: number;
    sortType: CommentSortType;
}

export const getPostComments = async({postId, sortType}: GetPostCommentsParams) => {
    const res = await axiosInstance.get(
        `/post/${postId}/comments`, {params:{sortType}}
    );
    return res.data.result
}