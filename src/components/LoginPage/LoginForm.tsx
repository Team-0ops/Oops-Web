import {useState} from "react";
import {useAuth} from "../../context/AuthContext.tsx";
import Alert from "../../assets/icons/Alert.svg?react";

interface LoginError{
    isError: boolean;
    message: string;
}

const LoginForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<LoginError>({isError:false, message:"에러메세지"});

    const { login } =useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ email: id, password: password });
        }catch (error) {
            if (error instanceof Error) {
                if (error.message === "비밀번호가 일치하지 않습니다.") {
                    setError({isError:true, message:error.message});
                }else if(error.message === "회원가입되지 않은 이메일입니다.") {
                    setError({isError:true, message:error.message});
                }else{
                    alert(error.message);
                }
            }
        }}

    return (
        <>
            <form className="flex flex-col gap-7.5"
                  onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <span className="body3" >아이디</span>
                    <input
                        value={id}
                        autoComplete="new-email"
                        onChange={(e) => setId(e.target.value)}
                        placeholder="이메일을 입력하세요"
                        className="body3 h-13.75 items-center bg-[#FAFAFA] border-2 border-[#E4E4E4] rounded-lg px-4

                        focus:border-[#6F6F6F]
                        focus:outline-none
                        "
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="body3" >비밀번호</span>
                    <div className="flex flex-col gap-2.5">
                        <input
                            value={password}
                            type="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            className="body3 h-13.75 items-center bg-[#FAFAFA] border-2 border-[#E4E4E4] rounded-lg px-4

                            focus:border-[#6F6F6F]
                            focus:outline-none
                            "
                        />
                        <div className="body3 flex items-center justify-center gap-5 text-[#8F8F8F]">
                            <span>
                                {/*// onClick=*/}
                              회원가입
                            </span>
                            <span className="text-[#D2D2D2]">
                              |
                            </span>
                            <span>
                              비밀번호 찾기
                            </span>
                        </div>
                    </div>
                </div>
                {error.isError && (
                    <div
                        className="body3 h-15 flex gap-4 items-center p-5 text-[#464646] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] border border-[#FF6D6D] rounded-lg bg-[#FFEAEA]"
                    >
                        <Alert/>
                        <span>{error.message}</span>
                    </div>
                )}
                <button
                    type="submit"
                    className="body1 h-15 rounded-lg bg-[#B3E378]"
                >
                    로그인
                </button>
            </form>
        </>
    )
};

export default LoginForm;