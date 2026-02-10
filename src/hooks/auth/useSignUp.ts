import { useState } from "react";
import { postSenderEmail } from "../../apis/SignUp/postSenderEmail";
import { postVerifyEmail } from "../../apis/SignUp/postVerifyEmail";
import { postSignUp } from "../../apis/SignUp/postSinUp";

type VerificationMessage = {
  text: string;
  type: "success" | "error";
} | null;

export const useSignUp = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [verificationMessage, setVerificationMessage] =
    useState<VerificationMessage>(null);
  const [verificationToken, setVerificationToken] = useState("");

  // 인증번호 길이 확인
  const isVerificationCodeValid = verificationCode.length >= 4;
  // 이메일 형식 검사
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 이메일이 유효한 형식인지 확인
  const isEmailValid = email.length > 0 && isValidEmail(email);
  // TODO: 이메일 중복체크도 같이
  // TODO: 이메일 형식 타이트하게. 그냥 자주쓰는 이메일 몇개로 범위 축소해야할듯.

  const handleEmailChange = (value: string) => {
    setEmail(value);
    // 이메일 변경 시 인증번호 메시지 초기화
    setVerificationMessage(null);
  };

  const handleEmailClear = () => {
    setEmail("");
    setVerificationMessage(null);
  };

  const handleVerificationCodeChange = (value: string) => {
    setVerificationCode(value);
    // 인증번호 변경 시 메시지 초기화
    setVerificationMessage(null);
  };

  const handleVerificationCodeClear = () => {
    setVerificationCode("");
    setVerificationMessage(null);
  };

  const handleSendVerificationCode = async () => {
    try {
      await postSenderEmail({
        email,
        purpose: "SIGNUP",
      });

      setVerificationMessage({
        text: "인증번호가 이메일로 발송되었습니다.",
        type: "success",
      });
    } catch (error) {
      console.log("인증번호 발송 실패", error);
      setVerificationMessage({
        text: "인증번호 발송에 실패했습니다. 다시 시도해주세요.",
        type: "error",
      });
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      alert("인증코드를 입력해주세요");
      return;
    }

    try {
      const res = await postVerifyEmail({
        email,
        purpose: "SIGNUP",
        code: verificationCode,
      });
      setVerificationToken(res.result.verificationToken);
      setVerificationMessage({
        text: "인증완료",
        type: "success",
      })
    } catch (error) {
      console.log("검증실패", error);
      setVerificationMessage({
        text: "인증번호가 일치하지 않습니다.",
        type: "error",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await postSignUp({
        email,
        userName,
        password,
        verificationToken,
      });
    } catch (e) {
      console.error(e)
      throw e
    }
    
  };

  return {
    // Form values
    email,
    verificationCode,
    password,
    confirmPassword,
    userName,

    // Setters
    setEmail: handleEmailChange,
    setVerificationCode: handleVerificationCodeChange,
    setPassword,
    setConfirmPassword,
    setUsername,

    // Clear handlers
    onEmailClear: handleEmailClear,
    onVerificationCodeClear: handleVerificationCodeClear,

    // Validation
    isEmailValid,
    isVerificationCodeValid,

    // Messages
    verificationMessage,
    // Handlers
    handleSendVerificationCode,
    handleVerifyCode,
    handleSubmit,
  };
};
