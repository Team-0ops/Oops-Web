import FormInput from "../common/FormInput.tsx";
import {useVerifyEmail} from "../../hooks/auth/useVerifyEmail.ts";

const EmailVerificationSection = () => {
    const {
        email,
        setEmail,
        code,
        setCode,
        status,
        error,
        sendCode,
        verifyCode,
        token,
    } = useVerifyEmail("PASSWORD_RESET");

    return (
        <>
            <div className="flex flex-col gap-25">
               <div className="flex flex-col justify-center gap-15">
                   <div className="flex gap-25.75">
                    <span className="body1 justify-center">
                            이메일
                    </span>
                       <div className="flex flex-1 gap-2.5">
                           <FormInput
                               label={"asdf"}
                               value={email}
                               placeholder="이메일을 입력하세요."
                               onChange={setEmail} />
                           <button
                               onClick={sendCode}
                               className="body1 w-40 h-13.75 items-center text-center rounded-lg bg-[#B3E378]">인증번호 발송</button>
                       </div>
                   </div>
                   {(status === "CODE" || status === "SUCCESS") && (
                       <div className="flex gap-21.25">
                            <span className="body1 justify-center">
                                    인증번호
                            </span>
                           <div className="flex flex-1 gap-2.5">
                               <FormInput
                                   label={"asdf"}
                                   value={code}
                                   placeholder="인증번호 6자리"
                                   onChange={setCode} />
                               <button
                                   onClick={verifyCode}
                                   className="body1 w-40 h-13.75 items-center text-center rounded-lg bg-[#B3E378]">확인</button>
                           </div>
                        </div>)
                   }
               </div>
                <button className={`body1 h-13.75 items-center text-center rounded-lg
                ${status === "SUCCESS" && token ? ("bg-[#B3E378]"):("bg-[#D2D2D2]")}`}>
                    다음
                </button>
            </div>
            {error && <span className="text-red-500 body2">{error}</span>}

            {status === "SUCCESS" && token && (
                <span className="text-green-500 body2">
          이메일 인증 완료
        </span>
            )}
        </>
    )
}

export default EmailVerificationSection