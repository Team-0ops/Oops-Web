import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../../apis/mypage";
import { myPageKeys } from "./queryKey";

export const useProfile = () => {
  return useQuery({
    queryKey: myPageKeys.profile(),
    queryFn: getMyProfile,
  });
};
