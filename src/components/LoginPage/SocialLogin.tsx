import Naver from "../../assets/icons/NaverLogin.svg?react";
import Kakao from "../../assets/icons/KakaoLogin.svg?react";

const SocialLogin = () => {
    return (
        <>
            <div className="flex items-center justify-between self-stretch">
                <Kakao />
                <Naver />
            </div>
        </>
    )
};

export default SocialLogin;