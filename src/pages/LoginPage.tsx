import MainLogo from "../components/common/MainLogo.tsx";
import LoginForm from "../components/LoginPage/LoginForm.tsx";
import SocialLogin from "../components/LoginPage/SocialLogin.tsx";
export const LoginPage = () => {

  return (
      <div className="w-full flex justify-center">
      <div className="w-150 flex flex-col items-stretch  gap-12.5">
        <MainLogo />
        <LoginForm />
        <div className="flex items-center justify-between self-stretch">
          <div className="w-61.75 h-0 border border-[#D2D2D2]"/>
          <span className="body3 text-[#8F8F8F] text-center">
            또는
          </span>
          <div className="w-61.75 h-0 border border-[#D2D2D2]" />
        </div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default LoginPage;