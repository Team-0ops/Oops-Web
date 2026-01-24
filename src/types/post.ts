import {CommonResponse} from "./Common.ts";

export type Post = {
    postId: number;
    title: string;
    content: string;
    categoryOrTopicName: string;
    likes: number;
    comments: number;
    views: number;
    image: string | null;
};

export type ResponseBestPostListDTO = CommonResponse<
    {
        comment: string;
        posts: Post[];
        last: boolean;
    }
>;