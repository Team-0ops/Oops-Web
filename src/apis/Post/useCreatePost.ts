import { useState } from "react";
import { axiosInstance } from "../axios";
import { CreatePostPayload, GetCreatePostsResponse } from "../../types/post";

export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const createPost = async (
    payload: CreatePostPayload,
    images: File[]
  ): Promise<GetCreatePostsResponse> => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(payload));
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setIsLoading(true);
      setError(null);

      const res = await axiosInstance.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPost,
    isLoading,
    error,
  };
};