import MainLogo from "../components/common/MainLogo.tsx";
import NewPasswordInputForm from "../components/SetNewPasswordPage/NewPasswordInputForm.tsx";
import {useLocation, useSearchParams} from "react-router-dom";

interface LocationState {
    email: string;
}

const SetNewPassWordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const location = useLocation();
    const state = location.state as LocationState | null;
    const email = state?.email;

    //토큰 입력값이 없을 경우
    if (!token || !email) {
        return <div>잘못된 접근입니다.</div>;
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="w-231.75 flex flex-col gap-25">
                    <div className="flex flex-col justify-center gap-15">
                        <MainLogo />
                        <span className="h3 text-center">
                        비밀번호 찾기
                    </span>
                    </div>
                    <div>
                        <NewPasswordInputForm token={token} email={email}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SetNewPassWordPage;