//Login type 정의
import {CommonResponse} from "./Common.ts";
import { User } from "./User.ts";

export type RequestSignInDto = {
    email: string;
    password: string;
};

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