import {useState} from "react";
import {postSendEmailVarify, postVerifyCode} from "../../apis/auth.ts";
import {EmailAuthType} from "../../types/Auth.ts";

export const useVerifyEmail = (authType : EmailAuthType) =>{
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [status, setStatus] = useState<"EMAIL" | "CODE" | "SUCCESS">("EMAIL");
    const [code, setCode] = useState('');
    const [token, setToken] = useState<string | null>(null);

    const sendCode = async () => {
        setLoading(true);
        try{
            const res = await postSendEmailVarify({email: email, purpose: authType});
            console.log(res);

            setStatus("CODE")
        }catch{
            setError("인증 이메일 전송에 실패했어요.");
            return error;
        }finally {
            setLoading(false);
        }
    };

    const verifyCode = async () => {
        setLoading(true);
        try{
            const res = await postVerifyCode({email: email, purpose: authType, code: code});
            console.log(res);
            setToken(res.result.verificationToken);
            setStatus("SUCCESS")
        }catch{
            setError("인증 이메일 전송에 실패했어요.");
        }finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        code,
        setCode,
        status,
        loading,
        error,
        sendCode,
        verifyCode,
        token,
    };
}