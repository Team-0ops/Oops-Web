// src/hooks/auth/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postLogOut } from "../../apis/auth";

export const useLogout = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => postLogOut(),
    onSuccess: async () => {
      //토큰/세션 정리 (프로젝트 방식에 맞게)
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // React Query 캐시 정리
      // mypage, post 등등
      qc.clear();

      // 라우팅 
      // TODO: 라우팅을 어디로 시켜야하나..
      navigate("/login", { replace: true });
    },
    onError: () => {
      // 서버 로그아웃 실패여도 로그아웃 로직 실행
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      qc.clear();
      navigate("/login", { replace: true });
    },
  });
};
