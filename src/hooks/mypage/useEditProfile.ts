import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMyProfile } from "../../apis/mypage";
import { myPageKeys } from "./queryKey";

export const useEditMyProfile = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: editMyProfile,
    onSuccess: () => {
      // 수정 후 최신 프로필 다시 가져오기
      qc.invalidateQueries({ queryKey: myPageKeys.profile() });
    },
  });
};