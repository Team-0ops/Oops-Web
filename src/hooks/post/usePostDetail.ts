import { useEffect, useState } from "react";
import { getPostDetail } from "../../apis/Post/getPostDetail";
import { PostDetailResponse } from "../../types/post";

export const usePostDetail = (postId: number) => {
  const [data, setData] = useState<PostDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!postId) return;

    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getPostDetail(postId);
        if (mounted) setData(result);
      } catch (e) {
        if (mounted) setError(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [postId]);

  return { data, loading, error };
};