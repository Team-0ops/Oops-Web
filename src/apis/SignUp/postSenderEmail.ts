import { CommonResponse } from "../../types/Common";
import { axiosInstance } from "../axios";
import type { SenderEmailParams } from "../../types/Auth";


export const postSenderEmail = async ({
    email,
    purpose,
}: SenderEmailParams): Promise<CommonResponse<string>> => {
    const {data} = await axiosInstance.post<CommonResponse<string>>(
        `/auth/email/send`,{
            email,
            purpose,
        }
    );
    return data;
}