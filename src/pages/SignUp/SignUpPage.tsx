import OopsIcon from "../../assets/icons/OopsIcon.svg?react";
import InputWithActionButton from "../../components/SignUpPage/InputWithActionButton";
import PasswordField from "../../components/SignUpPage/PasswordField";
import InputField from "../../components/SignUpPage/InputField";
import TermsAgreement from "../../components/SignUpPage/TermsAgreement";
import OopsTypo from "../../assets/icons/OopsTypo.svg?react";
import Button from "../../components/common/Button";
import { useSignUp } from "../../hooks/auth/useSignUp";

import { useEmailAvailability } from "../../hooks/auth/useEmailAvailability";
import {
  validatePassword,
  validatePasswordConfirm,
} from "../../hooks/auth/usePWvalidate";

export const SignUpPage = () => {
  const signUp = useSignUp();

  const { emailMessage, emailMessageType, isEmailAvailable, isCheckingEmail } =
    useEmailAvailability(signUp.email, signUp.isEmailValid);

  const pw = validatePassword(signUp.password);
  const pwConfirm = validatePasswordConfirm(
    signUp.password,
    signUp.confirmPassword,
  );

  const isServiceAgreed = localStorage.getItem("terms_agree_2") === "true";
  const isPrivacyAgreed = localStorage.getItem("terms_agree_3") === "true";

  const canSubmit =
    signUp.isEmailValid &&
    isEmailAvailable === true &&
    signUp.verificationMessage?.type === "success" &&
    signUp.password.length > 0 &&
    pw.type === "success" &&
    signUp.confirmPassword.length > 0 &&
    pwConfirm.type === "success" &&
    signUp.userName.trim().length > 0 &&
    isServiceAgreed &&
    isPrivacyAgreed;

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
            disabled={
              !signUp.isEmailValid ||
              isCheckingEmail ||
              isEmailAvailable === false
            }
            message={emailMessage}
            messageType={emailMessageType}
          />
          <InputWithActionButton
            label="인증번호"
            type="text"
            placeholder="인증번호 6자리"
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
            messages={pw.messages}
            messageType={pw.type}
          />
          <PasswordField
            label="비밀번호 재확인"
            placeholder="비밀번호를 입력하세요"
            value={signUp.confirmPassword}
            onChange={signUp.setConfirmPassword}
            onClear={() => signUp.setConfirmPassword("")}
            messages={pwConfirm.messages}
            messageType={pwConfirm.type}
          />
          <InputField
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력하세요"
            value={signUp.userName}
            onChange={signUp.setUsername}
            onClear={() => signUp.setUsername("")}
          />
          <TermsAgreement />
          <Button
            type="submit"
            variant={canSubmit ? "confirm" : "default"}
            disabled={!canSubmit}
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
