export type GetMyProfileResponse = {
    userName: string;
    email: string | null;
    profileImageUrl: string | null;
    point: number;
    commentReportCount: number;
    postReportCount: number;
}

export type GetMyPostsResponse = {
    postId: number;
    title: string;
    content: string;
    categoryOrTopicName:string;
    situation: "OOPS" | "OVERCOMING" | "OVERCOME";
    likes: number;
    watching: number;
    imageUrls: string[]|null;
}

export type GetMyLessonsResponse = {
    lessonId: number;
    title: string;
    content: string;
    tags: string[];
    postId: number;
    postTitle: string;
    postContent: string;
    categoryName: string;
    topicName: string | null;
    postImageUrls: string[] |null;
    postStatus: string;
}

/////////////////////////////////////////////////////////
// params 정의

export type GetMyPostsParams = {
    categoryId?: number;
    topicId?: number;
    situation?: "OOPS" | "OVERCOMING" | "OVERCOME" ;
}

export type GetMyLessonsParams = {
    tag?: string[];
}

export type editMyProfileParams = {
    userName: string;
    profileImage?: File;
}