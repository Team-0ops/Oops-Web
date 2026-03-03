import { CommonResponse } from "../types/Common";
import {
  GetMyPostsParams,
  GetMyProfileResponse,
  GetMyPostsResponse,
  GetMyLessonsParams,
  GetMyLessonsResponse,
  editMyProfileParams,
} from "../types/MyPage";
import { axiosInstance } from "./axios";

//내 프로필 조회
export const getMyProfile = async () => {
  const { data } =
    await axiosInstance.get<CommonResponse<GetMyProfileResponse>>(
      "my-page/profile",
    );
  return data;
};

// 내 프로필 수정 
export const editMyProfile = async ({
  userName,
  profileImage,
}: editMyProfileParams) => {
  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      userName,
    }),
  );

  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  const { data } = await axiosInstance.patch<CommonResponse<null>>("my-page/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// 내 실패담 조회
export const getMyPosts = async ({
  categoryId,
  topicId,
  situation,
}: GetMyPostsParams) => {
  const { data } = await axiosInstance.get<CommonResponse<GetMyPostsResponse>>(
    "my-page/posts",
    {
      params: {
        categoryId,
        topicId,
        situation,
      },
    },
  );
  return data;
};

// 내 교훈 조회
export const getMyLessons = async ({ tag }: GetMyLessonsParams) => {
  const {data} = await axiosInstance.get<
    CommonResponse<GetMyLessonsResponse[]>
  >("my-page/lessons", {
    params: {
      tag,
    },
  });
  return data;
};
