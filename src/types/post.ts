import { Category } from "./category.ts";
import { Comment } from "./comment.ts";
import { CategoryName, wantedCommentType } from "./Common";
import { CommonResponse } from "./Common.ts";

export type Situation = "OOPS" | "OVERCOMING" | "OVERCOME";

export type MyPost = {
  postId: number;
  title: string;
  situation: Situation;
  content: string;
  categoryName: CategoryName;
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
  result:{
    imageUrls?:string[];
    message:string;
    postId:number;
  }
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

export type ResponseBestPostListDTO = CommonResponse<{
  comment: string;
  posts: Post[];
  last: boolean;
}>;

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
};

export type PostDetailResponse = {
  groupId: number;
  category: Category;

  postFailure: PostDetail | null;
  postOvercoming: PostDetail | null;
  postOvercome: PostDetail | null;

  randomTopics: unknown | null;
};

///////////////////////////////////////////////////////////////////
//게시글 신고 응답
export type ReportResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
};

// 게시글 모달 댓글과 게시글 모두 합치기위해서 분기를 나누기 위한 타입
export type ReportTarget =
  | { type: "POST"; postId: number }
  | { type: "COMMENT"; commentId: number };

//////////////////////////////////////////////////////////////
// 유사한 게시글 추천
export type RecommendResponse ={
    postId: number;
    title: string;
    content: string;
    categoryOrTopicName: string;
    likes: number;
    comments: number;
    views: number;
    image: string | null;
};

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

export type RecommendList = {
  similarPosts : RecommendResponse[] 
}

/////////////////////////////////////////////////////////
// 교훈 조회 응답 타입
export type GetLessonResult = {
  title: string;
  content: string;
  tagNames: string[];
}
