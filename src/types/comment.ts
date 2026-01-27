export type Comment = {
    commentId: number;
    userId: number;

    content: string;
    createdAt: string;

    imageUrl: string | null;
    likes: number;
    childCommentCount: number;
};