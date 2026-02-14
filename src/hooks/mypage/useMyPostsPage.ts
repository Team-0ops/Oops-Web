import { useMemo, useState } from "react";
import { useMyPosts } from "./useMyPost";
import type { GetMyPostsParams, GetMyPostsResponse } from "../../types/MyPage";

type Situation = GetMyPostsParams["situation"];
// 상황별로 탭 구분 / 카테고리 id값 구분 / 실제 포스트 조회 훅
export const useMyPostsPage = () => {
    const [situation, setSituation] = useState<Situation>("OOPS");
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  
    const params: GetMyPostsParams = useMemo(
      () => ({
        situation,
        categoryId,
        // TODO topicId값도 넣어야됨 
      }),
      [situation, categoryId]
    );
  
    const query = useMyPosts(params);
  
    // result가 배열/단일 모두 대응 (타입 파일은 그대로 둔 채 안전처리)
    const posts: GetMyPostsResponse[] = useMemo(() => {
      const r: any = query.data?.result;
      if (!r) return [];
      return Array.isArray(r) ? r : [r];
    }, [query.data?.result]);
  
    const changeSituation = (next: Situation) => setSituation(next);
    const changeCategoryId = (next?: number) => setCategoryId(next);
  
    return {
      situation,
      categoryId,
      changeSituation,
      changeCategoryId,
  
      query,
      posts,
  
      isLoading: query.isLoading,
      isError: query.isError,
    };
  };