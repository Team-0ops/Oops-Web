import OopsIcon from "../../assets/icons/OopsIcon.svg?react";
import InputWithActionButton from "../../components/SingUpPage/InputWithActionButton";
import PasswordField from "../../components/SingUpPage/PasswordField";
import InputField from "../../components/SingUpPage/InputField";
import TermsAgreement from "../../components/SingUpPage/TermsAgreement";
import OopsTypo from "../../assets/icons/OopsTypo.svg?react";
import Button from "../../components/common/Button";
import { useSignUp } from "../../hooks/auth/useSignUp";

export const SignUpPage = () => {
  const signUp = useSignUp();

  return (
    <div className="w-full flex justify-center">
      <div className="w-150 flex flex-col items-stretch gap-20">
        <div className="flex flex-col items-center gap-5">
          <OopsIcon />
          <OopsTypo />
        </div>
        <form className="flex flex-col gap-20" onSubmit={signUp.handleSubmit}>
          <InputWithActionButton
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            value={signUp.email}
            onChange={signUp.setEmail}
            onClear={signUp.onEmailClear}
            buttonText="인증번호 발송"
            onButtonClick={signUp.handleSendVerificationCode}
            buttonVariant="confirm"
            disabled={!signUp.isEmailValid}
            message={signUp.emailMessage}
            messageType={signUp.emailMessageType}
          />
          <InputWithActionButton
            label="인증번호"
            type="text"
            placeholder="인증번호 4자리"
            value={signUp.verificationCode}
            onChange={signUp.setVerificationCode}
            onClear={signUp.onVerificationCodeClear}
            buttonText="확인"
            onButtonClick={signUp.handleVerifyCode}
            buttonVariant="confirm"
            disabled={!signUp.isVerificationCodeValid}
            message={signUp.verificationMessage?.text}
            messageType={signUp.verificationMessage?.type}
          />
          <PasswordField
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            value={signUp.password}
            onChange={signUp.setPassword}
            onClear={() => signUp.setPassword("")}
          /> 
          <PasswordField
            label="비밀번호 재확인"
            placeholder="비밀번호를 입력하세요"
            value={signUp.confirmPassword}
            onChange={signUp.setConfirmPassword}
            onClear={() => signUp.setConfirmPassword("")}
          />
          <InputField
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력하세요"
            value={signUp.nickname}
            onChange={signUp.setNickname}
            onClear={() => signUp.setNickname("")}
          />
          <TermsAgreement />
          <Button
            type="submit"
            variant="default"
            className="h-15 body1 font-bold"
          >
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

