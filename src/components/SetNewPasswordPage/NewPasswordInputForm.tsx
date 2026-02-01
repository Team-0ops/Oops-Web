import FormInput from "../common/FormInput.tsx";

const NewPasswordInputForm = () => {
    return (
        <><div className="flex flex-col gap-25">
            <div className="flex flex-col justify-center gap-15">
                <div className="flex gap-25.75">
                    <span className="body1 justify-center">
                            이메일
                    </span>
                    <div className="flex flex-1 gap-2.5">
                        <FormInput
                            onChange={()=>{}}
                            label={"asdf"}
                            value={""}
                            placeholder="이메일을 입력하세요."
                            />
                        <button

                            className="body1 w-40 h-13.75 items-center text-center rounded-lg bg-[#B3E378]">인증번호 발송</button>
                    </div>
                </div>
                    <div className="flex gap-21.25">
                            <span className="body1 justify-center">
                                    인증번호
                            </span>
                        <div className="flex flex-1 gap-2.5">
                            <FormInput
                                onChange={() => {}}
                                label={"asdf"}
                                value={""}
                                placeholder="인증번호 6자리"
                                 />
                            <button

                                className="body1 w-40 h-13.75 items-center text-center rounded-lg bg-[#B3E378]">확인</button>
                        </div>
                    </div>
            </div>
            <button className={`body1 h-13.75 items-center text-center rounded-lg
               bg-[#B3E378]`}>
                다음
            </button>
        </div>
        </>
    )

}

export default NewPasswordInputForm;