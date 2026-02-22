import { axiosInstance } from "../axios";
import { CommonResponse } from "../../types/Common";

export type TermItem = {
    id: number;
    title: string;
    content: string;
    required: "REQUIRED" | "OPTIONAL";
}

export const getTerms = async ():Promise<CommonResponse<TermItem>> => {
    const {data} = await axiosInstance.get<CommonResponse<TermItem>>(
        `/terms`
    );
    return data;
}