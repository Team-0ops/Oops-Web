import { axiosInstance } from "../axios";
import { CommonResponse } from "../../types/Common";
import { VerifyEmailParams } from "../../types/Auth";

type VerificationType = {
    verificationToken : string;
};

export const postVerifyEmail = async ({
    email,
    purpose,
    code,
}: VerifyEmailParams): Promise<CommonResponse<VerificationType>> => {
    const {data} = await axiosInstance.post<CommonResponse<VerificationType>>(
        `/auth/email/verify`, {
            email,
            purpose,
            code,
        }
    );
    return data;
}