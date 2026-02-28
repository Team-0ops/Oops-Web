import { useEffect, useState } from "react";
import { getPostDetail } from "../../apis/Post/getPostDetail";
import { PostDetailResponse } from "../../types/post";
import { useNavigate } from "react-router-dom";

export const usePostDetail = (postId: number) => {
  const [data, setData] = useState<PostDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) return;

    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getPostDetail(postId);
        if (mounted) setData(result);
      } catch (e: any) {
        if (!mounted) return;

        // 에러 분기 처리
        const status = e?.response?.status || e?.status;

        if (status === 403) {
          alert("로그인이 필요합니다");
          navigate("/login");
          return; // 에러 상태를 굳이 set 하지 않고 종료 가능
        }

        setError(e);
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