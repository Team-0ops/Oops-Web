import { axiosInstance } from "./axios";
import { CommonResponse } from "../types/Common";

// 카테고리 타입
export type BookmarkedCategory = {
  categoryId: number;
  categoryName: string;
};

// 카테고리 즐겨찾기 설정 API
export const setCategoryBookmark = async (
  categoryId: number
): Promise<CommonResponse<null>> => {
  const { data } = await axiosInstance.post(
    `/categories/${categoryId}/bookmark`
  );
  return data;
};

// 카테고리 즐겨찾기 해제 API
export const unsetCategoryBookmark = async (
  categoryId: number
): Promise<CommonResponse<null>> => {
  const { data } = await axiosInstance.delete(
    `/categories/${categoryId}/unbookmark`
  );
  return data;
};

// 즐겨찾기한 카테고리 전체 조회 API
export const getBookmarkedCategories = async (): Promise<
  CommonResponse<BookmarkedCategory[]>
> => {
  const { data } = await axiosInstance.get("/categories/bookmarked/all");
  return data;
};
