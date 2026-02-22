import { useState, useEffect } from "react";
import { getCurrentRandomTopicFeed } from "../../apis/posts";
import { RandomFeedParams, ResponseRandomFeedDTO } from "../../types/post";

export const useGetRandomTopicFeed = (
  params: RandomFeedParams
) => {
  const [data, setData] = useState<ResponseRandomFeedDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getCurrentRandomTopicFeed(params);
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
  }, [params.situation, params.page, params.limit, params.sort]);

  return { data, isLoading, error };
};
