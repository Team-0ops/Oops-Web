import MainLogo from "../components/common/MainLogo.tsx";
import EmailVerificationSection from "../components/FindPasswordPage/EmailVerificationSection.tsx";
const FindPasswordPage = () => {
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
                        <EmailVerificationSection/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FindPasswordPage;