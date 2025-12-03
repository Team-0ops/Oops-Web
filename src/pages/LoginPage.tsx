import WelcomCard from "../assets/icons/welcomeOops.svg?react";
import Kakao from "../assets/icons/KakaoLogin.svg?react";
import Naver from "../assets/icons/NaverLogin.svg?react";
export const LoginPage = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="flex w-[57.875rem] h-[28rem] bg-[#B3E378] rounded-[1.875rem] px-[2.81rem] py-[2.56rem] gap-[7.19rem]">
          <WelcomCard className="w-[19.75rem]" />
          <div className="flex flex-col justify-center gap-[1.88rem]">
            <Kakao className="w-full h-[4.375rem] cursor-pointer" />
            <Naver className="w-full h-[4.375rem] cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
