import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostEditForm from "../../components/PostPage/edit/PostEditForm";
import { usePostDetail } from "../../hooks/post/usePostDetail";

export default function PostEditPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const numericPostId = Number(postId);

  // 너희 usePostDetail이 (postId)로 조회가 되는지, (selectedPostId)인지에 따라 그대로 사용
  const { data, loading, error } = usePostDetail(numericPostId);

  const targetPost = useMemo(() => {
    if (!data) return null;
    return (
      [data.postFailure, data.postOvercoming, data.postOvercome].find(
        (p) => p?.postId === numericPostId
      ) ?? null
    );
  }, [data, numericPostId]);

  const categoryId = data?.category?.categoryId; // 실제 필드명 맞춰

  if (loading) return <div>불러오는 중...</div>;
  if (error || !data) return <div>불러오기 실패</div>;
  if (!targetPost || !categoryId) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <PostEditForm
      postId={targetPost.postId}
      categoryId={categoryId}
      initialTitle={targetPost.title}
      initialContent={targetPost.content}
      initialImageUrls={targetPost.images ?? []}
      onCancel={() => navigate(-1)}
      onSuccess={() => navigate(`/posts/${targetPost.postId}`, { replace: true })}
    />
  );
}