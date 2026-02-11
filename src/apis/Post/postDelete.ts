import { axiosInstance } from "../axios";
import { CommonResponse } from "../../types/Common";

type PostDeleteParams = {
    postId: number;
}

export const postDelete = async ({postId}:PostDeleteParams): Promise<CommonResponse<null>> => {
    const {data} = await axiosInstance.post(`posts/${postId}`);
    return data;
}