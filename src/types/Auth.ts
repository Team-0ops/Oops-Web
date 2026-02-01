//Login type 정의
import {CommonResponse} from "./Common.ts";
import { User } from "./User.ts";

export type RequestSignInDto = {
    email: string;
    password: string;
};

export type RequestSendVerifyEmailDto = {
    email: string;
    purpose: EmailAuthType
};

export type RequestVerifyCodeDto = {
    email: string,
    purpose : EmailAuthType
    code: string
}

//TODO: 추후 백엔드에게 token값 삭제 부탁 -> 자동으로 쿠키에 들어가기 때문
export type ResponseSignInDto = CommonResponse<{
    userId: number,
    nickname: string,
    email: string,
    access_token: string,
    profileImage: string,
    refreshToken: string
}>

export type ResponseMyInfoDto = CommonResponse<User>;

// 이메일 인증코드 발송 타입.
// TODO: purpose 유니온 확장 -> 현재는 회원가입의 경우지만 마이페이지에서 이메일 변경할때도 사용하기 때문
export type SenderEmailParams = {
    email: string;
    purpose: "SIGNUP";
}

// 이메일 인증코드 검증 타입
export type VerifyEmailParams = {
    email: string;
    purpose: "SIGNUP"
    code: string;
}


export type EmailAuthType =
    | "SIGNUP"
    | "PASSWORD_RESET";

export type ResponseSendVerificationEmailDto = CommonResponse<null>

export type ResponseVerifyCodeDto = CommonResponse<{
    verificationToken: string
}>