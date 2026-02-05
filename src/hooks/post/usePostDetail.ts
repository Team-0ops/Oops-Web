import { useEffect, useState } from "react";
import { getPostDetail } from "../../apis/Post/getPostDetail";
import { PostDetailResponse } from "../../types/post";

export const usePostDetail = (postId: number) => {
  const [data, setData] = useState<PostDetailResponse | null>(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!postId) return;

    let mounted = true;

    (async () => {
      try {
        // data가 없을 때만 loading 표시
        if (!data) setLoading(true);
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
  }, [postId]); // 의도적으로 data는 deps에서 제외

  return { data, loading, error };
};
