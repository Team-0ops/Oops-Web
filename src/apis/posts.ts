import {ResponseBestPostListDTO} from "../types/post.ts";
import {axiosInstance} from "./axios.ts";

export const getBestPostListInMainPage =
    async (): Promise<ResponseBestPostListDTO> => {
        const { data } = await axiosInstance.get("/feeds/home/best");
        return data;
    };