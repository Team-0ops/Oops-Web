import { postSenderEmail } from "../../apis/SignUp/postSenderEmail";
import { postVerifyEmail } from "../../apis/SignUp/postVerifyEmail";
import { postSignUp } from "../../apis/SignUp/postSinUp";
import { useNavigate } from "react-router-dom";
import { useSignUpStore } from "../../store/useSignUpStore";

export const useSignUp = () => {
  const navigate = useNavigate();

  const {
    email,
    verificationCode,
    password,
    confirmPassword,
    userName,
    verificationMessage,
    verificationToken,
    setEmail,
    setVerificationCode,
    setPassword,
    setConfirmPassword,
    setUserName,
    setVerificationMessage,
    setVerificationToken,
    clearEmail,
    clearVerificationCode,
    reset,
  } = useSignUpStore();

  // 인증번호 길이 확인
  const isVerificationCodeValid = verificationCode.length >= 6;

  // 이메일 형식 검사
  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // 이메일이 유효한 형식인지 확인
  const isEmailValid = email.length > 0 && isValidEmail(email);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleEmailClear = () => {
    clearEmail();
  };

  const handleVerificationCodeChange = (value: string) => {
    setVerificationCode(value);
  };

  const handleVerificationCodeClear = () => {
    clearVerificationCode();
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
      });
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

      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      reset();
      navigate("/login");
    } catch (e) {
      console.error(e);
      throw e;
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
    setUsername: setUserName,

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