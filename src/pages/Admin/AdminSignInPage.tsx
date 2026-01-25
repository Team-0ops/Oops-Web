import { useState } from "react";
import OopsLogo from "../../assets/icons/OopsLogo.svg?react";
import { PasswordInput } from "../../components/common/PasswordInput";
import { SignInButton } from "../../components/common/SignInButton";

export const AdminSignInPage = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 관리자 비밀번호 검증 API 연동동
    console.log("관리자 로그인 시도:", password);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center bg-white px-4 pt-40">
      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        {/* 로고 섹션 */}
        <div className="flex flex-col items-center gap-4">
          <OopsLogo className="w-[279px] h-[76px]" />
          <h1 className="h1 text-[#262627]">관리자페이지</h1>
        </div>

        {/* 입력 비밀번호 폼 */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <PasswordInput
            id="admin-password"
            label="관리자 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="관리자 비밀번호를 입력해주세요."
          />

          <SignInButton type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AdminSignInPage;

