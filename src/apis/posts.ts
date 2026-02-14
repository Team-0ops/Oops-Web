import {ResponseBestPostListDTO, ResponseRandomFeedDTO, RandomFeedParams, ResponseCategoryFeedDTO, CategoryFeedParams, ResponseBestFeedDTO, BestFeedParams} from "../types/post.ts";
import {axiosInstance} from "./axios.ts";

export const getBestPostListInMainPage =
    async (): Promise<ResponseBestPostListDTO> => {
        const { data } = await axiosInstance.get("/feeds/home/best");
        return data;
    };

// 이번주 랜덤 주제 피드 API
export const getCurrentRandomTopicFeed = async (
    params: RandomFeedParams
): Promise<ResponseRandomFeedDTO> => {
    const { data } = await axiosInstance.get("/feeds/randomTopic/current/all", {
        params: {
            situation: params.situation,
            page: params.page ?? 0,
            limit: params.limit ?? 10,
            sort: params.sort ?? "LATEST",
        },
    });
    return data;
};

// 카테고리별 피드 API
export const getCategoryFeed = async (
    params: CategoryFeedParams
): Promise<ResponseCategoryFeedDTO> => {
    const { data } = await axiosInstance.get(`/feeds/categories/${params.categoryId}/all`, {
        params: {
            situation: params.situation,
            page: params.page ?? 0,
            limit: params.limit ?? 10,
            sort: params.sort ?? "LATEST",
        },
    });
    return data;
};

// 베스트 Failer 피드 API
export const getBestFeed = async (
    params: BestFeedParams
): Promise<ResponseBestFeedDTO> => {
    const { data } = await axiosInstance.get("/feeds/best/all", {
        params: {
            page: params.page ?? 0,
            limit: params.limit ?? 10,
            sort: params.sort ?? "LATEST",
        },
    });
    return data;
};