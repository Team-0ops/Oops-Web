import { axiosInstance } from "../axios";

export type PatchPostData = {
  title?: string;
  content?: string;
  categoryId: number;
};

export async function postEdit(
  postId: number,
  data: PatchPostData,
  images?: File[]
) {
    const form = new FormData();
    form.append("data", JSON.stringify(data));

    if (images && images.length > 0){
        images.forEach((f) => form.append("images", f));
    }

    const res = await axiosInstance.patch(`/posts/${postId}`, form, {
        headers: {"Content-Type": "multipart/form-data"},
    });

    console.log("data", res.data)
    return res.data;
}

