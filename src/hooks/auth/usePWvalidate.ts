type MessageType = "success" | "error";

export function validatePassword(pw: string): {
  isValid: boolean;
  message?: string;
  type?: MessageType;
} {
  if (!pw) return { isValid: false, message: undefined, type: undefined };

  if (pw.length < 8 || pw.length > 20) {
    return {
      isValid: false,
      message: "8자 이상 20자 이하",
      type: "error",
    };
  }

  const hasLetter = /[a-zA-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pw);

  const kinds = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;

  if (kinds < 2) {
    return {
      isValid: false,
      message: "영문 대소문자 + 숫자 + 특수문자 중 최소 2종류 이상 조합",
      type: "error",
    };
  }

  return {
    isValid: true,
    message: "사용 가능한 비밀번호입니다.",
    type: "success",
  };
}

export function validatePasswordConfirm(pw: string, confirm: string): {
  isValid: boolean;
  message?: string;
  type?: MessageType;
} {
  if (!confirm) return { isValid: false, message: undefined, type: undefined };

  if (pw !== confirm) {
    return {
      isValid: false,
      message: "비밀번호가 일치하지 않습니다.",
      type: "error",
    };
  }

  return {
    isValid: true,
    message: "비밀번호가 일치합니다.",
    type: "success",
  };
}
