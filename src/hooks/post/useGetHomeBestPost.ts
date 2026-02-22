import useGetPostListBase from "./useGetPostListBase.ts";
import {getBestPostListInMainPage} from "../../apis/posts.ts";

export const useGetHomeBestPost = () => {
    return useGetPostListBase(getBestPostListInMainPage);
};