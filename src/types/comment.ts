export type Comment = {
    commentId: number;
    userId: number;
    userName: string;
    content: string;
    createdAt: string;
    parentId: number | null;
    imageUrl: string | null;
    likes: number;
    liked: boolean;
    childCommentCount: number;
};

export type CommentSortType = "LIKE" | "RECENT"

export type CommentListResponse = Comment[];