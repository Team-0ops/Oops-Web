export const myPageKeys = {
  all: ["myPage"] as const,

  profile: () => [...myPageKeys.all, "profile"] as const,

  posts: (params: { categoryId?: number; topicId?: number; situation?: string }) =>
    [...myPageKeys.all, "posts", params] as const,

  lessons: (params: { tag?: string }) =>
    [...myPageKeys.all, "lessons", params] as const,
};



