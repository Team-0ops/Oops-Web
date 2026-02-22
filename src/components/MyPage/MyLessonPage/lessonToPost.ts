// PostCard 재사용을위한 어뎁터용 훅
import type {
  GetMyLessonsResponse,
  GetMyPostsResponse,
} from "../../../types/MyPage";

export const lessonToPost = (
  lesson: GetMyLessonsResponse
): GetMyPostsResponse => {
  return {
    postId: lesson.postId,
    title: lesson.postTitle,
    content: lesson.postContent,
    categoryOrTopicName: lesson.topicName ?? lesson.categoryName,
    situation: (lesson.postStatus as GetMyPostsResponse["situation"]) ?? "OOPS",
    likes: 0,
    watching: 0,
    imageUrls: lesson.postImageUrls ?? null,
  };
};
