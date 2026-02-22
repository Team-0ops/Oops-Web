const SignupForm = () => {
    return (
        <>
            <div className="flex flex-col items-stretch gap-25">
                <div className="flex flex-col gap-20">
                    {/*TODO : Input form 공통 component로 빼기*/}
                    <div className="flex gap-25.75">
                        <span className="body1">
                            이메일
                        </span>
                        <div className="flex flex-1 gap-2.5">
                            <input placeholder="이메일을 입력하세요"
                                   autoComplete="new-email"
                                   className="body3 h-13.75 items-center flex-1 bg-[#FAFAFA] border-2 border-[#E4E4E4] rounded-lg px-4
                                   focus:border-[#6F6F6F]
                                   focus:outline-none"
                            />
                            <button className="body1 w-40 h-13.75 items-center text-center rounded-lg bg-[#D2D2D2]">인증번호 발송</button>
                        </div>
                    </div>
                    <div className="flex gap-21.25">
                        <span className="body1">
                            인증번호
                        </span>
                        <div className="flex flex-1 gap-2.5">
                            <input placeholder="이메일을 입력하세요"
                                   autoComplete="new-email"
                                   className="body3 h-13.75 items-center flex-1 bg-[#FAFAFA] border-2 border-[#E4E4E4] rounded-lg px-4
                                   focus:border-[#6F6F6F]
                                   focus:outline-none"
                            />
                            <button className="body1 w-40 h-13.75 items-center text-center rounded-lg bg-[#B3E378]">확인</button>
                        </div>
                    </div>
                    <div>
                        <span className="body1">
                            비밀번호
                        </span>
                        <div>

                        </div>
                    </div>
                    <div>
                        <span>
                            비밀번호 재확인
                        </span>
                        <div>

                        </div>
                    </div>
                    <div>
                        <span>
                            닉네임
                        </span>
                        <div>

                        </div>
                    </div>
                    <div>
                        <span>
                            약관 동의
                        </span>
                        <div>

                        </div>
                    </div>
                </div>
                <button>회원가입</button>
            </div>
        </>
    )
}

export default SignupForm;