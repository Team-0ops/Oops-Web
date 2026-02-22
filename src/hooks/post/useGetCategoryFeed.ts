import { useState, useEffect } from "react";
import { getCategoryFeed } from "../../apis/posts";
import { CategoryFeedParams, ResponseCategoryFeedDTO } from "../../types/post";

export const useGetCategoryFeed = (params: CategoryFeedParams) => {
  const [data, setData] = useState<ResponseCategoryFeedDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // categoryId가 0 이하면 API 호출하지 않음
    if (params.categoryId <= 0) {
      setIsLoading(false);
      setData(null);
      setError(null);
      return;
    }

    let mounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getCategoryFeed(params);
        if (mounted) setData(res);
      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    void fetchData();

    return () => {
      mounted = false;
    };
  }, [params.categoryId, params.situation, params.page, params.limit, params.sort]);

  return { data, isLoading, error };
};
