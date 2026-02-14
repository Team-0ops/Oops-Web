import { useState, useRef, useEffect } from "react";
import { getEmailAvailability } from "../../apis/SignUp/getEmailAvailability";


export function useEmailAvailability(email: string, isEmailValid: boolean) {
  const [emailMessage, setEmailMessage] = useState<string | undefined>();
  const [emailMessageType, setEmailMessageType] = useState<
    "success" | "error" | undefined
  >();
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null,
  );
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const reqSeq = useRef(0);

  

  useEffect(() => {
    if (!email) {
      setEmailMessage(undefined);
      setEmailMessageType(undefined);
      setIsEmailAvailable(null);
      setIsCheckingEmail(false);
      return;
    }

    if (!isEmailValid) {
      setEmailMessage("올바른 이메일 형식을 입력해주세요.");
      setEmailMessageType("error");
      setIsEmailAvailable(null);
      setIsCheckingEmail(false);
      return;
    }

    setIsCheckingEmail(true);
    const current = ++reqSeq.current;

    // 디바운스
    const t = setTimeout(async () => {
      try {
        const res = await getEmailAvailability({ email });
        if (current !== reqSeq.current) return;

        const available = res.result.available;
        if (!available) {
          setEmailMessage("이미 가입된 메일입니다.");
          setEmailMessageType("error");
          setIsEmailAvailable(false);
        } else {
          setEmailMessage("사용 가능한 이메일입니다.");
          setEmailMessageType("success");
          setIsEmailAvailable(true);
        }
      } catch {
        if (current !== reqSeq.current) return;
        setEmailMessage("이메일 확인 중 오류가 발생했습니다.");
        setEmailMessageType("error");
        setIsEmailAvailable(null);
      } finally {
        if (current === reqSeq.current) setIsCheckingEmail(false);
      }
    }, 400);

    return () => clearTimeout(t);
  }, [email, isEmailValid]);

  return { emailMessage, emailMessageType, isEmailAvailable, isCheckingEmail };
}
