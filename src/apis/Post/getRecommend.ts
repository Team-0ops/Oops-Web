import { axiosInstance } from "../axios";
import { CommonResponse } from "../../types/Common";
import { RecommendList } from "../../types/post";

export const getRecommend = async (postId: number): Promise<RecommendList> => {
    const res = await axiosInstance.get<CommonResponse<RecommendList>>(
        `/posts/${postId}/recommendations`
    );
    return res.data.result
}