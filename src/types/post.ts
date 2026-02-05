import { Category } from "./category.ts";
import { Comment } from "./comment.ts";
import { wantedCommentType } from "./Common";
import {CommonResponse} from "./Common.ts";

export type Situation = "OOPS" | "OVERCOMING" | "OVERCOME";

export type MyPost = {
  postId: number;
  title: string;
  situation: Situation;
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

// 게시글 작성 post 응답 타입
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

////////////////////////////////////////////////////////////

// 게시글 상세 조회 응답 타입

export type PostDetail = {
  postId: number;
  userId: number;

  title: string;
  content: string;
  created_at: string;

  images: string[] | null;
  profileImage: string | null;
  nickname: string;

  likes: number;
  liked: boolean;
  watching: number;

  wantedCommentTypes: wantedCommentType[];

  comments: Comment[];
}

export type PostDetailResponse = {
  groupId: number;
  category: Category;

  postFailure: PostDetail | null;
  postOvercoming: PostDetail | null;
  postOvercome: PostDetail | null;

  randomTopics : unknown | null;
}

///////////////////////////////////////////////////////////////////
//게시글 신고 응답 
export type ReportResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
}
