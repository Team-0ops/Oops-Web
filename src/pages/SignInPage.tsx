import WelcomCard from "../assets/icons/welcomeOops.svg?react";
import Kakao from "../assets/icons/KakaoLogin.svg?react";
import Naver from "../assets/icons/NaverLogin.svg?react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
export const SignInPage = () => {
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
    <>
      <div className="w-full flex justify-center items-center">
        <div className="flex w-[57.875rem] h-[28rem] bg-[#B3E378] rounded-[1.875rem] px-[2.81rem] py-[2.56rem] gap-[7.19rem]">
          <WelcomCard className="w-[19.75rem]" />
          <div className="flex flex-col justify-center gap-[1.88rem]">
            <Kakao className="w-full h-[4.375rem] cursor-pointer" />
            <Naver className="w-full h-[4.375rem] cursor-pointer" />
            <form onSubmit={handleSubmit}>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="bg-white"
              ></input>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white"></input>
              <button
                type="submit"
                className="w-full h-[4.375rem] bg-white rounded-[0.625rem] text-[#B3E378] font-bold text-[1.25rem] cursor-pointer"
              >
                로그인
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;