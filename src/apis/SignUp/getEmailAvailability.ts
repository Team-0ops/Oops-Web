// 이메일 중복체크를 위한 get요청 api
import { axiosInstance } from "../axios";
import { CommonResponse } from "../../types/Common";

type EmailAvailabilityParams = {
    email: string;
}

type ReponseType = {
    email: string;
    available: boolean;
}

export const getEmailAvailability = async ({
    email,
}: EmailAvailabilityParams): Promise<CommonResponse<ReponseType>> => {
    const {data} = await axiosInstance.get<CommonResponse<ReponseType>>(
        `/auth/email-availability`, {
            params:{email}
        }
    );
    return data;
}