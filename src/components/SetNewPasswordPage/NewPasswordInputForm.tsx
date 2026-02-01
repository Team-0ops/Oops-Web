import FormInput from "../common/FormInput.tsx";
import useSetNewPassword from "../../hooks/auth/useSetNewPassword.ts";
interface queryProps {
    token: string;
}

const NewPasswordInputForm = ({token} :queryProps) => {

    const {
        newPassword,
        setNewPassword,
        newPasswordConfirm,
        setNewPasswordConfirm,
        error,
        loading,
        status,
        postNewPassword,
    } = useSetNewPassword(token);

    return (
        <><div className="flex flex-col gap-25">
            <div className="flex flex-col justify-center gap-15">
                <div className="flex gap-21.25">
                    <span className="body1 justify-center">
                            새 비밀번호
                    </span>
                    <FormInput
                        onChange={setNewPassword}
                        label={"asdf"}
                        value={newPassword}
                        placeholder="비밀번호를 입력하세요."
                        />
                </div>
                <div className="flex gap-7.25">
                    <span className="body1 justify-center">
                            새 비밀번호 재확인
                    </span>
                    <FormInput
                        onChange={setNewPasswordConfirm}
                        label={"asdf"}
                        value={newPasswordConfirm}
                        placeholder="비밀번호를 입력하세요."
                    />
                </div>
            </div>
            <button
                type="submit"
                onClick={postNewPassword}
                className={`body1 h-13.75 items-center text-center rounded-lg
               bg-[#B3E378]`}>
                비밀번호 변경
            </button>
        </div>
        </>
    )

}

export default NewPasswordInputForm;