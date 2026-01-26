import OopsLogo from "../assets/icons/OopsIcon.svg?react";
import OopsTypo from "../assets/icons/OopsTypo.svg?react";
import Naver from "../assets/icons/NaverLogin.svg?react";
import Kakao from "../assets/icons/KakaoLogin.svg?react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
export const LogInPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { login } =useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email: id, password: password });
    }catch (error) {
      console.error("로그인 실패:", error);
  }};

  return (
      <div className="w-full flex justify-center">
      <div className="w-150 flex flex-col items-stretch  gap-12.5">
        <div className="flex flex-col items-center gap-5">
          <OopsLogo/>
          <OopsTypo/>
        </div>
        <form className="flex flex-col gap-7.5"
            onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <span>아이디</span>
            <input
                value={id}
                autoComplete="email"
                onChange={(e) => setId(e.target.value)}
                placeholder="이메일을 입력하세요"
                className="body3 h-13.75 items-center bg-[#FAFAFA] border-2 border-[#E4E4E4] rounded-lg px-4

                focus:border-[#6F6F6F]
                focus:outline-none
                "
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>비밀번호</span>
            <div className="flex flex-col gap-2.5">
              <input
                  value={password}
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="body3 h-13.75 items-center bg-[#FAFAFA] border-2 border-[#E4E4E4] rounded-lg px-4

                  focus:border-[#6F6F6F]
                  focus:outline-none
                "
              />
              <div className="body3 flex items-center justify-center gap-5 text-[#8F8F8F]">
                <span>
                  회원가입
                </span>
                <span className="text-[#D2D2D2]">
                  |
                </span>
                <span>
                  비밀번호 찾기
                </span>
              </div>
            </div>
          </div>
          <button
              type="submit"
              className="body1 h-15 rounded-lg bg-[#B3E378]"
          >
            로그인
          </button>
        </form>
        <div className="flex items-center justify-between self-stretch">
          <div className="w-61.75 h-0 border border-[#D2D2D2]"/>
          <span className="body3 text-[#8F8F8F] text-center">
            또는
          </span>
          <div className="w-61.75 h-0 border border-[#D2D2D2]" />
        </div>
        <div className="flex items-center justify-between self-stretch">
          <Kakao />
          <Naver />
        </div>
      </div>
    </div>
  );
};

export default LogInPage;