import MainLogo from "../components/common/MainLogo.tsx";
import SignupForm from "../components/SignUpPage/SignupForm.tsx";

export const SignUpPage = () => {
    return (
        <>
            <div className="w-full flex justify-center">
                <div className="w-231.75 flex flex-col items-stretch gap-30">
                    <MainLogo />
                    <SignupForm />
                </div>
            </div>
        </>
    )
};

export default SignUpPage;