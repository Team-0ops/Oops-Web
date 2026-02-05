import { axiosInstance } from "../axios";
import { CommonResponse } from "../../types/Common";
import { RecommendList } from "../../types/post";

export const getRecommend = async (postId: number): Promise<RecommendList> => {
    const res = await axiosInstance.get<CommonResponse<RecommendList>>(
        `/posts/${postId}/recommendations`
    );
    console.log("digh", res.data.result)
    return res.data.result
}