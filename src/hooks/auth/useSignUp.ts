import { useState } from "react";
// TODO: API 함수 import (인증번호 발송/확인 API 구현 시 주석 해제)
// import { sendVerificationCode, verifyCode } from "../../apis/auth";

type VerificationMessage = {
  text: string;
  type: "success" | "error";
} | null;

export const useSignUp = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [verificationMessage, setVerificationMessage] = useState<VerificationMessage>(null);

  // 이메일 형식 검사
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 이메일이 유효한 형식인지 확인
  const isEmailValid = email.length > 0 && isValidEmail(email);

  // 인증번호 길이 확인
  const isVerificationCodeValid = verificationCode.length >= 4;

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
    // TODO: 인증번호 발송 API 호출 로직 구현
  };

  const handleVerifyCode = async () => {
    // TODO: 인증번호 확인 API 호출 로직 구현
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 회원가입 로직 구현
  };

  return {
    // Form values
    email,
    verificationCode,
    password,
    confirmPassword,
    nickname,
    
    // Setters
    setEmail: handleEmailChange,
    setVerificationCode: handleVerificationCodeChange,
    setPassword,
    setConfirmPassword,
    setNickname,
    
    // Clear handlers
    onEmailClear: handleEmailClear,
    onVerificationCodeClear: handleVerificationCodeClear,
    
    // Validation
    isEmailValid,
    isVerificationCodeValid,
    
    // Messages
    verificationMessage,
    emailMessage: isEmailValid ? "사용 가능한 이메일입니다" : undefined,
    emailMessageType: isEmailValid ? "success" as const : undefined,
    
    // Handlers
    handleSendVerificationCode,
    handleVerifyCode,
    handleSubmit,
  };
};

