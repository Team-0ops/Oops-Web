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

// 랜덤 피드 API 파라미터 타입
export type RandomFeedParams = {
  situation: "OOPS" | "OVERCOMING" | "OVERCOME";
  page?: number;
  limit?: number;
  sort?: "LATEST" | "LIKE" | "VIEW" | "COMMENT" | "BEST";
};

// 랜덤 피드 응답 타입
export type RandomFeedResult = {
  comment: string; // 랜덤 주제 이름
  posts: Post[];
  last: boolean;
};

export type ResponseRandomFeedDTO = CommonResponse<RandomFeedResult>;

// 카테고리 피드 API 파라미터 타입
export type CategoryFeedParams = {
  categoryId: number;
  situation: "OOPS" | "OVERCOMING" | "OVERCOME";
  page?: number;
  limit?: number;
  sort?: "LATEST" | "LIKE" | "VIEW" | "COMMENT";
};

// 카테고리 피드 응답 타입
export type CategoryFeedResult = {
  posts: Post[];
  last: boolean;
};

export type ResponseCategoryFeedDTO = CommonResponse<CategoryFeedResult>;

// 베스트 피드 API 파라미터 타입
export type BestFeedParams = {
  page?: number;
  limit?: number;
  sort?: "BEST" | "LATEST" | "LIKE" | "VIEW" | "COMMENT";
};

// 베스트 피드 응답 타입
export type BestFeedResult = {
  posts: Post[];
  last: boolean;
};

export type ResponseBestFeedDTO = CommonResponse<BestFeedResult>;