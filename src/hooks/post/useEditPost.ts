import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PatchPostData, postEdit } from "../../apis/Post/postEdit";

export const useEditPost = (postId:number) => {
    const qc = useQueryClient();

    return useMutation({
      mutationFn: (params: { data: PatchPostData; images?: File[] }) =>
        postEdit(postId, params.data, params.images),
  
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["postEdit", postId] });
        // groupId 기반 조회를 쓰면 group/detail 쪽도 invalidate 추가
      },
    });
};