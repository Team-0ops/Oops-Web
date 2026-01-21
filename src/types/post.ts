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
