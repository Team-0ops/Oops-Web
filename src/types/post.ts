import { wantedCommentType } from "./Common";
import {CommonResponse} from "./Common.ts";

export type MyPost = {
  postId: number;
  title: string;
  situation: "OOPS" | "OVERCOMING" | "OVERCOME";
  content: string;
  categoryName: string;
  imageUrl?: string;
};

export type GetMyPostsResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MyPost[];
};

// 게시글 작성 post 요청 타입
export type CreatePostPayload = {
  title: string;
  content: string;
  situation: "OOPS" | "OVERCOMING" | "OVERCOME";
  categoryId: number;
  topicId: number | null;
  previousPostId: number | null;
  wantedCommentTypes: wantedCommentType[];
};


export type GetCreatePostsResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  paageInfo: {
    page: number;
    size: number;
    hasNext: boolean;
    totalElements: number;
    totalPages: number;
  };
};

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
