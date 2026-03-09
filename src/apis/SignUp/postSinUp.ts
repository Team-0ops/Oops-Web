import { axiosInstance } from "../axios";
import { CommonResponse } from "../../types/Common";

export type PostSignUpParams = {
    email: string;
    userName: string;
    password: string;
    verificationToken: string;
}

export const postSignUp = async ({
    email,
    userName,
    password,
    verificationToken,
}:PostSignUpParams): Promise<CommonResponse<null>> => {
    const {data} = await axiosInstance.post<CommonResponse<null>>(
        `/auth/join`,
        {
            email,
            userName,
            password,
            verificationToken,
        }
    );

    return data;
}