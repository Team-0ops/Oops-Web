import { useState, useEffect } from "react";
import { getBestFeed } from "../../apis/posts";
import { BestFeedParams, ResponseBestFeedDTO } from "../../types/post";

export const useGetBestFeed = (params: BestFeedParams) => {
  const [data, setData] = useState<ResponseBestFeedDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getBestFeed(params);
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
  }, [params.page, params.limit, params.sort]);

  return { data, isLoading, error };
};
