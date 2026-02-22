import { useCallback } from "react";

export type MessageType = "success" | "error";

export type ValidationResult = {
  isValid: boolean;
  type?: MessageType;     // 에러/성공일 때만 세팅
  messages: string[];     // 여러 줄 메시지 대응
};

const PW_RULES = {
  MIN: 8,
  MAX: 20,
  MIN_KIND: 2,
} as const;

function countKinds(pw: string) {
  const hasLetter = /[a-zA-Z]/.test(pw);
  const hasNumber = /\d/.test(pw);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pw);

  return [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
}

export function validatePassword(pw: string): ValidationResult {
  if (!pw) return { isValid: false, type: undefined, messages: [] };

  const errors: string[] = [];

  // 길이 체크
  if (pw.length < PW_RULES.MIN || pw.length > PW_RULES.MAX) {
    errors.push("8자 이상 20자 이하");
  }

  // 조합 체크 (영문/숫자/특수 중 2종 이상)
  const kinds = countKinds(pw);
  if (kinds < PW_RULES.MIN_KIND) {
    errors.push("영문 대소문자 + 숫자 + 특수문자 중 최소 2종류 이상 조합");
  }

  if (errors.length > 0) {
    return { isValid: false, type: "error", messages: errors };
  }

  return {
    isValid: true,
    type: "success",
    messages: ["영문 대소문자 + 숫자 + 특수문자 중 최소 2종류 이상 조합", "8자 이상 20자 이하"],
  };
}

export function validatePasswordConfirm(
  pw: string,
  confirm: string,
): ValidationResult {
  // 입력 전에는 메시지 숨김
  if (!confirm) return { isValid: false, type: undefined, messages: [] };

  if (pw !== confirm) {
    return {
      isValid: false,
      type: "error",
      messages: ["비밀번호가 일치하지 않습니다."],
    };
  }

  return {
    isValid: true,
    type: "success",
    messages: ["비밀번호 확인 완료"],
  };
}


//  컴포넌트에서 훅 형태로 쓰고 싶으면 이걸 사용
 
export function usePWValidate() {
  const validatePw = useCallback((pw: string) => validatePassword(pw), []);
  const validateConfirm = useCallback(
    (pw: string, confirm: string) => validatePasswordConfirm(pw, confirm),
    [],
  );

  return { validatePw, validateConfirm };
}
